
export const connectAccount = async () => {
    try {
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.warn("success")
        return accounts[0];
    } catch (err) {
        console.warn("error")
    }
}

export const convertToTimestamp = dateString => {
    const timestamp = Date.parse(dateString) / 1000;
    return timestamp; // outputs "1672531200000
} 
