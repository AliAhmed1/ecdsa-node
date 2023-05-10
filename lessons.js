const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    
    const bytes = utf8ToBytes(message);
    // hash the message using keccak256
    const hash = keccak256(bytes);

    return (hash);
}

module.exports = hashMessage;



const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require('./hashMessage');

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

async function signMessage(msg) {

    let hashMsg = hashMessage(msg)

    return secp.sign(hashMsg, PRIVATE_KEY, {
        recovered : true
    });
}

module.exports = signMessage;


const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
// keys, messages & other inputs can be Uint8Arrays or hex strings
  // Uint8Array.from([0xde, 0xad, 0xbe, 0xef]) === 'deadbeef'
  const hashMsg = hashMessage(message);
 
  return secp.recoverPublicKey(hashMsg, signature, recoveryBit)
 
}

module.exports = recoverKey;



const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {

    let firstByte = publicKey.slice(1)

    const hash = keccak256(firstByte);

    console.log(hash);

    return hash.slice(-20);    
}

module.exports = getAddress;