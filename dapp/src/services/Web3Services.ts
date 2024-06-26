import Web3 from "web3";
import ABI from "./ABI.json";
import { HelpRequest, PartialHelpRequest } from "@/types";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

function initializeWeb3() {
  if (!window.ethereum) throw new Error('MetaMask is not installed!');

  return new Web3(window.ethereum);
};

function getContract() {
  const web3 = initializeWeb3();

  const loggedWallet = localStorage.getItem('wallet') || undefined;

  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: loggedWallet });
};

export async function doLogin() {
  const web3 = initializeWeb3();
  const accounts = await web3.eth.requestAccounts();

  if (!accounts || !accounts.length) throw new Error('Wallet not found!');

  localStorage.setItem('wallet', accounts[0].toLowerCase());
  return accounts[0];
};

export async function getOpenHelpRequests(lastId = 0): Promise<HelpRequest[]> {
  const contract = getContract();
  const helpRequests: HelpRequest[] = await contract.methods.getOpenHelpRequests(lastId + 1).call();
  const validHelpRequests = helpRequests.filter((helpRequest) => helpRequest.title !== '');

  return validHelpRequests;
};

export async function openHelpRequest({ title, description, contact, goal }: PartialHelpRequest) {
  const contract = getContract();
  return contract.methods.openHelpRequest(title, description, contact, Web3.utils.toWei(goal, "ether")).send();
};

export async function closeHelpRequest(id: number) {
  const contract = getContract();
  return contract.methods.closeHelpRequest(id).send();
};

export async function donate(id: number, donationInBnb: number) {
  const contract = getContract();

  return contract.methods.donate(id).send({
    value: Web3.utils.toWei(donationInBnb, "ether")
  });
};
