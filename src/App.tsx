import './App.css'
// import { Game } from "./game/Game;
// import { Tile } from "./game/Tile";

import DefaultMenu from './assets/default_menu.svg'

// import React, { useState } from 'react';

function Title() {
    return <img src={DefaultMenu} alt="2048" className="title-image" />;
}

function Score() {
    return <div className="scores-container">
        <div className="score-item" id="current-score">
            <div className="score-header">SCORE</div>
            <div className="score">0</div>
        </div>
        <div className="score-item" id="best-score">
            <div className="score-header">BEST</div>
            <div className="score">0</div>
        </div>
    </div>
}

function Board() {
    const size = 4;

    const tiles = Array.from({length: size * size}, (_, i) => i);

    return (
        <div id="board">
            {tiles.map((index) => (
                <div key={index} className="board-tile" id={`tile-${index + 1}`}></div>
            ))}
        </div>
    )
}


function NewGame() {
    return <button id="new-game-button">New Game</button>
}

export function App() {
    return (
        <div>
            <header className="header">
                <div className="title"><Title/></div>
                <div className="scores"><Score /></div>
                <div className="new-game"><NewGame/></div>
            </header>
            <div id="game-container">
                <Board />
            </div>
        </div>
    );
}


