import Album from "./Album";

function Albums({ albums }) {
    return (
        <div className="bg-indigo-950/50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full p-4">
            {albums.map((album) =>(<Album key={album._id}  album={album}/>))}
        </div>
    );
}

export default Albums;
