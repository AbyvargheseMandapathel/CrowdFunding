import Web3 from "web3";

export const connectAccount = async () => {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts()  
    return accounts[0];
}