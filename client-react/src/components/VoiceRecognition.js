import React, { PropTypes, Component } from 'react'
import {isConfigured} from '../utils/authservice'
import SpeechRecognition from 'react-speech-recognition'

import {getExpressions, sendRequest, subscribeToEvent} from '../utils/serverhome-api'
import {searchRequest} from '../utils/voice-helper'

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  recognition: PropTypes.object
};

class VoiceRecognition extends Component {

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            expressions: [],
            conversation: []
        };
    }

    componentWillMount() {
        const { recognition } = this.props;
        recognition.lang = 'fr-FR';
    }

    componentDidMount(){
        if(!isConfigured()) return;
        var self= this;
        getExpressions().then((expressions)=>{
            self.setState({"expressions": expressions});
            self.subscribeServerSays();
            if(self.props.recognition){
                self.props.recognition.onresult = function(event) {
                    var result=event.results[event.results.length-1];
                    if(result.isFinal){
                        var objRequest = searchRequest(result[0].transcript, expressions);
                        console.log({"transcript": result[0].transcript,
                                     "data": objRequest});
                        if(objRequest && objRequest.plugin){
                            self.sendData(objRequest);
                        }
                    }
                };
            }
        });
    }

    subscribeServerSays(){
        subscribeToEvent("serversays", function (data){
            var utterThis = new SpeechSynthesisUtterance(data);
            utterThis.lang = 'fr-FR';
            console.log({"event server says":data});
            window.speechSynthesis.speak(utterThis);
        });
    }

    sendData(objRequest){
        sendRequest(objRequest.plugin, objRequest.action, objRequest.data).then((data)=>{
            if(data.resultText){
                var utterThis = new SpeechSynthesisUtterance(data.resultText);
                utterThis.lang = 'fr-FR';
                console.log({"response":data.resultText});
                if (this.props.changeResult) {
                    console.log('on envoit le resultat au parent');
                    this.props.changeResult(data);
                }
                window.speechSynthesis.speak(utterThis);
            }
        });
    }

    render() {
        const { startListening, stopListening, browserSupportsSpeechRecognition } = this.props;

        if(!isConfigured()){
            return <div>Configurer le server de merry home ;)</div>;
        }

        if (!browserSupportsSpeechRecognition) {
            return <div>Pour utiliser la reconnaissance vocale, merci d'utiliser google chrome ;)</div>;
        }

        return (
            <div className="block-voice">
                <div className={"foot-voice "+(this.props.listening  ? "listening" : "")} >
                { this.props.listening  ?
                    <svg className='svg svg-stop' onClick={stopListening} xmlns="http://www.w3.org/2000/svg" height="448pt" viewBox="0 0 448 448" width="448pt"><path d="m224 248c13.253906 0 24-10.746094 24-24v-120c0-13.253906-10.746094-24-24-24s-24 10.746094-24 24v120c0 13.253906 10.746094 24 24 24zm0 0"/><path d="m224 0c-123.710938 0-224 100.289062-224 224s100.289062 224 224 224 224-100.289062 224-224c-.140625-123.652344-100.347656-223.859375-224-224zm-40 104c0-22.089844 17.910156-40 40-40s40 17.910156 40 40v120c0 22.089844-17.910156 40-40 40s-40-17.910156-40-40zm48 207.59375v72.40625h40v16h-96v-16h40v-72.40625c-45.277344-4.171875-79.941406-42.125-80-87.59375h16c0 39.765625 32.234375 72 72 72s72-32.234375 72-72h16c-.058594 45.46875-34.722656 83.421875-80 87.59375zm0 0"/></svg> :
                    <svg className='svg svg-start' onClick={startListening} xmlns="http://www.w3.org/2000/svg" height="448pt" viewBox="0 0 448 448" width="448pt"><path d="m224 248c13.253906 0 24-10.746094 24-24v-120c0-13.253906-10.746094-24-24-24s-24 10.746094-24 24v120c0 13.253906 10.746094 24 24 24zm0 0"/><path d="m224 0c-123.710938 0-224 100.289062-224 224s100.289062 224 224 224 224-100.289062 224-224c-.140625-123.652344-100.347656-223.859375-224-224zm-40 104c0-22.089844 17.910156-40 40-40s40 17.910156 40 40v120c0 22.089844-17.910156 40-40 40s-40-17.910156-40-40zm48 207.59375v72.40625h40v16h-96v-16h40v-72.40625c-45.277344-4.171875-79.941406-42.125-80-87.59375h16c0 39.765625 32.234375 72 72 72s72-32.234375 72-72h16c-.058594 45.46875-34.722656 83.421875-80 87.59375zm0 0"/></svg> }
                </div>
            </div>
        );
    };
};

VoiceRecognition.propTypes = propTypes;

const options = {
  autoStart: false,
  lang: 'fr-FR'
};

export default SpeechRecognition(options)(VoiceRecognition);