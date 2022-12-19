Studens:
Gordon Wells 100708985
Fatemeh Alipour Soweizi 101445536
Yoodam Choi 101445002

# Project voting system using Blockchain
Blockchain is one of the distributed ledger technologies, in which several nodes participate, and the consensus algorithm between these nodes
It prevents forgery and falsification of data and has the advantage of a structure in which already recorded data cannot be changed. Because of these characteristics, blockchain is widely applied to platforms where reliability is important, and it is recognized as an important technology for electronic voting among many platforms. Electronic voting is a system that provides convenience to both the person who manages the election and the voters by electricizing the entire election process. It does not guarantee the technical security or stability of the system, so it is difficult to trust voters. In order to solve these problem, this system proposes an electronic voting system that prevents tampering of votes by applying blockchain and provides voters' trust and system stability. By applying this electronic voting system to crowding funding where projects can be submitted and multiple parties can vote on the single project, we can set up a fair vote. 
## Requirements
Looking at the electronic voting process, it can be divided into the voter registration step of creating a list of voters, the step of checking the candidate's agenda, the step of voting, and the counting step. A system is built using blockchain technology so that a series of processes are safely and fairly voted. The built system must meet the requirements. The requirements related to the safety of electronic voting are as follows.
> 1. Integrity : 
> Voting is completely conducted from start to finish. It must be accurate and accurately counted.
> 2. Personalization : 
> Confidentiality must be maintained so that no one can know who the voter is and what he or she voted for. 
> 3. Impossibility of double voting : 
> A voter must be able to vote only once. 
> 4. Right to vote : 
> Only voters who are eligible to vote cannot vote, and must be able to certify their identity. Only one person, one vote is allowed, and no double vote is allowed.
> 5. Fairness : 
> By making it possible to know the count of votes during the process, It should not have any influence on the vote cast.
> 6. Verifiability : 
> Voters can check their votes and know if their votes were correctly counted. Anyone can check the vote count, so no one can tamper with the voting results. 

### Problem Statement
An alliance of small organizations need to create an efficient and fair system that will allow all organizations to come to an agreement on which proposed projects that they will collectively fund. The organizations are independent with no one organization having control over another, thusly no one organization can have control over the consensus system, it must be impartial  so no organization has undue advantage over the system and it must be transparent and free of internal tampering.  

### Goals
Provide open, fair voting mechanism for group consensus: This will be accomplished if the system is easily accessible and visible to all voting organizations, and the voting process only allows restricted votes for the selected projects and no organization will have undue voting privileges or unfair say in the voting process.  

### Stakeholders
1. Election manager/administrator : Register candidates, period, voters, and participants. The election begins. Manage voting while elections are in progress. When the period expires, the election ends. • Count the votes. 
2. Voters : authenticate themselves and vote. Voters register their personal information and key. The election management side stores the data of eligible voters and pays them the gas necessary for voting. 

### Restrictions / Rules
- The only authorized organization	can add or use the voting system.
- Each organization can vote just once .
- After voting, they couldn’t change their vote.
- Only stakeholders can see the result.
- They must vote within the deadline.
- If the organization decide to vote, they have to apply and after they get accepted they get the token to vote.  

### Exceptions
In exceptional cases, the vote may be tied. For example, there are 12 small organization and 3 proposed choices. However, we thought about what to do if all proposals received 4 votes each. This use case is designed to be cost-effective. Therefore, in this case, the project with the lowest budget will be selected.  

### User / Technical Stories
|Story|Context|
|---|---|
|The organization has to apply(register) for voter.|Only authorized organization could allowed to use this system.|
|Once the organization is accepted as an authorized organization, they have access to all functionality to UI interface.|They can propose the project or vote to these proposes.|
|The organization can propose the project.|Proposing project is not essential but if they want to propose their project they can propose one. Proposing is optional. And also there will be deadline for proposing the project.|
|The organization will vote after the deadline of the propose. They can vote until deadline that is set by admin.|Voters select the target to vote for and cast their vote using their wallet. Voting was conducted only when the conditions were met, whether the voter met the deadline, whether the voter was registered, and whether the vote had already been cast. When voting is executed, the corresponding vote, the voter's state, and the voting result are saved. |
|After the organization finished voting(after the deadline), the token is going to be burned.|They cannot cancel or edit their choice. Once they clicked one choice and confirm they cannot go to previous page.|
|Once the voting deadline is over, the voting result will be showed up to voters.|The ones who can see the result is limited to the voters(organization) who did the vote.|

