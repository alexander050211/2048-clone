import styles from './ScoreBoard.module.css';

type ScoreBoardProps = {
  score: number;
  bestScore: number;
};

function ScoreBoard({ score, bestScore }: ScoreBoardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.scoreBoard}>
        <div className={styles.name}>Score</div>
        <div className={styles.score}>{score}</div>
      </div>
      <div className={styles.scoreBoard}>
        <div className={styles.name}>Best</div>
        <div className={styles.score}>{bestScore}</div>
      </div>
    </div>
  );
}

export default ScoreBoard;
