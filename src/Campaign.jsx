import React, { useEffect, useState, useContext } from 'react'
import { AccountContext } from './context/AccountContext';
import { ContractWeb3Context } from './context/ContractWeb3Context';


// components
import CampaignCard from './components/CampaignCard/CampaignCard';

const Campaign = () => {
    const [data, setData] = useState(0); // sample
    const [inp, setInp] = useState(''); // sample

    const { account } = useContext(AccountContext);
    const { contract, web3 } = useContext(ContractWeb3Context);
    
    const [contractBalance, setContractBalance] = useState(0);
    const [contribution, setContribution] = useState(0);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState(0);

    useEffect(() => {
        async function getContractBalance() {
            const balanceInWei = await contract.methods.contractBalance().call();
            let balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
            setContractBalance(balanceInEther)
        }
        contract && getContractBalance();
    }, [])

    
    // example of reading data
    useEffect(() => {
        async function readData() {
            const data = await contract.methods.getter().call();
            setData(data);
        }
        contract && readData();
    }, [])

    // example - write data into smart contract
    async function writeData() {
        if (inp !== "") {
            await contract.methods.setter(inp).send({ from: account });
            setData(inp);
        }
    }

    // create a new campaign
    async function createCampaign() {

        if (title === "" || desc === "" || category === "" || deadline <= 0 || amount <= 0) return;

        try {
            await contract.methods.createCampaign(
                title,
                desc,
                category,
                deadline,
                amount
            ).send({ // send is used to write data on smart contracts
                from: account, // from address is needed for writing data
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

    async function contributeEther(campaignId) {
        try { 
            const amountContributed = contribution
            const value = web3.utils.toWei(amountContributed, 'ether')
            await contract.methods.contribute(campaignId)
                    .send({
                        from: account,
                        value: value
                    })
        } catch (e) { 
            console.warn('error')
            console.warn(e)
        }
    }

    return (
        <>
        <div className="campaign-card-section">
            <CampaignCard/>
        </div>
        
        <div>
            <p style={{ margin: '2em 0 2em 5em' }}>account : {account}</p>
            <div>
                <h5>Data : {data}</h5>
                <h5>Contract Balance : {contractBalance}</h5>
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

                <button className='btn-nav' style={{ marginTop: '2em' }} onClick={createCampaign}>Create Campaign</button>
                <br />
                <button className='btn-nav' style={{ marginTop: '2em' }} onClick={getCampaigns}>Get All Campaigns</button>
            </div>

            <div style={{ marginTop: '1em', textAlign: 'center' }}>
                Amount : <input type="text" onChange={(e) => setContribution(e.target.value)} />
                <button onClick={() => contributeEther(0)} className="btn-nav">Contribute</button>
            </div>
        </div>
        </>
    )
}

export default Campaign
