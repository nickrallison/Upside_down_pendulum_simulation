import React, { useState, useEffect } from 'react';
import "./MovingPendulum"
import MovingPendulum from "./MovingPendulum";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: parseInt(props.startTimeInSeconds, 10) || 0,
            posx: props.posx,
            theta: props.theta,
            delposx: props.delposx,
            deltheta: props.deltheta,
            cartmass: 1,
            pendmass: 1,
            len: 1,
            F: 0,
            W: 0,
            testvar: 0

        };
    }

    update = () => {

        let dt = 0.01

        let deldelx = 20 * (this.state.len*this.state.pendmass*Math.sin(this.state.theta)*this.state.deltheta*this.state.deltheta + this.state.F + 9.81*this.state.pendmass*Math.cos(this.state.theta)*Math.sin(this.state.theta))/(- this.state.pendmass*Math.cos(this.state.theta)*Math.cos(this.state.theta) + this.state.cartmass + this.state.pendmass)
        let deldeltheta = (-this.state.deltheta + Math.cos(this.state.theta) * this.state.W-this.state.deltheta * 0.01 - this.state.len*this.state.pendmass*Math.cos(this.state.theta)*Math.sin(this.state.theta)*this.state.deltheta*this.state.deltheta + this.state.F*Math.cos(this.state.theta) + 9.81*this.state.pendmass*Math.sin(this.state.theta) + this.state.cartmass*9.81*Math.sin(this.state.theta))/(this.state.len*(- this.state.pendmass*Math.cos(this.state.theta)*Math.cos(this.state.theta) + this.state.cartmass + this.state.pendmass))


        let xnext = this.state.posx + dt * this.state.delposx
        let thetanext = this.state.theta + dt * this.state.deltheta
        let delxnext = this.state.delposx + dt * deldelx
        let delthetanext = this.state.deltheta + dt * deldeltheta


        this.setState(state => ({
            posx: xnext
        }));

        this.setState(state => ({
            theta: thetanext
        }));

        this.setState(state => ({
            delposx: delxnext
        }));

        this.setState(state => ({
            deltheta: delthetanext
        }));

        this.setState(state => ({
            F: -50 * this.state.theta
        }));



        this.setState(state => ({
            testvar: this.state.W
        }));

        if (this.state.posx >  window.innerWidth / 2 + 100) {
            this.setState(state => ({
                posx: - window.innerWidth / 2  - 100
            }));
        }

        if (this.state.posx < - window.innerWidth / 2 - 100) {
            this.setState(state => ({
                posx: window.innerWidth / 2 + 100
            }));
        }

    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 0.016
        }));
        this.update()
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
                <>
                    <div className="Block" style={{transform: `translateX(${this.state.posx}px)`}}>
                        {this.state.testvar}
                        <div id="rod" style={{transform: "rotate(" + (Math.PI - this.state.theta) + "rad)"}}>
                            <div id="pivot"></div>
                            <div id="ball"></div>
                        </div>
                    </div>

                    <button className="button button1" onClick={() => this.setState(state => ({
                        W: this.state.W + 1
                    }))}>
                        Left Wind
                    </button>
                    <button className="button button2"
                            onClick={() => this.setState(state => ({
                                W: this.state.W - 1
                            }))}>
                        Right Wind
                    </button>
                </>

            </div>
        );
    }
}