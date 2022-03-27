const campaignsCollection = require('../db').db().collection("campaigns")

let Campaign= function(data) {
    this.data = data
    this.errors = []
  }


Campaign.prototype.cleanUp = function(){

    this.data = {
            campaignName: this.data.campaignName,
            startDate: this.data.CampaignStartDate,
            EndDate: this.data.CampaignEndDate,
            // influencerId: []
            
    }
}