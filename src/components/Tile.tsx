type TileProps = {
  value: number;
};

function getTileClass(value: number): string {
  if (value === 0) return 'tile tile-empty';
  return 'tile tile-' + value.toString();
}

function Tile({ value }: TileProps) {
  const tileClass = getTileClass(value);
  return <div className={tileClass}>{value !== 0 ? value : ''}</div>;
}

export default Tile;
