import { BoardState, symbl } from "./types";

const victoryInds = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const countOccurrences = <T>(arr: Array<T>, val: T) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

const getBestMove = (boardState: BoardState, symbl: symbl): number => {
    const opont = symbl === "X" ? "O" : "X";
    for (const combo of victoryInds) {
        const [i, j, k] = combo;
        const [a, b, c] = combo.map((x) => boardState[x]);
        const my_score = +(a === symbl) + +(b === symbl) + +(c === symbl);
        const op_score = +(a === opont) + +(b === opont) + +(c === opont);
        if ((my_score == 2 && op_score == 0) || (op_score == 2 && my_score == 0)) {
            if (a == "") return i;
            if (b == "") return j;
            if (c == "") return k;
        }
    }
    const emptySpaces = boardState.reduce((acc, cell, index) => {
        if (cell === "") {
            acc.push(index);
        }
        return acc;
    }, [] as number[]);
    return emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
};

const isDraw = (boardState: BoardState, turn: symbl): boolean => {
    const ttl_empty = countOccurrences(boardState, "");
    const ttl_empty_m1 = ttl_empty > 1;
    const ttl_empty_m2 = ttl_empty > 2;
    let x, o, e;
    for (const ind of victoryInds) {
        const arr = [boardState[ind[0]], boardState[ind[1]], boardState[ind[2]]];
        x = countOccurrences(arr, "X");
        o = countOccurrences(arr, "O");
        e = countOccurrences(arr, "");
        // if ((ttl_empty_m2 && e > 1) || (e == 1 && ((x == 2 && turn == "X") || (o == 2 && turn == "O")))) { // Ideal no miss last block
        if ((ttl_empty_m2 && e > 1) || (e == 1 && ((x == 2 && (turn == "X" || ttl_empty_m1)) || (o == 2 && (turn == "O" || ttl_empty_m1))))) {
            // console.log("x:", x, "\no:", o, "\n_:", e, "\nt:", turn);
            return false;
        }
        // console.log("x:", x, "\no:", o, "\n_:", e, "\nt:", turn);
    }
    return true;
};

const scoreEachInd = (board_state: Array<string>, turn: "X" | "O") => {
    let scores = new Array<number>(8);
    for (const [i, inds] of victoryInds.entries()) scores[i] = Number(board_state[inds[0]] === turn) + Number(board_state[inds[1]] === turn) + Number(board_state[inds[2]] === turn);
    return scores;
};

const checkMaxScore = (scores: number[]): max_score_info_type => {
    const maxScore = Math.max(...scores);
    const numberOfOccurrence = scores.filter((score) => score === maxScore).length;
    const indices = scores.reduce((acc, score, index) => {
        if (score === maxScore) {
            acc.push(index);
        }
        return acc;
    }, [] as number[]);
    return { maxScore: maxScore, numberOfOccurrence: numberOfOccurrence, indices: indices };
};

const checkWin = (check_max_score: max_score_info_type) => check_max_score.maxScore === 3;

type max_score_info_type = { maxScore: number; numberOfOccurrence: number; indices: number[] };

export { scoreEachInd, checkMaxScore, checkWin, victoryInds, isDraw, getBestMove, type max_score_info_type };
