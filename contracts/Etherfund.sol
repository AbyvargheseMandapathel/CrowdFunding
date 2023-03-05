// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Etherfund {
    uint256 a = 10;

    uint256 minimuContribution = 1000 wei; // minimum value for contribution (in wei)
    uint256 totalCampaigns = 0; // for creating id for campaigns (increments after inserting each campaign to array)

    // Campaign structure to save data of campaign
    struct Campaign {
        uint256 id;
        uint256 createdAt; // in timestamp
        address payable fundRaiser; // address of fundraiser
        string title;
        string desc;
        string category;
        uint256 amountRequired;
        uint256 collectedAmount;
        uint256 deadline;
        uint256 noOfVoters; // total voters
        bool isRequestedToVote; // is this campaign is requested for voting for withdrawl
        bool isCompleted; // for checking the campaign is completed or not
    }

    Campaign[] public campaigns; // to save each campaign

    // create a new campaign
    function createCampaign(
        string memory _title,
        string memory _desc,
        string memory _category,
        uint256 _deadline,
        uint256 _amountRequired
    ) public {
        Campaign memory newCampaign = Campaign(
            totalCampaigns, 
            block.timestamp, // timestamp when the new block is created
            payable(msg.sender), // address of fundraiser is converting to payable for withdrawl in future
            _title,
            _desc,
            _category,
            _amountRequired,
            0, // collected amount initially 0
            _deadline,
            0, // no of voters initially 0
            false, // requested to vote is initially false
            false // completed is initially false
        );

        campaigns.push(newCampaign); // push newly created campaign to array
        totalCampaigns++; // increment no of campaigns
    }

    // send all campaigns
    function getAllCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    // sample
    function setter(uint256 _a) public {
        a = _a;
    }

    // sample
    function getter() public view returns (uint256) {
        return a;
    }
}
