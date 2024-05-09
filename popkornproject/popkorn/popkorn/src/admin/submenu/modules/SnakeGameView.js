import React, { Component } from "react";

export default class SnakeGameView extends Component {
    handleClickStart = () => {
        if (this.props.isLogined) {
            this.props.start();
        } else {
            alert('Permission denied.')
        }
    };
    handleClickRestart = () => {
        this.props.init();
        this.props.updateTable();
        this.props.start();
    };
    render() {
        const { gameState, table, onKeyPressed, logic, records } = this.props;
        const lastRecord = records.length > 0 ? records[0] : null;

        return (
            <div className="snakegame_wrap">
                <div className="snakegame_header">
                    <span>SnakeGame !!</span>
                    <p>Your best : &nbsp;<span>{lastRecord ? lastRecord.record : '0'}</span> length</p>
                </div>
                <div
                    className={`game ${gameState === "end" ? "end" : ""}`}
                    onKeyDown={onKeyPressed}
                    tabIndex="0"
                >
                    <div className="table">
                        {table.map((cols, colIndex) => (
                            <div className="table__row" key={colIndex}>
                                {cols.map((cell, cellIndex) => (
                                    <div
                                        key={cellIndex}
                                        className={`table__cell ${cell === "joint" ? "joint" : cell === "fruit" ? "fruit" : ""
                                            }`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="description">
                        {gameState === "end" ? (
                            <div>
                                <span>기록: {logic.joints.length}</span>
                                <button
                                    className="button restart-button"
                                    onClick={this.handleClickRestart}
                                >
                                    다시 시작
                                </button>
                            </div>
                        ) : gameState === "running" ? (
                            <div>현재 길이: {logic.joints.length}</div>
                        ) : (
                            <button
                                className="button start-button"
                                onClick={this.handleClickStart}
                            >
                                게임 시작
                            </button>
                        )}
                    </div>
                </div>
                <br></br>
                <div className="rank_div">
                    <span className="rank_span"><i className="xi-trophy"></i>&nbsp;Rank&nbsp;<i className="xi-trophy"></i></span>
                    <table>
                        <thead>
                            <tr>
                                <th>Nickname</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.isLogined ?
                                    records.slice(1).map((record, index) => ( // records 배열의 처음 3개 요소만을 가져와서 map
                                        <tr key={index}>
                                            <td><i className={`xi-crown ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}></i> {record.nickname}</td>
                                            <td>{record.record}</td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="2">
                                            <span>{this.props.errMessage}</span>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}