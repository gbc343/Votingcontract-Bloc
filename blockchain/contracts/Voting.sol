
pragma solidity >=0.4.21 <0.9.0;


contract Voting{
    uint256 candidateCount;
    uint256 voterCount;

     // VARIABLES
    // struct Voter { address voterAddress; bool hasVoted; }
    struct Voter {
        address voterAddress;
        bool hasVoted;
    }

    // struct Candidate { uint256 candidateId; string name; uint256 voteCount; }
    struct Candidate {
        uint256 candidateId;
        string name;
        uint256 budget;
        uint256 voteCount;
        // bool isWinner; // winner = true; looser = false;
    }
    
    // enum State { Created, Voting, Ended }
    enum State { 
        Created,
        Voting,
        Ended
    }
    

    // mapping (uint256 => Candidate) candidateDetails;
    mapping (uint256 => Candidate)  public candidateDetails;
    mapping (address => uint256)    public candidate;
    mapping (address => bool)       public votetest;

    State public state;
    Candidate public winner;

    
    // candidateDetails mapping
    Candidate[] internal candidateList;
    Voter[] internal voterList;
    // constructor()
    constructor()
    
    {
        candidateCount = 0;
        voterCount = 0;
        //votetest[msg.sender] = false;

        state = State.Created;

        
        for(uint i = 1; i <=3 ;i++){
         candidateList.push(Candidate({
                candidateId: i, 
                name:"Test",
                budget: 20000,
                voteCount: 0 
            }));
        }
         
    }

   
    // mapping (address=>bool) hasVoted;
    /* mapping (address => bool) public hasVoted; */

    /* MODIFIERS */
    // modifier onlyCandidater()
    modifier onlyCandidater(){
        require(candidate[msg.sender] < 1);
        _;
    }
    modifier onlyMe(address _candidate){
        require(msg.sender == _candidate);
        _;
    }

    // modifier inState()
    modifier inState(State _state){
        require(state == _state);
        _;
    }

    // /* FUNCTIONS */
    // // addCandidate()
    function addCandidate(string memory _name, uint256 _budget) 
        public 
        onlyCandidater
        inState(State.Created)
    {
        require(candidateCount < 5);
        Candidate memory newCandidate =
            Candidate({
                candidateId: candidateCount,
                name: _name,
                budget:_budget,
                voteCount: 0
            });
        candidateDetails[candidateCount] = newCandidate;
        candidateList.push(newCandidate);
        candidateCount++;
        candidate[msg.sender]++;
        

        if(candidateCount >= 5){
            startVote();
        }
    }
 function addVoter(address  _voterAddress) 
        public
    {
        Voter memory newVoter =
            Voter({
                voterAddress: _voterAddress,
                hasVoted: false
            });
        voterList.push(newVoter);
     
    }
   function getCandidate() public view returns (Candidate [] memory){
        return candidateList;
   }
   
    function startVote()
        private
        inState(State.Created)
    {
        state = State.Voting;
    }

    // getCandidateNumber()
    function getCandidateNumber() public view returns (uint256) {
        return candidateCount;
    }


    // Vote()
    function vote(uint256 candidateId) 
        public 
        inState(State.Voting)
    {
        candidateDetails[candidateId].voteCount += 1;
    }


    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidateList.length; p++) {
            if (candidateList[p].voteCount > winningVoteCount) {
                winningVoteCount = candidateList[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function endVote(uint _winnerCandi)
        private
        inState(State.Voting)
        returns (Candidate memory _winner)
    {
        state = State.Ended;
        _winner = candidateDetails[_winnerCandi];
        return _winner;
    }
}