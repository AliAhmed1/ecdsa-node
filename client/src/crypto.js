import * as secp from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";

const PRIVATE_KEY = "ba0bb7ca51181cd566e65800d08e03f6494096f7158bfbd66a39cc5f4357a690"


async function signMessage(hashMessage) {


    const [signature, recoveryBit] = await secp.sign(hashMessage, PRIVATE_KEY, {
        recovered: true,
      });
      const fullSignature = new Uint8Array([recoveryBit, ...signature]);
      return toHex(fullSignature);
}


export default {
    signMessage
}