import React, { useEffect, useState } from 'react'

const Campaign = ({ contract, web3 }) => {
    const [data, setData] = useState(0); // sample
    const [inp, setInp] = useState(''); // sample

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState(0);

    // example of reading data
    useEffect(() => {
        async function readData() {
            const data = await contract.methods.getter().call();
            setData(data);
        }
        contract && readData();
    })

    // example - write data into smart contract
    async function writeData() {
        if (inp !== "") {
            await contract.methods.setter(inp).send({ from: '0x322e9FAf87FC9eB9E19B7Fa8bfa240a0413c157D' });
            window.location.reload();
        }
    }

    // create a new campaign
    async function create() {
        if (title === "" || desc === "" || category === "" || deadline <= 0 || amount <= 0) return;

        try {
            await contract.methods.createCampaign(
                title,
                desc,
                category,
                deadline,
                amount
            ).send({ // send is used to write data on smart contracts
                from: '0xfdDD8c892Ce1ae0b36f76e8aB3Dd68FeA8E2340E', // from address is needed for writing data
                gas: '1000000' // max of gas
            })
            console.warn("success")
        } catch (e) {
            console.warn('error')
            console.warn(e)
        }
    }

    // get all campaigns from smart contract
    async function getCampaigns() {
        try {
            const allCampaigns = await contract.methods.getAllCampaigns().call(); // call is used to read data from smart contract
            console.warn(allCampaigns)
        } catch (err) {
            console.warn("error")
        }
    }

    return (
        <div>
            <div>
                <h1>Data : {data}</h1>
                Data<input type="text" value={inp} onChange={(e) => setInp(e.target.value)} /> <br />
                <br />
                <button type='button' onClick={writeData}>Submit</button>
            </div>

            <div style={{ marginTop: '3em', textAlign: 'center' }}>
                <h1>Create Campaign</h1>
                <br />
                Title :
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginTop: '1em' }}
                    type="text"
                />
                <br />

                Desc :
                <input
                    onChange={(e) => setDesc(e.target.value)}
                    style={{ marginTop: '1em' }}
                    type="text"
                />
                <br />

                Category :
                <input
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                    style={{ marginTop: '1em' }}
                />
                <br />

                Deadline :
                <input
                    onChange={(e) => setDeadline(e.target.value)}
                    style={{ marginTop: '1em' }}
                    type="number"
                />
                <br />

                Amount :
                <input
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ marginTop: '1em' }}
                    type="number"
                />
                <br />

                <button className='btn-nav' style={{ marginTop: '2em' }} onClick={create}>Create Campaign</button>
                <br />
                <button className='btn-nav' style={{ marginTop: '2em' }} onClick={getCampaigns}>Get All Campaigns</button>
            </div>
        </div>
    )
}

export default Campaign
