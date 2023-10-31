const { getAllCanditatesFromConstituency_service } = require("../services/candidate");

exports.getAllCanditatesFromConstituency = (req, res) => {
    let constituency = req.profile.constituency;
    console.log(req.profile);
    getAllCanditatesFromConstituency_service(constituency, (err, results) => {
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