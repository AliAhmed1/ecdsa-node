import server from "./server";
import {secp256k1} from "ethereum-cryptography/secp256k1";

import {toHex} from "ethereum-cryptography/utils";


function Wallet({ address, setAddress, balance, setBalance , privateKey , setPrivatekey}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivatekey(privateKey);

    const address =  toHex(secp256k1.getPublicKey(privateKey));
    setAddress(address);
    
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input placeholder="Type an private key " value={privateKey} onChange={onChange}></input>
      </label>

      <div>Address: {address.slice(10)}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
