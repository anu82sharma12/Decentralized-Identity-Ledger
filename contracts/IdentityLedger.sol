// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IdentityLedger {
    // ERC-725 inspired: General data key/value store for hashes
    mapping(bytes32 => uint256) public documentHashes; // hash => timestamp
    address public owner;

    event DocumentSubmitted(bytes32 indexed hash, uint256 timestamp, address indexed submitter);
    event DocumentVerified(bytes32 indexed hash, bool exists, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Submit document hash for timestamping
    function submitDocument(bytes32 docHash) external {
        require(documentHashes[docHash] == 0, "Hash already exists");
        documentHashes[docHash] = block.timestamp;
        emit DocumentSubmitted(docHash, block.timestamp, msg.sender);
    }

    // Verify integrity: Compute hash from data and check ledger
    function verifyDocument(string memory docData) external returns (bool valid, uint256 timestamp) {
        bytes32 computedHash = keccak256(abi.encodePacked(docData));
        timestamp = documentHashes[computedHash];
        valid = timestamp > 0;
        emit DocumentVerified(computedHash, valid, timestamp);
        return (valid, timestamp);
    }

    // Direct hash verification (for pre-computed)
    function verifyHash(bytes32 docHash) external returns (bool exists, uint256 timestamp) {
        timestamp = documentHashes[docHash];
        exists = timestamp > 0;
        emit DocumentVerified(docHash, exists, timestamp);
        return (exists, timestamp);
    }

    // Owner: Clear (for demo reset)
    function resetHash(bytes32 docHash) external onlyOwner {
        documentHashes[docHash] = 0;
    }
}
