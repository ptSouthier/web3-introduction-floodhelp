import Web3 from "web3";
import ABI from "./ABI.json";
import { HelpRequest } from "@/types";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

export async function doLogin() {
  if (!window.ethereum) throw new Error('MetaMask is not installed!');

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();

  if (!accounts || !accounts.length) throw new Error('Wallet not found!');

  localStorage.setItem('wallet', accounts[0].toLowerCase());
  return accounts[0];
};

export async function getOpenHelpRequests(lastId = 0): Promise<HelpRequest[]> {
  if (!window.ethereum) throw new Error('MetaMask is not installed!');

  const loggedWallet = localStorage.getItem('wallet') || undefined;
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: loggedWallet });
  const helpRequests: HelpRequest[] = await contract.methods.getOpenHelpRequests(lastId + 1).call();
  const validHelpRequests = helpRequests.filter((helpRequest) => helpRequest.title !== '');

  return validHelpRequests;
};
