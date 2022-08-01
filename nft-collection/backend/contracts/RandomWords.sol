// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import { Base64 } from "./libraries/Base64.sol";

import "hardhat/console.sol";

contract RandomWords is ERC721URIStorage{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;
    string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='green' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";
    string[] words = ["Banana", "Apple", "Motorbike", "Dog", "Minecraft", "Ethereum", "Solana", "Lizard", "Green", "Tree", "Peach", "Beach", "Palm", "Ship", "Pirate", "University", "Hotel"];
    event NFTminted(address sender, uint256 tokenID);

    constructor() ERC721 ("RandomWordsNFT", "RNDMWRDS") {}

    function pickRandomWord(uint256 tokenId) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("WORD", Strings.toString(tokenId))));
        rand = rand % words.length;
        return words[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function mint() public {
        uint256 currID = _tokenIDs.current();

        string memory word = pickRandomWord(currID);
        string memory finalSVG = string(abi.encodePacked(baseSvg, word, "</text></svg>"));

        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "', word, '", "description": "Noice", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(finalSVG)), '"}'
        ))));

        string memory finalTokenURI = string(abi.encodePacked("data:application/json;base64,", json));

        _safeMint(msg.sender, currID);
        _setTokenURI(currID, finalTokenURI);
        emit NFTminted(msg.sender, currID);
        _tokenIDs.increment();
    }
}