import React, { useState, useEffect } from 'react';
import "./MovingPendulum"
import MovingPendulum from "./MovingPendulum";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: parseInt(props.startTimeInSeconds, 10) || 0
        };
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 0.016
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 16);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    formatTime(secs) {
        let hours   = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60) % 60;
        let seconds = secs % 60;
        return [hours, minutes, seconds]
            .map(v => ('' + v).padStart(2, '0'))
            .filter((v,i) => v !== '00' || i > 0)
            .join(':');
    }

    render() {
        return (
            <div>
                <MovingPendulum posx = {-100} angle = {0.3} />
            </div>
        );
    }
}