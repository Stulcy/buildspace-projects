import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.scss";
import Button from './components/Button/Button';
import RandomWords from "./utils/RandomWords.json";

const App = () => {
  const CONTRACT_ADDRESS_RINKEBY = "0x824D099e5cd97E7536cb2fa51B5Cdb1B8C200262";
  const [currAcc, setCurrAcc] = useState("");
  const [mintStatus, setMintStatus] = useState("");

  async function checkIfWalletIsConnected() {
    try {
      const { ethereum }: Window = window;

      if (!ethereum)
        return;

      const accounts = await ethereum.request({ method: "eth_accounts"});

      if (accounts.length !== 0)
        setCurrAcc(accounts[0]);

      ethereum.on('accountsChanged', () => setCurrAcc(""));
    } catch (error) {
      console.log(error);
    }
  }

  async function connectWallet() {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Install Metamask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts"});

      if (accounts.length !== 0)
        setCurrAcc(accounts[0]);

    } catch (error) {
      console.log(error);
    }
  }

  async function mint() {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Ethereum object not found!");
        return;
      }

      let chainID = await ethereum.request({ method: 'eth_chainId' });
      if (chainID !== "0x4") {
        alert("Conenct to Rinkeby first!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS_RINKEBY, RandomWords.abi, signer);

      connectedContract.on("NFTminted", (sender, tokenID) => {
        alert(`${sender} minted NFT #${tokenID}!`);
      });

      setMintStatus("Confirming transaction!");
      let txn = await connectedContract.mint();

      setMintStatus("Minting your new NFT");
      await txn.wait();

      setMintStatus("");

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  })

  return (
    <div className="main">
      <p>RandomNFT</p>
      {currAcc
      ?
      <>
        <h1>Connected: {currAcc.substring(0,5) + "..." + currAcc.substring(38, 42)}</h1>
        {mintStatus
        ?
        <h2>{mintStatus}</h2>
        :
        <Button onClick={mint} text="mint" />
        }
      </>
      :
      <Button onClick={connectWallet} text="Connect" />
      }
    </div>
  );
}

export default App;
