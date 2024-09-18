type RestartProps = {
    onRestart: () => void;
};

function Restart({ onRestart }: RestartProps) {
    return (
        <div className="restart">
            <button onClick={onRestart}>New Game</button>
        </div>
    );
}

export default Restart;