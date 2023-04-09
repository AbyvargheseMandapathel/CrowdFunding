
export const connectAccount = async () => {
    if(!window.ethereum) {
        alert("Install Metamask Extension")
        return null;
    }
    
    try {
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    } catch (err) {
        console.warn("error")
    }
}

export const convertToTimestamp = dateString => {
    const timestamp = Date.parse(dateString) / 1000;
    return timestamp; // outputs "1672531200000
} 

export const weiToEther = (web3, wei) => {
    return web3.utils.fromWei(wei, 'ether')
}