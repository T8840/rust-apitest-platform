// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}

contract CaseContract {
    struct CaseDetails {
        string host;
        string uri;
        string method;
        string request_body;
        string expected_result;
        string category;
        string response_code;
        string response_body;
    }

    struct Case {
        string id;
        string title;
        CaseDetails details;
        bool used;
        uint256 created_at;
        uint256 updated_at;
    }
    
    mapping(string => Case) public cases;
    MyToken public token;
    uint256 public tokenCost = 100;
    address public admin;

    constructor(MyToken _token) {
        token = _token;
        admin = msg.sender; // Set the deployer as the admin
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function setTokenCost(uint256 _newCost) public onlyAdmin {
        tokenCost = _newCost;
    }

    function createCase(
        string memory _id,
        string memory _title,
        CaseDetails memory _details
    ) public {
        require(token.balanceOf(msg.sender) >= 100, "Insufficient tokens");
        token.transferFrom(msg.sender, address(this), 100);
        cases[_id] = Case(
            _id,
            _title,
            _details,
            false,
            block.timestamp,
            block.timestamp
        );
    }
}
