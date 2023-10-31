import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { party, vote } from "./helper/coreapicalls";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import { useEffect } from "react";

const startPayment = async ({ setError, setTxs, ether, addr }) => {
    console.log(2)
    try {
        if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");

        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        ethers.utils.getAddress(addr);
        const tx = await signer.sendTransaction({
            to: addr,
            value: ethers.utils.parseEther(ether)
        });
        console.log({ ether, addr });
        console.log("tx", tx);
        setTxs([tx]);
    } catch (err) {
        setError(err.message);
    }
};

const Vote = () => {
    const user = isAutheticated().result;
    const [arr, setArr] = useState([]);
    const load = () => {
        party(user.voterID).then(data => {
            setArr(data.data);
        });
    }
    useEffect(() => {
        load();
    }, [])
    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);
    const [values, setValues] = useState({
        voterID: "105",
        electionID: "45123",
        candidateID: "100256",
        candidateAdd: "0x430252D122aFF94e9F4549c5625070034DfA24F6",
        error: false,
        loading: false,
    });
    const { voterID, electionID, candidateID, candidateAdd } = values;
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6  text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: values.error ? "" : "none" }}
                    >
                        {values.error}
                    </div>
                </div>
            </div>
        );
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        setError();
        vote({ voterID, electionID, candidateID }).then(data => {
            console.log(data, "hmm");
            if (data.success === 0) {
                console.log("fail", data.message.code)
                setValues({ ...values, error: data.message.code, loading: false });

            } else {
                console.log("success")
                setValues({
                    ...values, error: false, loading: false
                });
                startPayment({
                    setError,
                    setTxs,
                    ether: "0.01",
                    addr: candidateAdd
                });
            }
        }).catch((err) => {
            console.log(err)
        });
        // await startPayment({
        //     setError,
        //     setTxs,
        //     ether: "0.01",
        //     addr: candidateAdd
        // });

    };
    return (
        <Base title="Voting page" description="A page for user to vote!">
            {/* {console.log(user, "hi")} */}
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">voterID</label>
                            <input
                                onChange={handleChange("voterID")}
                                value={voterID}
                                className="form-control"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">electionID</label>
                            <input
                                onChange={handleChange("electionID")}
                                value={electionID}
                                className="form-control"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Party</label>
                            {/* <input
                                onChange={handleChange("candidateID")}
                                value={candidateID}
                                className="form-control"
                                type="text"
                            /> */}
                            <select className="custom-select mr-sm-2" onChange={handleChange("candidateID")}>
                                <option >Choose...</option>
                                {/* {console.log(arr)} */}
                                {arr.map((candidate, index) => {
                                    // console.log(candidate);
                                    return <option key={index} value={candidate.candidateID}>{candidate.party}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-light">candidateAdd</label>
                            <input
                                onChange={handleChange("candidateAdd")}
                                value={candidateAdd}
                                className="form-control"
                                type="text"
                            />
                        </div>
                        {errorMessage()}
                        <button onClick={onSubmit} className="btn btn-success btn-block">
                            Submit
                        </button>

                        <ErrorMessage message={error} />
                        <TxList txs={txs} />
                    </form>

                </div>
            </div>

        </Base>
    );
};

export default Vote;