## Architecture
The electronic voting system was implemented as a smart contract and provided services through a P2P network. The client used the web API provided by the contract. 
+ Network : All voters must be able to participate by applying a public blockchain to the actual system. We used a private blockchain, and to make up for its shortcomings, we formed a network by participating in boot nodes. In addition, if public blockchain is applied, gas, which has an exchange value, must be paid to voters, so it is not suitable for the purpose of the study. The system can easily transition to a public blockchain without major modifications 
+ Client and server : In P2P network, there is no distinction between client and server. The existing server role is replaced by a contract. The necessary functions for querying voting and ballot counting results, including candidate, deadline, and voter registration, were implemented as a contract, and the necessary client screen was implemented as a web. 
+ Upon voting, the transaction was signed with the private key using the voter's wallet through MetaMask and sent.  

### Project Description
To meet the needs of the organizational group a decentralized voting system that will operate over a private blockchain network and be fully autonomous of any one of the respective organizations will be used to replace the current peer-to-peer consensus system. The network will be designed to be more efficient and faster than traditional peer-to-peer networks and not require as much oversight to ensure fairness. The system will operate autonomously and provide user-friendly web-based interfaces for ease of voting and tallying. The systems structural design, what technological requirements and inputs will be required will be devised prior to deployment and the outlay of both the system design and development tasks, and separation of labor will be mapped out prior to beginning main system development. Our main concern is ensuring that the system will be transparent and not be vulnerable to outside malicious actions. In this regard we must also ensure the system is not overtly costly in either time or resources to maintain.  

### Data
<img width="773" alt="스크린샷 2022-12-18 오후 2 43 01" src="https://user-images.githubusercontent.com/114115158/208316152-cbc86e39-90e0-4495-8266-f7e33eb9613a.png">  

### Functions
+ Project submission
  + Authorized organizations may submit project proposals through the system. If they meet requirements it is added to the list of projects that can be voted in the next voting cycle. Will accept a string parameter that will represent the submitted project proposal and save it to an array of proposals. Included modifier will stop any further submissions once max submissions have occurred. In addition a further modifier will be check if submission is from an authorized address.
+ Apply
  + Authorized organizations that wish to vote must apply to the vote tally to signal that they wish to partake in the voting process. If they are authorized through the user’s private key through their MetaMask wallet than they will receive a single voting token. Will take the address of the applicant and match against a list of accepted addresses. Will return true if authorized and call the token creation function.
+ Token creation
  + Authorized organizations that wish to vote must apply to the vote tally to signal that they wish to partake in the voting process. If they are authorized through the user’s private key through their MetaMask wallet than they will receive a single voting token. Will take the address of the applicant and match against a list of accepted addresses. Will return true if authorized and call the token creation function.
+ Authorized
  + A function that will be used as a modifier to determine that an account applying is one of the authorized account holders.
+ Vote
  + Will take the vote passed as an integer value. Will include modifier that will determine that the voter has a valid token, if so the function will increment the vote tally for a listing of project objects that represent the different voting selections. The function will than burn the addresses token and close out.  

### Diagrams
<img width="599" alt="스크린샷 2022-12-18 오후 2 50 53" src="https://user-images.githubusercontent.com/114115158/208316438-eac8dab1-03a8-42e2-baf9-f85d3cf0ac59.png">  

Procedures Election officials and voters are essential for voting. Blockchain electronic voting requires participants to authenticate transactions. This diagram shows the voting process with these stakeholders and the system.  
> 1. Election manager : Register candidates, period, voters, and participants. The election begins. When the period expires, the election ends. Count the votes. Manage voting while elections are in progress.  
> 2. Voters authenticate themselves and vote. Voters register their personal information and key. The election management side stores the data of eligible voters and pays them the gas necessary for voting.  
> 3. Participants connect to the P2P network and record votes, that is, mine them. A boot node must be registered in the network to participate.  

