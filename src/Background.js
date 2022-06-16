
import React, { useState, useEffect } from 'react';
import './Background.css';
import "./Timer"
import MovingPendulum from "./MovingPendulum"
import Timer from "./Timer";
export default function Background() {

    return (
        <div className="Background">
            <div className="background">
                <header className="background-header">
                </header>
            </div>
            <div className="ground">
                <header className="ground-header">
                </header>
            </div>
            <Timer startTimeInSecodns={0} posx = {0} theta = {0.1} delposx = {0} deltheta = {0}/>
        </div>
    );
}