import './App.css'
import { Game } from "./game/Game";
import { Tile } from "./game/Tile";

import DefaultMenu from './assets/default_menu.svg';
import HoverMenu from './assets/hover_menu.svg';

import React, {useEffect, useState} from 'react';

function Title() {
    const [hover, setHover]  = React.useState(false);
    return (
        <img
            src={hover ? HoverMenu : DefaultMenu}
            alt="2048"
            className="title-image"
            draggable="false"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        />
    );
}

function Score({score, best}: {score: number, best: number}) {
    return <div className="scores-container">
        <div className="score-item" id="current-score">
            <div className="score-header">SCORE</div>
            <div className="score">{score}</div>
        </div>
        <div className="score-item" id="best-score">
            <div className="score-header">BEST</div>
            <div className="score">{best}</div>
        </div>
    </div>
}

function getTileColor(value: number) {
    if (value>16384) {
        return "#000";
    }

    switch (value) {
        case 2: return "#eee4da";
        case 4: return "#ebd8b6"
        case 8: return "#f1ae71"
        case 16: return "#f69664";
        case 32: return "#f67c5f";
        case 64: return "#f7603c";
        case 128: return "#ecd072";
        case 256: return "#eecc62";
        case 512: return "#eec950";
        case 1024: return "#edc53f";
        case 2048: return "#edc12e";
        case 4096: return "#b586b4";
        case 8192: return "#a861ab";
        case 16384: return "#a048a3";

        default: return "#bdac97";
    }
}

function NewGame({ onClick }: { onClick: () => void }) {
    return <button id="new-game-button" onClick={onClick}>New Game</button>;
}

export function App() {
    const [game, setGame] = useState(new Game());
    const [boardState, setBoardState] = useState(game.board);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    const updateBoard = () => {
        setBoardState([...game.board]);
        setScore(game.score);
        setBestScore(Math.max(bestScore, game.score));
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            let moved = false;
            if (e.key === "ArrowUp" || e.key === "w") moved = game.turnUp();
            if (e.key === "ArrowDown" || e.key ==="s") moved = game.turnDown();
            if (e.key === "ArrowLeft"|| e.key === "a") moved = game.turnLeft();
            if (e.key === "ArrowRight" || e.key === "d") moved = game.turnRight();
            if (moved) updateBoard();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [game, bestScore]);

    const handleNewGame = () => {
        const newGame = new Game();
        setGame(newGame);
        setBoardState(newGame.board);
        setScore(0);
    };

    return (
        <div>
            <header className="header">
                <div className="title"><Title/></div>
                <div className="scores"><Score score={score} best={bestScore} /></div>
                <div className="new-game"><NewGame onClick={handleNewGame}/></div>
            </header>
            <div id="game-container">
                <div id="board">
                    {boardState.flat().map((tile: Tile | null, index: number) => (
                        <div
                            key={index}
                            className="board-tile"
                            style={{
                                backgroundColor: tile ? getTileColor(tile.getValue()) : "#ccc0b3",
                                color: tile && tile.getValue() > 4 ? "#fff" : "#756452"
                            }}
                        >
                            {tile ? tile.getValue() : ""}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