### Technology Stack
The system will make use of several different technological stacks, utilizing both traditional web 2.0 and more recent web3.0 technologies.
+ Programming languages  
  + The deployed blockchain contracts will utilized the Solidity programming language however the overall system will make extensive use other languages for its of chain functionality. Specifically, the systems main web interface will utilize JavaScript, HTML and CSS in its creation.    
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css&logoColor=white">
+ Frameworks and Libraries  
  + The front-end web interface will utilize the React library for development and framework. In addition, the system will utilize Node.js for its server environment. To connect to the Ethereum private Blockchain web3.js will be utilized in the front-end system. The blockchain contracts will serve as the systems back-end system.  
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/solidity-363636?style=for-the-badge&logo=solidity&logoColor=white">
+ Integrated development environment  
  + Remix. Ethereum will be utilized for both testing and debugging of the system smart contracts. Visual Studio Code will be used in the development of the UI interface.  
  <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
  Remix IDE
+ Network  
  + The system will make use of the Ethereum network for its deployment, specially the system will be a private network on the chain to ensure greater privacy and oversight of the system itself.  
  <img src="https://img.shields.io/badge/ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white">   
+ Test networks  
  + To test the system before deployment to the Ethereum chain, Hardhat will be utilized for the purposes of testing and debugging the system. It will connect through Remix.  

### Security
The Solidity contract will make appropriate use of both custom modifiers and requires parameters to safeguard against unauthorized use. In addition, precautions will be taken in regards to any malicious actions to try to drain the contracts gas supply. 


## Project Plan
<img width="1038" alt="스크린샷 2022-12-18 오후 3 54 51" src="https://user-images.githubusercontent.com/114115158/208318913-63418515-51c2-4043-8335-259409892a45.png">  


## Screen Shots  
![Screenshot 2022-12-18 135607](https://user-images.githubusercontent.com/114115158/208320997-dd85af21-70e1-4f76-a7cf-5198a13dbe51.png)  
This screenshot shows that it's deployed it to blockchain and ready to start the system.
### Voter  
![voter](https://user-images.githubusercontent.com/114115158/208320564-4e8ea38a-e45f-4fa8-85ff-daecca471d37.png)  
Small organizations that want to vote or propose the project and login with their address.
### Candidate
![set up candidate](https://user-images.githubusercontent.com/114115158/208320688-27bc3b92-3fbf-42a4-9f12-81d3980c7bd8.png)  
They can propose their project including budget of the project. 
![connect to smartcontract](https://user-images.githubusercontent.com/114115158/208320950-d30f73b5-41e1-4e62-8967-88600a7deabe.png)  
This screenshot shows it's connected to smart contract.
### Vote
![vote 1](https://user-images.githubusercontent.com/114115158/208320719-e450dc2c-e6a7-4034-9f1a-adac47584f81.png)  
![vote 2](https://user-images.githubusercontent.com/114115158/208320724-05f6225b-e6d5-488c-a915-e4d9b3883b56.png)  
They can check the deadline of this vote. And can vote of the project they like or want to work on. This screenshot shows the address is connected to Metamask and as they can connected they can vote.
![function was called](https://user-images.githubusercontent.com/114115158/208320962-055c08a6-948b-496d-a0b4-7b5b9a57d1f5.png)  
This screenshot shows the function was called.
### Home
![winner](https://user-images.githubusercontent.com/114115158/208320751-7b43784b-9aad-45a2-8fbc-6559d66bd3ef.png)  
After the deadline is over, every stakeholders (developer and organization) can check the result of the vote.
### Admin
![admin](https://user-images.githubusercontent.com/114115158/208320806-368ae40d-eca0-4dad-97ac-bd1299f3ec7a.png)  
This is admin login page.
![set up deadline](https://user-images.githubusercontent.com/114115158/208320823-1ec0d569-2ab6-436d-aa7b-49bb72e1e02d.png)  
As you login with admin, you can set up the deadline. 
#### Error
------
![set up deadline_error1](https://user-images.githubusercontent.com/114115158/208320835-9ea21e6b-493c-4f74-891b-f3c9a5deb05e.png)  
If you set up the start date more earlier than today's date, the error occurs and shows up "Start date is not validate.".  
![set up deadline_error2](https://user-images.githubusercontent.com/114115158/208320838-21e5e226-006e-429a-bb93-10ad609e46d6.png)  
If you set up the end date more earlier than start date, the error occurs and shows up "End date is not validate.".  

## Installation Instructions
Open up 2 terminal for front-end and blockchain.
### Front-end 
1. ```npm install```
2. ```npm start```
### Blockchain
1. ```npm install```
2. ```npx hardhat node```
3. ```npx hardhat run scripts/deploy.js --network localhost```

