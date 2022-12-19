import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ethers} from "ethers";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json";
const votingAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const Voter = () => {
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);

        addVoter(data.voterAddress);


        localStorage.setItem('key', 'asdkjadad877ya78sdhajkshd87a7ysdfasfas897fy9as')
        return navigate("/vote");
    }
    
    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      }
    async function addVoter(voterAddress) {
        if (!voterAddress) return;
        if (typeof window.ethereum !== "undefined") {
          await requestAccount();
    
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
    
          const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
          const add = await contract.addVoter(voterAddress, {
            gasLimit: 10000
          });
    
          await add.wait();
          console.log(add);
        }
      }
    return (
        <div className="card mt-5">
            <div className="card-header">
                <h2>Signup/Login voter</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Voter address</label>
                        <input type="text" name="voterAddress" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    );
};

export default Voter;
