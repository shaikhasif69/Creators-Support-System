const Campaign = require('../models/Campaign')

exports.addCampaign = async function(req, res){
    let campaign = new Campaign()
    await campaign.addCampaign()
    res.send("Added")
}