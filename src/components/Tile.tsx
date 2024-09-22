type TileProps = {
  value: number;
};

function Tile({ value }: TileProps) {
  return <div className="tile">{value !== 0 ? value : ''}</div>;
}

export default Tile;
