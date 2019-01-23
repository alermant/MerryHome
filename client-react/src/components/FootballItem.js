import React, { Component } from 'react';
import moment from 'moment';

class FootballItem extends Component {

    render() {
        const { data } = this.props;
        return (
            <div className="match">
                <div className="datematch">{ moment(data.utcDate).format('MMMM Do YYYY, h:mm:ss a') }</div>
                <div className="block block-left">
                    <div className="block-team">
                        <div className="name hometeam">{ data.homeTeam.name }</div>
                        <div className="score">
                            { data.score.fullTime.homeTeam }
                        </div>
                    </div>
                </div>
                <div className="block block-right">
                    <div className="block-team">
                        <div className="score">
                            { data.score.fullTime.awayTeam }
                        </div>
                        <div className="name awayteam">{ data.awayTeam.name }</div>
                    </div>
                </div>
                <div className="journee"><span>Journée : </span>{ data.matchday }</div>
            </div>
        );
    }
};

export default FootballItem;