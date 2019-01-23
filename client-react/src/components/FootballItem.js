import React, { Component } from 'react'

class FootballItem extends Component {

    render() {
        const { data } = this.props;
        return (
            <div>
                <div>{ JSON.stringify(data) }</div>
            </div>
        );
    }
};

export default FootballItem;