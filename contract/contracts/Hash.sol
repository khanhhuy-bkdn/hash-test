// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Hash {
    uint256 public id;
    mapping(uint256 => bytes) public hashList;

    event CreatedHash(uint256 id, bytes data);

    constructor() {}

    function createHash(bytes calldata data) public {
        require(data.length > 0, "Invalid data");

        id++;
        hashList[id] = data;

        emit CreatedHash(id, data);
    }
}
