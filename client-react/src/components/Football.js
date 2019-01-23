import React, { Component } from 'react'
import VoiceRecognition from './VoiceRecognition';

class Football extends Component {

    constructor(props){
        super(props);
        this.state = {
            result: []
        };
        this.changeResult = this.changeResult.bind(this);
    }

    changeResult(newResult) {
        this.setState({
            result: newResult
        });
    }

    render() {
        return (
            <div>
                <VoiceRecognition changeResult={this.changeResult}></VoiceRecognition>
                <div>{ JSON.stringify(this.state.result) }</div>
            </div>
        );
    }
};

export default Football;