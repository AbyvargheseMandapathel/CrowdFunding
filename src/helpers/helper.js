export const connectAccount = async () => {
    try {
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.warn("success")
        return accounts[0];
    } catch (err) {
        console.warn("error")
    }
}
