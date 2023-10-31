const pool = require("../database");

exports.vote_service = (data, callBack) => {
    console.log(data);
    pool.query("INSERT INTO vote VALUES(?, ?, ?)", [data.voterId, data.electionId, data.candidateId], (err, result, fields) => {
        if (err) {
            return callBack(err);
        }
        else {
            console.log(result);
            return callBack(null, result[0]);
        }
    })
}

exports.election_service = (callBack) => {
    pool.query("SELECT * FROM election", [], (err, result, fields) => {
        if (err) {
            callBack(err);
        }
        console.log(result);
        return callBack(null, result);
    })
}
exports.results_service = (data, callBack) => {
    pool.query("select candidate,party,constituency,count(candidate) as votes from vote inner join candidate on vote.candidate=candidate.candidateID where electionID=? group by candidate;", [data], (err, result, fields) => {
        if (err) {
            callBack(err);
        }
        console.log(result);
        return callBack(null, result);
    })
}