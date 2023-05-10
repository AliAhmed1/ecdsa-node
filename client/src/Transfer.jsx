import { useState } from "react";
import server from "./server";
import crypto from "./crypto";


function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  // const [hashMessage, setHashMessage] = useState("a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28");


  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const hashMessage = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28"

    const signature = crypto.signMessage(hashMessage)
    console.log(signature)
   
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        signature,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
