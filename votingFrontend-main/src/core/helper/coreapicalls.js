import { API } from "../../backend";

export const vote = ({ voterID, electionID, candidateID }) => {
    return fetch(`${API}/vote/${voterID}/${electionID}/${candidateID}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ voterID, electionID, candidateID })
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};
export const party = (voterID) => {
    return fetch(`${API}/candidate/${voterID}`, {
        method: "GET"
    }).then(response => {
        // console.log(response.json(), "yo")
        return response.json();
    }).catch(err => console.log(err));
};
export const results = (electionID) => {
    return fetch(`${API}/results/${electionID}`, {
        method: "GET"
    }).then(response => {
        // console.log(response.json(), "yo")
        return response.json();
    }).catch(err => console.log(err));
};