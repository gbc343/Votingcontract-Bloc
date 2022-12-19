import React, { useState, useEffect } from "react";
import { request, sendAlert } from "../module/util";
import {ethers} from "ethers";
//import Vote from "./Vote.js";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json";
const votingAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";


const Candidate = () => {
    const [candidates, setCandidates] = useState([]);


    useEffect(() => {
        getCandidate();
    }, [])
    const handleSubmit = (e) => {
      e.preventDefault();
      let data = new FormData(e.target);
      addCandidate(data.name,data.budget);
    }

        async function requestAccount() {
          await window.ethereum.request({ method: "eth_requestAccounts" });
        }

      async function getCandidate() {
        if (typeof window.ethereum !== "undefined"){
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
             votingAddress,
             Voting.abi,
             provider
            );

            try {
                const result = await contract.getCandidate();
                setCandidates(result);
            } catch (error) {
                console.log("Error: ", error);
            }   
        }
       
    }
    async function addCandidate(name,budget) {
        if (!name) return;
        if (typeof window.ethereum !== "undefined") {
          await requestAccount();
    
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
    
          const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
          const add = await contract.addCandidate(name,budget, {
            gasLimit: 10000
          });
    
          await add.wait();
          console.log(add);
        }
      }
       

    return (
        <div className="card mt-5">
            <div className="card-header">
                <h2>Signup Candidate</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name="name" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Budget</label>
                        <input type="text" name="budget" className="form-control" required />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Candidate</label>
                        <select name="candidate" id="" className="form-control" required>
                            <option value="" disabled selected>Select Candidate ...</option>
                            {
                                (candidates.length ? candidates.map(item => (
                                    <option value={item.id}>{`${item.name} - budget: ${item.budget} - (vote count: ${item.voteCount})`}</option>
                                )) : null)
                            }
                        </select>
                    </div>
            </div>
            </div>

        </div>
    );
};

export default Candidate;
