import React, { Component } from 'react'
import {subscribeToEvent, emitEvent} from '../utils/serverhome-api'
import VoiceRecognition from './VoiceRecognition';

class Football extends Component {

    constructor(props){
        super(props);
	    this.state = {
            source: "",
            start : this.props.data
        };
    }

    componentDidMount(){
        var self = this;
        subscribeToEvent(this.props.name, function(data){
            var sourceData =  'data:image/jpeg;base64,' + data.buffer ;
            self.setState({ source: sourceData});
        });
    }

    stopCamera(){
        emitEvent(this.props.name+".stop", this.props.name);
        this.setState({ start: false});
    }

    startCamera(){
        emitEvent(this.props.name+".start", this.props.name);
        this.setState({ start: true});
    }

    render() {
        return (
            <VoiceRecognition></VoiceRecognition>
        );
    }
};

export default Football;