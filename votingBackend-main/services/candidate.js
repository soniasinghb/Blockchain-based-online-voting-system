const pool = require("../database");

exports.getAllCanditatesFromConstituency_service = (data, callBack) => {
    console.log(data);
    pool.query("SELECT * FROM candidate WHERE constituency=?", [data], (err, result, fields) => {
        if (err) {
            callBack(err);
        }
        console.log(result);
        return callBack(null, result);
    })
}