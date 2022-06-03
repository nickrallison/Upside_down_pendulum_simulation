import "./MovingPendulum.css"
import React from 'react';

export default class MovingPendulum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posx: props.posx,
            theta: props.theta,
            delposx: props.delposx,
            deltheta: props.deltheta,
            cartmass: 1,
            pendmass: 1,
            len: 1,
            F: 0,
            W: 1,
            testvar: 0
        };
    }
    update = () => {

        let deldelx = 20 * (this.state.len*this.state.pendmass*Math.sin(this.state.theta)*this.state.deltheta*this.state.deltheta + this.state.F + 9.81*this.state.pendmass*Math.cos(this.state.theta)*Math.sin(this.state.theta))/(- this.state.pendmass*Math.cos(this.state.theta)*Math.cos(this.state.theta) + this.state.cartmass + this.state.pendmass)
        let deldeltheta = (this.state.W-this.state.deltheta * 0.01 - this.state.len*this.state.pendmass*Math.cos(this.state.theta)*Math.sin(this.state.theta)*this.state.deltheta*this.state.deltheta + this.state.F*Math.cos(this.state.theta) + 9.81*this.state.pendmass*Math.sin(this.state.theta) + this.state.cartmass*9.81*Math.sin(this.state.theta))/(this.state.len*(- this.state.pendmass*Math.cos(this.state.theta)*Math.cos(this.state.theta) + this.state.cartmass + this.state.pendmass))


        let xnext = this.state.posx + 0.00006 * this.state.delposx
        let thetanext = this.state.theta + 0.00006 * this.state.deltheta
        let delxnext = this.state.delposx + 0.00006 * deldelx
        let delthetanext = this.state.deltheta + 0.00006 * deldeltheta


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
            testvar: window.innerWidth
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

    render = () => {
        this.update()
        return (
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
        )
    }


}