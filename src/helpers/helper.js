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
    dateString = '01-Apr-2023';
    const dateParts = dateString.split('-');

    // Convert month abbreviation to number (0-based)
    const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthNumber = monthAbbreviations.indexOf(dateParts[1]);

    // Create a new Date object with the parsed date parts
    const dateObject = new Date(dateParts[2], monthNumber, dateParts[0]);

    // Get the Unix timestamp (in milliseconds)
    const timestamp = dateObject.getTime();

    console.warn(timestamp); // Output: 1672454400000

} 
