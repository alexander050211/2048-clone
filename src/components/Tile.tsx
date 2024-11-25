import styles from './Tile.module.css';

type TileProps = {
  value: number;
};

function getTileClass(value: number): string {
  const baseClass = styles.tile;
  if (baseClass === undefined || styles.tileEmpty === undefined) return ``;
  if (value === 0) {
    return `${baseClass} ${styles.tileEmpty}`;
  }
  if (value >= 128) {
    if (styles.tile128 === undefined) return ``;
    return `${baseClass} ${styles.tile128}`;
  }
  const valueClass = styles[`tile${value}` as keyof typeof styles];
  if (valueClass === undefined) return ``;
  return `${baseClass} ${valueClass}`;
}

function Tile({ value }: TileProps) {
  const tileClass = getTileClass(value);
  return <div className={tileClass}>{value !== 0 ? value : ''}</div>;
}

export default Tile;
