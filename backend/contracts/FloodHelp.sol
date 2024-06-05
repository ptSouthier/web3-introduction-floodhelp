// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

struct HelpRequest {
    uint id;
    address author;
    string title;
    string description;
    string contact;
    uint timestamp;
    uint goal;
    uint balance;
    bool open;
}

contract FloodHelp {

    uint public lastId = 0;
    mapping(uint => HelpRequest) public helpRequests;

    function openHelpRequest(
        string memory title,
        string memory description,
        string memory contact,
        uint goal
    ) public {
        lastId++;

        helpRequests[lastId] = HelpRequest({
            id: lastId,
            title: title,
            description: description,
            contact: contact,
            goal: goal,
            balance: 0,
            timestamp: block.timestamp,
            author: msg.sender,
            open: true
        });
    }

    function closeHelpRequest(uint id) public {
        HelpRequest memory currentRequest = helpRequests[id];
        address author = currentRequest.author;
        uint balance = currentRequest.balance;
        uint goal = currentRequest.goal;

        require(currentRequest.open && (msg.sender == author || balance >= goal), "Unnauthorized: You cannot close this Help Request!");

        helpRequests[id].open = false;

        if (balance > 0) {
            helpRequests[id].balance = 0;
            payable(author).transfer(balance);
        }
    }

    function donate(uint id) public payable {
        helpRequests[id].balance += msg.value;

        if (helpRequests[id].balance >= helpRequests[id].goal) {
            closeHelpRequest(id);
        }
    }

    function getOpenHelpRequests(uint startId, uint quantityToShow) public view returns (HelpRequest[] memory) {
        HelpRequest[] memory result = new HelpRequest[](quantityToShow);
        uint id = startId;
        uint count = 0;

        do {
            if (helpRequests[id].open) {
                result[count] = helpRequests[id];
                count++;
            }

            id++;
        } 
        while (count < quantityToShow && id <= lastId);

        return result;
    }
}
