# Decentralized Identity Ledger Demo

**Three-node blockchain for real-time document integrity validation and timestamping**  
A production-ready demo using **Solidity + Web3.js** with a **multi-node Ganache network** simulating decentralized consensus.

---

## Features
- **Immutable Timestamping**: Prove a document existed at a specific time using blockchain.
- **Integrity Verification**: SHA-256 + keccak256 hashing with on-chain validation.
- **Real-Time Events**: Web3.js event subscriptions across nodes.
- **Three-Node Decentralization**: Full transaction propagation and consensus simulation.
- **No Central Authority**: Anyone can verify using any node.

---

## Tech Stack
| Component       | Technology |
|----------------|------------|
| Blockchain     | Ethereum (Ganache CLI) |
| Smart Contract | Solidity `^0.8.19` |
| Client         | Web3.js `^4.0.3` |
| Hashing        | `crypto-js` (SHA-256), `keccak256` (on-chain) |
| Network        | 3-node PoA-like local network |

---

