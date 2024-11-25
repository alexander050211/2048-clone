import styles from './Restart.module.css';

type RestartProps = {
  onRestart: () => void;
};

function Restart({ onRestart }: RestartProps) {
  return (
    <div className={styles.restart}>
      <button onClick={onRestart}>New Game</button>
    </div>
  );
}

export default Restart;
