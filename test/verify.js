const Web3 = require('web3');

const web3 = new Web3('http://127.0.0.1:8545');
const ABI = [ /* ABI */ ];
const CONTRACT_ADDRESS = '0x...';

const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

async function test() {
  const docHash = '0x...'; // Pre-submitted hash
  const [exists, ts] = await contract.methods.verifyHash(docHash).call();
  console.log('Test Verify:', exists ? `Timestamped at ${ts}` : 'Not found');
}

test().catch(console.error);
