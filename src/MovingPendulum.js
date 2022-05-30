import "./MovingPendulum.css"
import React from 'react';

export default class MovingPendulum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: props.pos,
            rads: props.radsdel,
            posdel: props.posdel,
            radsdel: props.radsdel,
        };
    }
    update = () => {

    }

    render = () => {
        this.update()
        return (
            <>
                <div className="Block" style={{transform: `translateX(${this.state.posx}px)`}}>
                    {this.state.posx}
                    <div id="rod" style={{transform: "rotate(" + (Math.PI - this.state.rads) + "rad)"}}>
                        <div id="pivot"></div>
                        <div id="ball"></div>
                    </div>
                </div>

            </>
        )
    }


}