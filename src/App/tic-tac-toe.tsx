import { style } from "solid-js/web";
import { MainScreen, SubScreen, Screen } from "../Components/Screens";
import { createEffect, createMemo, createSignal, Index } from "solid-js";
import "./tic-tac-toe.css";
import styles from "./tic-tac-toe.css";
import { BoardState, symbl, bool } from "./types";
import { scoreEachInd, checkMaxScore, checkWin, victoryInds, isDraw, getBestMove, max_score_info_type } from "./logic";
import { sleep } from "./general";

const TicTacToeGame = () => {
    const AI_delay = 690; // milliseconds
    let AI_1 = false,
        AI_2 = false;
    // let flag = true;
    const [boardState, setBoardState] = createSignal<BoardState>(["", "", "", "", "", "", "", "", ""]); // l = ["X", "O", "X", "O", "X", "O", "X", "O", "X"]; [list(map(lambda x:int(x)-1,e)) for e in l]
    const [boardStateClass, setBoardStateClass] = createSignal(["unmrk", "unmrk", "unmrk", "unmrk", "unmrk", "unmrk", "unmrk", "unmrk", "unmrk"]);
    const [turn, setTurn] = createSignal(true);
    const [curPlayer, setCurPlayer] = createSignal(true);
    const [player1, setPlayer1] = createSignal(true);
    const [player2, setPlayer2] = createSignal(true);
    const [playable, setPlayable] = createSignal(true);
    const [isDrawn, setIsDrawn] = createSignal(false);
    const [score1, setScore1] = createSignal(0);
    const [score2, setScore2] = createSignal(0);
    const combinedClass1 = createMemo(() => "player-info " + (turn() ? "selected" : ""));
    const combinedClass2 = createMemo(() => "player-info " + (!turn() ? "selected" : ""));
    const [vs, setVS] = createSignal("V/S");
    let scores: number[] = new Array(8),
        max_score_info: max_score_info_type = { maxScore: 0, numberOfOccurrence: 0, indices: [] };
    const getTurnSymbl = (t: bool): symbl => (t ? "X" : "O");
    const markCell = (index: number) => {
        if (!boardState()[index] && playable()) {
            let cur_turn = turn();
            let cur_turn_symb: symbl = getTurnSymbl(cur_turn);
            let nxt_turn_symb: symbl = getTurnSymbl(!cur_turn);
            setBoardState([...boardState().slice(0, index), turn() ? "X" : "O", ...boardState().slice(index + 1)] as BoardState);
            console.log(cur_turn, boardState());
            scores = scoreEachInd(boardState(), cur_turn_symb);
            max_score_info = checkMaxScore(scores);
            console.log(cur_turn, scores);
            if (checkWin(max_score_info)) {
                let cur_board_state = Array.from(boardState()) as BoardState;
                let cur_board_state_class = Array.from(boardStateClass());
                console.log("victoryInds", victoryInds[max_score_info.indices[0]]);
                for (let i of victoryInds[max_score_info.indices[0]]) cur_board_state_class[i] = "won";
                cur_board_state_class[index] = "vic";
                console.log(cur_board_state_class);
                for (let i in cur_board_state) if (cur_board_state[i] && cur_board_state[i] !== cur_turn_symb) cur_board_state_class[i] = "lost";
                if (cur_turn) setScore1(score1() + 1);
                else setScore2(score2() + 1);
                setCurPlayer(cur_turn);
                setPlayable(false);
                setBoardState(cur_board_state);
                setBoardStateClass(cur_board_state_class);
            } else {
                setBoardStateClass([...boardStateClass().slice(0, index), "mrkd", ...boardStateClass().slice(index + 1)]);
                if (setIsDrawn(isDraw(boardState(), nxt_turn_symb))) {
                    console.log("Drawn");
                    setCurPlayer(!curPlayer());
                    setPlayable(false);
                    setIsDrawn(true);
                }
            }
            setTurn(!cur_turn);
        }
    };
    createEffect(() => {
        if (!playable()) {
            setVS("Reset");
        }
    });

    const reset = () => {
        const board_state_default = ["", "", "", "", "", "", "", "", ""] as BoardState,
            board_state_class_default = ["unmrk", "unmrk", "unmrk", "unmrk", "unmrk", "unmrk", "unmrk", "unmrk", "unmrk"];
        setBoardState(board_state_default);
        setPlayable(true);
        setIsDrawn(false);
        setBoardStateClass(board_state_class_default);
        setTurn(curPlayer());
        // AI_play();
        // const plyr1 = player1();
        // setPlayer1(!plyr1);
        // setPlayer1(plyr1);
    };

    const changePlayer = (event: Event) => {
        if (event.target == null) return;
        const value = (event.target as HTMLInputElement).value;
        console.log(value);
        const doing_ai_pre = AI_1 || AI_2;
        if (value === "P1") {
            AI_1 = false;
            setPlayer1(true);
        }
        if (value === "A1") {
            AI_1 = true;
            setPlayer1(false);
        }
        if (value === "P2") {
            AI_2 = false;
            setPlayer2(true);
        }
        if (value === "A2") {
            AI_2 = true;
            setPlayer2(false);
        }
        const doing_ai_pst = AI_1 || AI_2;
        if (!doing_ai_pre && doing_ai_pst) AI_play();
    };

    const AI_play = (delay = AI_delay) => {
        const cur_turn = getTurnSymbl(turn());
        // if ((!player1() && cur_turn === "X") || (!player2() && cur_turn === "O")) setTimeout(() => markCell(getBestMove(boardState(), cur_turn)), AI_delay);
        // if ((!player1() && cur_turn === "X") || (!player2() && cur_turn === "O")) markCell(getBestMove(boardState(), cur_turn));
        if ((AI_1 && cur_turn === "X") || (AI_2 && cur_turn === "O")) markCell(getBestMove(boardState(), cur_turn));
        else if (!(AI_1 || AI_2)) return; // Check before delay postpone
        // {
        //     if (delay > 2000) return;
        //     return setTimeout(() => AI_play(delay + 100), delay);
        // }
        setTimeout(() => AI_play(delay), delay);
    };

    // setInterval(AI_play, AI_delay);
    // createEffect(AI_play);

    return (
        <MainScreen>
            <h1>Tic-Tac-Toe</h1>
            <SubScreen id="sub">
                <Screen id="board-screen">
                    <div id="board" class={(playable() ? "" : "pe-non") + " " + (isDrawn() ? "drw" : "")}>
                        <Index each={boardState()}>
                            {(item, index) => (
                                <div onClick={() => markCell(index)} id={`board-cell-${index}`} class={`board-cell ${boardStateClass()[index]}`}>
                                    {boardState()[index]}
                                </div>
                            )}
                        </Index>
                    </div>
                </Screen>
                <Screen id="info-screen">
                    <SubScreen id="game-info" class="info-subs">
                        <Screen class={combinedClass1()}>
                            <Screen>
                                <select value="P1" class="player-select" onChange={changePlayer}>
                                    <option value="P1">Player 1</option>
                                    <option value="A1">AI 1</option>
                                </select>
                            </Screen>
                            <div class="trn-ind">Symbol: X</div>
                            <div class="score">{score1()}</div>
                        </Screen>
                        <div id="player-sep" onMouseOver={() => setVS("Reset")} onMouseOut={() => (playable() ? setVS("V/S") : undefined)} onclick={reset}>
                            {vs()}
                        </div>
                        <Screen class={combinedClass2()}>
                            <Screen>
                                <select value="P2" class="player-select" onChange={changePlayer}>
                                    <option value="P2">Player 2</option>
                                    <option value="A2">AI 2</option>
                                </select>
                            </Screen>
                            <div class="trn-ind">Symbol: O</div>
                            <div class="score">{score2()}</div>
                        </Screen>
                    </SubScreen>
                    <SubScreen id="game-desc" class="info-subs">
                        Info
                    </SubScreen>
                </Screen>
            </SubScreen>
        </MainScreen>
    );
};

export default TicTacToeGame;
