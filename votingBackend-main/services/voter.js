const pool = require("../database");

const signUp_service = (data, callBack) => {
    pool.query("INSERT INTO voter VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [data.voterID, data.walletAddress, data.name, data.fathername, data.mothername, data.gender, data.address, data.DOB, data.age, data.constituency, data.password], (err, result, fields) => {
        if (err) {
            console.log(err);
            callBack(err);
        }
        console.log(result);
        return callBack(null, result);
    })
}

const getVoterById_service = (data, callBack) => {
    pool.query("SELECT * FROM voter WHERE voterID=?", [data], (err, result, fields) => {
        if (err) {
            callBack(err);
        }
        return callBack(null, result[0]);
    })
}

const getVoterByEmail_service = (data, callBack) => {
    console.log(data);
    pool.query("SELECT * FROM voter WHERE email=?", [data], (err, result, fields) => {
        if (err) {
            callBack(err);
        }
        console.log(result);
        return callBack(null, result[0]);
    })
}

const getVoters_service = (data, callBack) => {
    pool.query("", [], (err, result, fields) => {
        if (err) {
            callBack(err);
        }
        return callBack(null, result);
    })
}

const updateVoter_service = (data, callBack) => {
    pool.query("", [], (err, result, fields) => {
        if (err) {
            callBack(err);
        }
        return callBack(null, result);
    })
}

const deleteVoter_service = (data, callBack) => {
    pool.query("", [], (err, result, fields) => {
        if (err) {
            callBack(err);
        }
        return callBack(null, result);
    })
}


module.exports = { signUp_service, getVoterById_service, getVoters_service, updateVoter_service, deleteVoter_service, getVoterByEmail_service };