const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

//public Key
const balances = {                                                                // privateKey
  "038e820619c07a9fe01905811564a1ad63cacdb12258437c9bb37b824ada1b79a6": 100, // 98b59c23a860401336d4a8897f0fbbb8951b25548ef4362ee66fe6319c7bbb86
  "0303f92ce9fc6bf7f859e1bc6b5d4a7473cfdfd41222e23c404031efab6a57e07e": 50,  // fce3ecdf5a40be5b089543929b0f70813d794a82728a872eaf1cb75130909908
  "02bfb94db238a98581de3d963bab8afcc6b80a6745bd33c6ddfc2e8cde15af52a5": 75,  // ba0bb7ca51181cd566e65800d08e03f6494096f7158bfbd66a39cc5f4357a690
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //get signature from client side
  //recover public key from signature


  const { signature ,sender, recipient, amount } = req.body;

  console.log(req.body);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
