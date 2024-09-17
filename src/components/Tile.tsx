type TileProps = {
    value: number;
}

function Tile({ value }: TileProps) {

    return (
        <div>
            {value !== 0 ? value : ''}
        </div>
    );
}

export default Tile;