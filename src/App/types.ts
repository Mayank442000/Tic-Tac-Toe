enum Player {
    X = "X",
    O = "O",
}

type symbl = "X" | "O";
type bss = "X" | "O" | ""; // board_state_symbs
type BoardState = [bss, bss, bss, bss, bss, bss, bss, bss, bss]; //Array<string>[9];
type bool = boolean;

export { Player };
export type { BoardState, symbl, bss, bool };
