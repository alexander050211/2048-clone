type ScoreBoardProps = {
    score: number;
    bestScore: number;
};

function ScoreBoard({ score, bestScore }: ScoreBoardProps) {
    return (
        <div className="score-board">
            <div className="score">
                <div>Score</div>
                <div>{score}</div>
            </div>
            <div className="best-score">
                <div>Best</div>
                <div>{bestScore}</div>
            </div>
        </div>
    );
}

export default ScoreBoard;