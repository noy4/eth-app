//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;
    uint public myNumber=8;
    address public myAddress = 0xE61bA2D15d91FcD2B7B24f9c2BE8757375b8b0CD;
    string public myString = 'What is up';

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function getMyNumber()public view returns(uint){
        return myNumber;
    }

    function getMyString()public view returns(string memory){
        return myString;
    }
}
