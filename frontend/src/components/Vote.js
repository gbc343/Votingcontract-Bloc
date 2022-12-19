import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request, sendAlert } from "../module/util";
import {ethers} from "ethers";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json";

const votingAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const Vote = () => {
  let navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);

  // Requests access to the user's Meta Mask Account
  // https://metamask.io/
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function vote(a) {
    if (!a) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
      const voting = await contract.vote(a, {
        gasLimit: 1 * 10 ** 6,
        nonce: undefined,
      });

      await voting.wait();
    }
  }

  const handleSubmit = (e) => {
    console.log(e.target.candidate.value);
    e.preventDefault();
    // let data = new FormData(e.target);
    // let num = parseInt(data);
    vote(1);
  };

  async function getCandidate() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(votingAddress, Voting.abi, provider);

      try {
        const result = await contract.getCandidate();
        setCandidates(result);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }
  useEffect(() => {
    console.log("cfvfdg");
    console.log(localStorage.getItem('startDate'));
    if (!localStorage.getItem("key")) {
      sendAlert("Please Signup voter", "error");
      return navigate("/voter");
    }
    getCandidate();
  }, []);
  return (
    <div className="card mt-5">
      <div className="card-header">
        <h2>Vote</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Candidate</label>
            <select name="candidate" id="" className="form-control" required>
              <option value="" disabled selected>
                Select Candidate ...
              </option>
              <option value="1">
                Ramzi Bolton - budget:25000 - (vote count:1)
              </option>{" "}
              {/* remove after set data */}
              {candidates.length
                ? candidates.map((item) => (
                    <option
                      value={item.id}
                    >{`${item.name} - budget: ${item.budget} - (vote count: ${item.voteCount})`}</option>
                  ))
                : null}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Vote;