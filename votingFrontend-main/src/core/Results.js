import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { results } from "./helper/coreapicalls";
import ImageHelper from "./helper/ImageHelper";




const Results = () => {
    const [arr, setArr] = useState([]);
    const load = () => {
        results("45123").then((data) => {
            setArr(data.data);
        })
    }
    useEffect(() => {
        load();
    }, [])
    const card = (candidate, party, constituency, votes) => {
        return (
            <div style={{ background: "#000000" }} className="card text-white border border-light">
                <ImageHelper name={party} />
                <div className="card-body">
                    <h5 className="card-title text-warning">CandidateID: {candidate}</h5>
                    <p className="card-text">Party: {party}</p>
                    <p className="card-text">Constituency: {constituency}</p>
                    <p className="card-text">Votes: {votes}</p>


                    <div className="d-grid gap-2 d-md-flex mt-3">

                    </div>

                </div>
            </div>
        );
    }
    return (
        <Base title="Results Page" description="A page for user to view results">
            <div className="row">{arr.map((value, index) => {
                return <div key={index} className="col-3">{card(value.candidate, value.party, value.constituency, value.votes)}</div>
            })}</div>

        </Base>
    );
};

export default Results;