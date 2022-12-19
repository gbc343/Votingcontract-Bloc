import React, { useEffect, useState } from "react";
import { request, sendAlert } from "../module/util";
import {ethers} from "ethers";
//import Vote from "./Vote.js";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json";

const votingAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";


const Home = () => {
    const [data, setData] = useState({});


     async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

    async function winner() {
        if (typeof window.ethereum !== "undefined"){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
             votingAddress,
             Voting.abi,
             provider
            );

            try {
                const result = await contract.winningProposal();
                return Promise.resolve(result) ;
            } catch (error) {
                console.log("Error: ", error);
            }   
        }
    }
    
    useEffect(() => {
        console.log("start")
        setData(winner());
        
    }, [])
    return (
      <div className="card mt-5">
        <div className="card-header">
          <h2>The result of voting</h2>
        </div>
        <div className="card-body">
          {data ? (
            <div className="card">
              <div className="card-header">
                <h4>Winner</h4>
              </div>
              <div className="card-body">
                {`Name: ${data} - Vote count: (${data})`}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
};

export default Home;
