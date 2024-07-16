import { createSignal, ErrorBoundary, For, JSX, Match, Switch, type Component } from "solid-js";
import TicTacToeGame from "./App/tic-tac-toe";

const AppError = (error: Error, reset: () => void) => {
    const errorStyle = `
    color: red;
    font-weight: bold;
    padding: 1rem;
    border: 1px solid red;
    border-radius: 4px;
  `;

    const stackStyle = `
    color: #666; /* Lighter gray for stack trace */
    font-family: monospace;
    margin: 0; /* Remove default margin for better formatting */
  `;

    return (
        <div style={errorStyle}>
            <h1>Something went wrong!</h1>
            <h4>at App.tsx</h4>
            <p>{error.message}</p>
            {error.stack && (
                <pre>
                    <For each={error.stack.split("\n")} fallback={<></>}>
                        {(line) => <span style={stackStyle}>{line}\n</span>}
                    </For>
                </pre>
            )}
            <button onClick={reset}>Reset</button>
        </div>
    ) as JSX.Element;
};

const Broken: Component = () => {
    throw new Error("Oh No");
    return <>Never Getting Here</>;
};

const App: Component = () => {
    const [page, setPage] = createSignal("TicTacToe");
    return (
        <>
            <meta name="description" content="Fun Tic-Tac-Toe Game with AI. Modes: PvP, PvAI, AIvAI" />
            <meta property="og:title" content="Tic-Tac-Toe Game" />
            <meta property="og:url" content="https://mayank442000.github.io/Tic-Tac-Toe/" />
            <meta property="og:image" content="./src/assets/Tic-Tac-Toe-icon.png" />
            <link rel="shortcut icon" type="image/ico" href="./src/assets/Tic-Tac-Toe.ico" />
            <title>Tic-Tac-Toe Game</title>
            <ErrorBoundary fallback={(error, reset) => <AppError error={error} reset={reset} />}>
                <TicTacToeGame />
            </ErrorBoundary>
        </>
    );
};

export default App;
