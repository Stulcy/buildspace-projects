// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract RandomWords is ERC721URIStorage{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;

    constructor() ERC721 ("RandomWordsNFT", "RNDMWRDS") {
        console.log("This is my NFT");
    }

    function mint() public {
        uint256 currID = _tokenIDs.current();
        _safeMint(msg.sender, currID);
        _setTokenURI(currID, "https://jsonkeeper.com/b/4ZVB");
        console.log("NFT number %s has been minted to %s", currID, msg.sender);
        _tokenIDs.increment();
    }
}