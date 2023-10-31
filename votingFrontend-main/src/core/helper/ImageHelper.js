import React from 'react'
// import { API } from '../../backend';
import BJP from '../../images/BJP.png'
import BSP from '../../images/BSP.png'
import INC from '../../images/INC.png'

const ImageHelper = ({ name }) => {
    // const imageurl = movie?`${API}/movie/photo/${movie.movie_id}`:"";
    console.log(name);
    let image = "";
    if (name == "BJP") {
        image = BJP;
    }
    else if (name == "BSP") {
        image = BSP;
    }
    else if (name == "INC") {
        image = INC;
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="rounded border border-dark p-2">
            <img
                src={image}
                alt="movie"
                style={{ width: "200px" }}
                className="mb-3 rounded"
            />
        </div>
    )
}

export default ImageHelper;