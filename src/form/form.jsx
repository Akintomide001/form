import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/form.css'
import SuccessAlert from '../alert/SuccessAlert';
import ErrorAlert from '../alert/ErrorAlert';


export default function Form() {
    const initialFormData = {
        firstName: '',
        lastName: '',
        isParent: '',
        numberOfChildren: '',
        country: '',
        phoneNumber: '',
        email: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);  // Success modal control
    const [isError, setIsError] = useState(false);  // Error modal control
    const [errorMessage, setErrorMessage] = useState('');  // Error message text
    const [dropdownOpen, setDropdownOpen] = useState(false);  // Dropdown control


    useEffect(() => {
        // Fetch countries data from API and sort alphabetically
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                const countryData = response.data.map(country => ({
                    name: country.name.common,
                    flag: country.flags.svg,
                    areaCode: country.idd?.root + (country.idd?.suffixes ? country.idd.suffixes[0] : ''),
                }));

                const sortedCountries = countryData.sort((a, b) => a.name.localeCompare(b.name));
                setCountries(sortedCountries);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'country') {
            const country = countries.find(c => c.name === value);
            setSelectedCountry(country);
        }
    };

    const validatePhoneNumber = (phoneNumber) => {
        // Exclude the area code from the phone number validation
        const numberWithoutAreaCode = phoneNumber.replace(selectedCountry?.areaCode, '');
        return numberWithoutAreaCode.length === 10;
    };

    const validateEmail = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Initialize an array for errors
        const validationErrors = [];

        // Check if required fields are empty or invalid
        if (!formData.firstName.trim() ||
            !formData.lastName.trim() ||
            !formData.country ||
            !validatePhoneNumber(formData.phoneNumber) ||
            !validateEmail(formData.email)) {
            setIsError(true);  // Show error modal with general message
        } else {
            // If no errors, clear the form and show success modal
            const fullPhoneNumber = selectedCountry?.areaCode + formData.phoneNumber;  // Full phone number with area code

            console.log('Form Data Submitted:', {
                ...formData,
                phoneNumber: fullPhoneNumber,
            });

            // console.log('Form Data Submitted:', formDataWithPhoneNumber);

            // Simulate successful form submission
            setIsSubmitted(true);  // Trigger success modal
            setFormData(initialFormData);  // Clear the form data
            setSelectedCountry(null);  // Reset country selection
        }
    };

    const handleCloseSuccessModal = () => {
        setIsSubmitted(false);  // Close success modal
    };

    const handleCloseErrorModal = () => {
        setIsError(false);  // Close error modal
        setErrorMessage('');
    };

    // 
    const handleCountrySelect = (country) => {
        setSelectedCountry(country); // Correctly set the selected country here
        setFormData({
            ...formData,
            country: country.name,
            phoneNumber: '',  // Clear phone number field to allow user to enter digits after area code
        });
        setDropdownOpen(false);  // Close the dropdown after selection
    };

    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;
        const areaCodeLength = selectedCountry?.areaCode?.length || 0;
        if (e.target.selectionStart < areaCodeLength) {
            e.preventDefault();  // Prevent cursor from entering the area code
            return;
        }
        const phoneNumber = input.slice(areaCodeLength);  // Extract only the phone number part
        setFormData({
            ...formData,
            phoneNumber: phoneNumber,  // Store only the phone number entered by the user (without area code)
        });
    };





    return (
        <>
            <div className='formMain'>
                    <form onSubmit={handleSubmit} className='theform' >
                        <div className='formName'>
                            <div className='formName1'>
                                <label htmlFor="firstName">First Name:</label>
                                <input
                                    className='form1Input'
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}

                                />
                            </div>

                            <div className='formName1'>
                                <label htmlFor="lastName">Last Name:</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}

                                />
                            </div>
                        </div>
                        {/*  */}

                        <div className='formName2'>
                            <label htmlFor="email">Gmail:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"

                            />
                        </div>

                        <div className='FormParent'>
                            <div>Are you a parent?</div>
                            <div className='LabelRadio'>
                                <label className='Radio'>
                                    <input
                                        type="radio"
                                        name="isParent"
                                        value="yes"
                                        checked={formData.isParent === 'yes'}
                                        onChange={handleChange}
                                    />
                                    <p>Yes</p>
                                </label>

                                <label className='Radio2'>
                                    <input
                                        type="radio"
                                        name="isParent"
                                        value="no"
                                        checked={formData.isParent === 'no'}
                                        onChange={handleChange}
                                    />
                                    <p>No</p>

                                </label>
                            </div>
                        </div>

                        {formData.isParent === 'yes' && (
                            <div className='formName3'>
                                <label htmlFor="numberOfChildren">How many participants:</label>
                                <input
                                    type="number"
                                    id="numberOfChildren"
                                    name="numberOfChildren"
                                    value={formData.numberOfChildren}
                                    onChange={handleChange}
                                    min="1"

                                />
                            </div>
                        )}

                        {/*  */}
                        <div className='formCountry'>
                            <label className='country' htmlFor="country">Country:</label>
                            <div className="custom-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                {selectedCountry ? (
                                    <div className="selected-country">
                                        <img src={selectedCountry.flag} alt="flag" style={{ width: '20px', marginRight: '5px' }} />
                                        {selectedCountry.name} ({selectedCountry.areaCode})
                                    </div>
                                ) : (
                                    <div className="placeholder">--Select a country--</div>
                                )}
                            </div>
                            {dropdownOpen && (
                                <ul className="dropdown-menu">
                                    {countries.map((country, index) => (
                                        <li key={index} onClick={() => handleCountrySelect(country)}>
                                            <img src={country.flag} alt="flag" style={{ width: '20px', marginRight: '1px' }} />
                                            {country.name} ({country.areaCode})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        


                        {/* Updated: Phone Number Field now includes Area Code */}
                        <div className='formNumber'>
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={selectedCountry?.areaCode ? selectedCountry.areaCode + formData.phoneNumber : formData.phoneNumber}
                                onChange={handlePhoneNumberChange}
                                placeholder="Enter phone number"
                                maxLength={selectedCountry?.areaCode?.length + 10} // Set max length to area code length + 10 digits
                                onClick={(e) => {
                                    // Prevent cursor from moving before area code
                                    const areaCodeLength = selectedCountry?.areaCode?.length || 0;
                                    if (e.target.selectionStart < areaCodeLength) {
                                        e.target.setSelectionRange(areaCodeLength, areaCodeLength);
                                    }
                                }}
                                onKeyUp={(e) => {
                                    // Prevent backspace from deleting area code
                                    const areaCodeLength = selectedCountry?.areaCode?.length || 0;
                                    if (e.target.selectionStart < areaCodeLength) {
                                        e.target.setSelectionRange(areaCodeLength, areaCodeLength);
                                    }
                                }}
                            />
                        </div>

                        <div className='buttonR'>
                            <button className='TheButton' type="submit">Submit</button>

                        </div>
                    </form>
                <SuccessAlert isOpen={isSubmitted} onClose={handleCloseSuccessModal} />
                {
                    isError && (
                        <ErrorAlert
                            isOpen={isError}
                            onClose={handleCloseErrorModal}

                        />
                    )
                }
            </div >
        </>
    )
}
