const Web3 = require('web3');
const CryptoJS = require('crypto-js');

const web3 = new Web3('http://127.0.0.1:8545'); // Node 1
const ABI = [ /* Paste full ABI here */ ];
const CONTRACT_ADDRESS = '0x...'; // From deploy.js or manual

const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

async function main() {
  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];

  // Sample document data
  const docData = 'This is a sample legal document for timestamping on 2025-11-03.';
  const docHash = Web3.utils.keccak256(docData); // On-chain hash match
  const offChainHash = CryptoJS.SHA256(docData).toString(); // For demo comparison

  console.log('Document:', docData);
  console.log('On-chain Hash (keccak256):', docHash);
  console.log('Off-chain Hash (SHA256):', offChainHash);

  // Submit for timestamping
  console.log('\nSubmitting document...');
  const submitTx = await contract.methods.submitDocument(docHash).send({ from, gas: 200000 });
  console.log('Submitted at block:', submitTx.blockNumber);

  // Verify integrity
  console.log('\nVerifying...');
  const [valid, timestamp] = await contract.methods.verifyDocument(docData).call();
  console.log('Valid:', valid);
  console.log('Timestamp:', new Date(Number(timestamp) * 1000).toISOString());

  // Listen for real-time events (across nodes)
  contract.events.DocumentSubmitted({ fromBlock: 'latest' })
    .on('data', event => {
      console.log('Real-time Event:', event.returnValues);
    });

  // Simulate verification on another node (manual query to Node 2)
  const web3Node2 = new Web3('http://127.0.0.1:8546');
  const contractNode2 = new web3Node2.eth.Contract(ABI, CONTRACT_ADDRESS);
  const [validNode2] = await contractNode2.methods.verifyHash(docHash).call();
  console.log('Validated on Node 2:', validNode2); // Should be true (propagation)
}

main().catch(console.error);
