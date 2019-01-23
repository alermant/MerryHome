import React, { Component } from 'react'
import VoiceRecognition from './VoiceRecognition';
import FootBallItem from './FootballItem';

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

        const footballItems = this.state.result.data
            ? this.state.result.data.map((matche, index)=> {
                return <FootBallItem key={index} data={matche}></FootBallItem>
            })
            : [];
        return (
            <div>
                <VoiceRecognition changeResult={this.changeResult}></VoiceRecognition>
                <div>{footballItems}</div>
            </div>
        );
    }
};

export default Football;