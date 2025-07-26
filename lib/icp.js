import { Actor, HttpAgent } from "@dfinity/agent";

// Cambia este ID por el real con: dfx canister id kiipay_backend
const canisterId =
  process.env.NEXT_PUBLIC_CANISTER_ID_KIIPAY_BACKEND || "bd3sg-teaaa-aaaaa-qaaba-cai";

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });

// En desarrollo local hay que permitir el certificado
if (process.env.NODE_ENV !== "production") {
  agent.fetchRootKey();
}

// Declaramos el IDL manualmente
const idlFactory = ({ IDL }) =>
  IDL.Service({
    greet: IDL.Func([IDL.Text], [IDL.Text], ["query"]),
    setGreeting: IDL.Func([IDL.Text], [], []),
    saveTransaction: IDL.Func([IDL.Text, IDL.Nat], [IDL.Text], []),
    getVersion: IDL.Func([], [IDL.Text], ["query"]),
  });

export const kiipayActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

export async function greetUser(name) {
  return await kiipayActor.greet(name);
}

export async function saveTransaction(user, amount) {
  return await kiipayActor.saveTransaction(user, amount);
}

export async function getVersion() {
  return await kiipayActor.getVersion();
}
