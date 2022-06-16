import React, { useState, useEffect } from 'react';
import "./Timer.css"

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: parseInt(props.startTimeInSeconds, 1) || 0,
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

        let dt = 0.001
        let fr = 0.1

        let deldelx = (- this.state.len*this.state.pendmass*Math.sin(this.state.theta)*this.state.deltheta*this.state.deltheta - fr * this.state.pendmass * this.state.deltheta * Math.cos(this.state.theta) + this.state.W*this.state.pendmass*Math.cos(this.state.theta) * Math.cos(this.state.theta) + 9.81*this.state.pendmass*Math.sin(this.state.theta)*Math.cos(this.state.theta) + this.state.F)/(- this.state.pendmass*Math.cos(this.state.theta)*Math.cos(this.state.theta) + this.state.cartmass + this.state.pendmass)
        let deldeltheta = (- this.state.len*this.state.pendmass*Math.cos(this.state.theta)*Math.sin(this.state.theta)*this.state.deltheta*this.state.deltheta + this.state.F*Math.cos(this.state.theta) + 9.81*this.state.pendmass*Math.sin(this.state.theta) - this.state.cartmass * fr*this.state.deltheta - this.state.pendmass * fr*this.state.deltheta+ this.state.cartmass*this.state.W*Math.cos(this.state.theta) + this.state.cartmass*9.81*Math.sin(this.state.theta) + this.state.W*this.state.pendmass*Math.cos(this.state.theta))/(this.state.len*(- this.state.pendmass*Math.cos(this.state.theta)*Math.cos(this.state.theta) + this.state.cartmass + this.state.pendmass))


        let xnext = (this.state.posx + dt * 10 * 5 * this.state.delposx)
        let thetanext = this.state.theta + dt * 5 * this.state.deltheta
        let delxnext = this.state.delposx + dt * 5 * deldelx
        let delthetanext = this.state.deltheta + dt * 5 * deldeltheta


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

        if (this.state.theta < 1.57 || this.state.theta > -1.57) {
            this.setState(state => ({
               F: -50 * this.state.theta
            }));
        }
        else {
            this.setState(state => ({
                F: 0
            }));
        }


        if (this.state.theta >  Math.PI) {
            this.setState(state => ({
                theta: this.state.theta - 2 * Math.PI
            }));
        }

        if (this.state.theta < -Math.PI) {
            this.setState(state => ({
                theta: this.state.theta + 2 * Math.PI
            }));
        }

        this.setState(state => ({
            testvar: this.state.F
        }));

        if (this.state.posx >  window.innerWidth) {
            this.setState(state => ({
                posx: - 200
            }));
        }

        if (this.state.posx < - 200) {
            this.setState(state => ({
                posx: window.innerWidth
            }));
        }

    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 0.001
        }));
        this.update()
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1);
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
                        <div className="wheel"></div>
                        <div id="wheel2"></div>
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