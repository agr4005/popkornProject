import React, { Component } from "react";
import throttle from "lodash.throttle";
import { ROWS, COLS, INITIAL_DELAY, DELAY_EXPONENT } from "./config";
import SnakeGameLogic from "./SnakeGameLogic";
import SnakeGameView from "./SnakeGameView";

import './SnakeGame.css';
import { apiCall } from "../../../service/apiService";

export default class SnakeGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameState: null,
            table: new Array(ROWS).fill(null).map(() => new Array(COLS).fill(null)),
            records: [] // 새로운 상태 records 추가
        };
        this.handleKeydown = throttle(this.handleKeydown.bind(this), 100);
        this.nextFrame = this.nextFrame.bind(this);
        this.delay = INITIAL_DELAY;
        this.timeoutID = null;
        this.intervalID = null;
        this.logic = new SnakeGameLogic();
        this.isLogined = false;
        this.errMessage = 'Permission denied.';
    }
    componentDidMount() {
        if(sessionStorage.getItem('loginID')){
           this.isLogined=true;
        }

        apiCall(`/api/user/snakegame/getrecord`,"POST", sessionStorage.getItem('nickname'), sessionStorage.getItem('token'))
        .then(response => this.setState({ records: response.data }))
        .catch(error => {
            this.errMessage = 'Permission denied.';
        })

        this.updateTable();
    }

    init = () => {
        this.delay = INITIAL_DELAY;

        const table = new Array(ROWS)
            .fill(null)
            .map(() => new Array(COLS).fill(null));
        this.logic = new SnakeGameLogic();

        this.setState({
            table
        });
    };
    updateTable = () => {
        const { table } = this.state;
        const { joints, fruit: f } = this.logic;
        if (!joints || !f) return;
        for (let r of table) {
            r.fill(null);
        }
        if (f.y < table.length && f.x < table[f.y].length) {
            table[f.y][f.x] = "fruit";
        }
        for (let j of joints) {
            if (j.y < table.length && j.x < table[j.y].length) {
                table[j.y][j.x] = "joint";
            }
        }
        this.setState({
            table
        });
    };
    start = () => {
        // FIXME: '다시하기'를 두 번 클릭해야 다시 시작하는 오류 해결해야 함
        document.addEventListener("keydown", this.handleKeydown);
        this.setState({
            gameState: "running"
        });
        this.intervalID = setInterval(() => {
            this.delay *= DELAY_EXPONENT;
        }, 1000);
        this.nextFrame();
    };
    handleKeydown = e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            switch (e.key) {
                case "ArrowUp":
                    this.logic.up();
                    this.nextFrame();
                    break;
                case "ArrowDown":
                    this.logic.down();
                    this.nextFrame();
                    break;
                case "ArrowLeft":
                    this.logic.left();
                    this.nextFrame();
                    break;
                case "ArrowRight":
                    this.logic.right();
                    this.nextFrame();
                    break;
                default:
                    return;
            }
        }
    };
    nextFrame = () => {
        clearTimeout(this.timeoutID);
        const proceed = this.logic.nextState();
        if (!proceed) {
            apiCall('/api/user/snakegame/insertrecord', "POST", {nickname : sessionStorage.getItem('nickname'), record : this.logic.joints.length}, sessionStorage.getItem('token'))
            .then( response => this.setState({ records: response.data }))
            .catch( ()=>{

            })
            this.setState({
                gameState: "end"
            });
            this.cleanup();
        } else {
            this.updateTable();
            this.timeoutID = setTimeout(this.nextFrame, this.delay);
        }
    };
    cleanup = () => {
        document.removeEventListener("keydown", this.handleKeydown);
        clearTimeout(this.timeoutID);
        clearInterval(this.intervalID);
    };
    render() {
        const { gameState, table, records } = this.state;
        return (
            <SnakeGameView
                key={this.logic}
                logic={this.logic}
                table={table}
                gameState={gameState}
                records={records} // records를 props로 전달
                init={this.init}
                start={this.start}
                updateTable={this.updateTable}
                onKeyPressed={this.handleKeydown}
                isLogined={this.isLogined}
                errMessage={this.errMessage}
            />
        );
    }
}