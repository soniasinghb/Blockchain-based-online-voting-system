const { getVoterById_service, getVoters_service, updateVoter_service, deleteVoter_service } = require("../services/voter")

//param
const getVoterById = (req, res, next, id) => {
    getVoterById_service(id, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record not Found"
            });
        }
        // results.password = undefined;
        req.profile = results;
        console.log(req.profile);
        next();
    });
}

const getVoter = (req, res) => {
    console.log(req.proile);
    return res.json(req.proile);
}

const getVoters = (req, res) => {
    getVoters_service((err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            data: results
        });
    });
}

const updateVoter = (req, res) => {
    const body = req.body;
    const saltRounds = 10;
    bcrypt.hash(body.password, saltRounds, function (err, hash) {
        body.password = hash
    });
    updateVoter_service(body, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            message: "updated successfully"
        });
    });
}

const deleteVoter = (req, res) => {
    const data = req.body;
    deleteVoter_service(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record Not Found"
            });
        }
        return res.json({
            success: 1,
            message: "user deleted successfully"
        });
    });
}

module.exports = { getVoterById, getVoters, updateVoter, deleteVoter, getVoter };