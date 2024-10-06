 <!-- getPartnerAdditionalCharges = () => {
    let additionalCharges = this.props.additionalCharges;
    let charges = {};
    for (let i = 0; i < additionalCharges.length; i++) {
      charges[additionalCharges[i].chargeName] = additionalCharges[i];
      console.log("charges", charges);
    }
  } -->


  -- MarketPlacePortal 
      CustomerOpportunites (customerData) *
        OpportunityClosed *
          >> Click on Down button to change to OpportunityOpened
        OpportunityOpened *
          << Call API to get opportunites details
          PortOpportunity *
          >> Click BID to enable display of BidModal
          BidModal (Displayed if BID was clicked)
            PortwiseData *
              >> Click Bid button to open LaneBidCard
              >> Click Submit button will call the SUBMIT button API for this  OpportunityOpened and view returns to CustomerOpportunites with remaining opportunities
                << Call API to submit data for bid
          LaneBidCard (Displayed if BID for lane was clicked)        
            LaneAdditionalCharges2 *
              >> Click DONE to return to LaneBidCard and shows added additional charges
            >> Click Done returns BidModal 
            

