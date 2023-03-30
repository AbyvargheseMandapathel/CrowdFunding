import React, { useState } from 'react'
import './CampaignForm.css'
import Select from 'react-select'

// icons
import { AiOutlineClose } from 'react-icons/ai'

const categoryOptions = [
    { value: 'Education', label: 'Education' },
    { value: 'Hospital', label: 'Hospital' },
    { value: 'Business', label: 'Business' }
]

const CampaignForm = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [errors, setErrors] = useState([])

    // form data
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amountRequired, setAmountRequired] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = validateInputs();

        if (error) return

        /*
            save image on ipfs and set 'image' as url
            change deadline to timestamp
            convert amount required from ether to wei
        */

        let desc = description.replaceAll('\n', ' ')

        const params = {
            title,
            desc,
            category,
            image,
            deadline,
            amountRequired
        }

        console.warn(params)
    }

    const validateInputs = () => {
        let error
        if (title === "" || category === "" || amountRequired === "" ||
            description === "" || deadline === "" || image === "") {
            setErrors([...errors, 'Please fill all fields'])
            error = true
        }

        if (amountRequired < 0.5) {
            setErrors((prevErr) => [...prevErr, "Minimum contribution is 0.5 ether"])
            error = true
        }

        // limit array size
        if (errors.length > 3) {
            const newArray = errors.slice(0, 2); // create a new array with only the first three elements
            setErrors(newArray); // update the state with the new array
        }
        return error
    }

    const closeError = (index) => {
        const newErrors = [...errors];
        newErrors.splice(index, 1); // Remove 1 element at index 2
        setErrors(newErrors);
    }

    const customeTheme = (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            text: "#fff",
            primary: '#EAB643',
            primary25: '#eab54347',
            primary50: 'none'
        },
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelected ? "#212529" : "#fff",
            backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
        })
    })

    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: '#EAB643',
            marginTop: '5px',
            backgroundColor: 'transparent',
            "&:hover": {
                borderColor: '#EAB643'
            }
        }),
        menuList: base => ({
            ...base,
            backgroundColor: '#ECCA80',
            borderRadius: '5px'
        })
    }

    return (
        <>
            <div className='form-errors'>
                {
                    errors.map((err, index) => {
                        return (
                            <div className='errors' id={index} key={index}>
                                <p className='error-msg text-overflow-hide'>
                                    {err}
                                </p>
                                <span className='close-errors' onClick={() => closeError(index)}>
                                    <AiOutlineClose />
                                </span>
                            </div>
                        )
                    })

                }
            </div>
            <form className='create-campaign-form'>
                <h1>Create A New Campaign</h1>
                <div className='form-page-1' style={currentPage === 1 ? { display: 'none' } : { display: 'block' }}>
                    <div className="input-section">
                        <label>Title</label>
                        <input
                            className='inputs'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="input-section">
                        <label>Category</label>
                        <Select
                            options={categoryOptions}
                            onChange={(opt) => setCategory(opt.value)}
                            theme={customeTheme}
                            styles={customStyles}
                        />
                    </div>

                    <div className="input-section">
                        <label>Amount Required (ETH)</label>
                        <input
                            className='inputs'
                            type="number"
                            value={amountRequired}
                            onChange={(e) => setAmountRequired(e.target.value)}
                        />
                    </div>

                    <div className="input-section">
                        <label>Description</label>
                        <textarea
                            className='inputs'
                            cols="30"
                            rows="10"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        >
                        </textarea>
                    </div>
                </div>

                <div className='form-page-2' style={currentPage === 0 ? { display: 'none' } : { display: 'block' }}>
                    <div className="input-section">
                        <label>Deadline</label>
                        <input
                            className='inputs calendar'
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>

                    <div className="input-section">
                        <label>Image</label>
                        <input
                            className='inputs'
                            type="file"
                            accept='".jpg, .JPG, .jpeg, .JPEG, .png, .PNG'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>

                    <div className="submit-button-container">
                        <button
                            className='submit-btn'
                            onClick={handleSubmit}
                        >
                            Create Campaign
                        </button>
                    </div>
                </div>

                <div className='form-pagination'>
                    <button
                        className='pagination-btn'
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(0)}
                    >
                        &lt; Prev
                    </button>
                    <button
                        className='pagination-btn'
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                    >
                        Next &gt;
                    </button>
                </div>
            </form>
        </>
    )
}

export default CampaignForm
