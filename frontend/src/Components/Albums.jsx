import Album from "./Album";

function Albums({ albums }) {
    return (
        <div className="Albums">
            {albums.map((album) =>(<Album key={album._id}  album={album}/>))}
        </div>
    );
}

export default Albums;
