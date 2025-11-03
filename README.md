# Decentralized-Identity-Ledger

Key Features:

Document Submission: Hash documents off-chain; store on-chain with timestamp.
Integrity Validation: Re-hash documents and compare to ledger.
Real-Time Timestamping: Events emit timestamps; query blocks for verification.
Three-Node Network: Local PoA (Proof-of-Authority) chain for demo; nodes validate transactions.

Tech Stack:

# Solidity 0.8.19: IdentityLedger contract.
# Web3.js 4.x: Interact via Node.js script.
# Ganache CLI: Three-node local chain (ports 8545, 8546, 8547).
# Dependencies: web3, crypto-js (for hashing).

Goals:

# Demonstrate immutability: Once timestamped, hashes can't be altered.
# Decentralization: Transactions propagate across nodes.
# Scalability: Events for efficient querying.

Core Components
Smart Contract: IdentityLedger.sol
An ERC-725-inspired contract for storing document hashes with timestamps. Emits events for real-time notifications.

Key Functions:

submitDocument(bytes32 hash): Stores hash with block timestamp.
getDocument(string docData): Computes hash and checks existence.
verifyDocument(bytes32 hash): Confirms if hash exists and returns timestamp.

Node Setup
Three Ganache instances as a mini-network:

Node 1: Bootnode (port 8545).
Node 2/3: Connect to Node 1 (ports 8546/8547).
Static accounts for PoA; transactions require validation across nodes.

Web3.js Interaction
A Node.js script to deploy, submit, and verify documents, connecting to the multi-node RPC.
Implementation Guidelines

Setup Environment:

Install: npm init -y && npm i web3 crypto-js.
Compile: Use Remix or solc (not included; copy ABI to script).


Run Three-Node Chain:

# Terminal 1: ganache-cli -p 8545 -a 10 -e 1000 --networkId 12345 --allowUnlimitedContractSize.
# Terminal 2: ganache-cli -p 8546 -a 10 -e 1000 --networkId 12345 --allowUnlimitedContractSize --rpc http://127.0.0.1:8545.
# Terminal 3: Same as Terminal 2 but port 8547.


Deploy & Interact: Run node demo.js (connects to Node 1; txs propagate).
Verification: Query any node; consensus ensures integrity.
Real-Time: Use Web3 subscriptions for event logs.

Challenges & Mitigations:

Consensus Delay: Local nodes sync instantly; for prod, use real PoA (Clique).
Gas Costs: Optimized for demo; batch submissions via Merkle trees.
Off-Chain Hashing: Prevents large data on-chain; use IPFS for full docs.

Metrics:

Timestamp Accuracy: Block time ~1s (Ganache).
Validation Time: <100ms query.
