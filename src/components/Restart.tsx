type RestartProps = {
    onRestart: () => void;
};

function Restart({ onRestart }: RestartProps) {
    return (
        <div className="restart">
            <button onClick={onRestart}>Restart</button>
        </div>
    );
}

export default Restart;