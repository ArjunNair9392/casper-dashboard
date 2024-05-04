import Link from 'next/link';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { stateAbbreviations } from '../../helpers/constants';

const CompanyDetails = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('CompanyDetails'));
    });
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
    });
    const [zipError, setZipError] = useState('');
    const [cityError, setCityError] = useState('');

    const breadcrumbTrails = [
        { name: 'Home', link: '/' },
        { name: 'Company Registration', link: '/company-registration' }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'zip') {
            if (/[^0-9]/.test(value)) {
                setZipError('Zip code should only contain numbers.');
            } else {
                setZipError('');
            }
        }
        if (name === 'city') {
            if (!/^[a-zA-Z\s]*$/.test(value)) {
                setCityError('City should only contain alphabetic characters.');
            } else {
                setCityError('');
            }
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('your_registration_service_endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            // Handle successful registration
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div>
            <Breadcrumb trails={breadcrumbTrails} />
            <div className="mb-5">
                <p className="text-xl mb-8">Register your company</p>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="gridEmail">Email</label>
                            <input id="gridEmail" type="email" placeholder="Enter Email" className="form-input" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="gridPassword">Password</label>
                            <input id="gridPassword" type="Password" placeholder="Enter Password" className="form-input" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="gridAddress1">Address</label>
                        <input id="gridAddress1" type="text" placeholder="Enter Address" className="form-input" name="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="gridAddress2">Address 2</label>
                        <input id="gridAddress2" type="text" placeholder="Apartment, studio, or floor" className="form-input" name="address2" value={formData.address2} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        <div className="md:col-span-2">
                            <label htmlFor="gridCity">City</label>
                            <input id="gridCity" type="text" placeholder="Enter City" className="form-input" name="city" value={formData.city} onChange={handleChange} />
                            {cityError && <p className="text-red-500 text-sm">{cityError}</p>}
                        </div>
                        <div>
                            <label htmlFor="gridState">State</label>
                            <select id="gridState" className="form-select text-white-dark" name="state" value={formData.state} onChange={handleChange}>
                                <option>Choose...</option>
                                {stateAbbreviations.map((stateAbbr) => (
                                    <option key={stateAbbr}>{stateAbbr}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gridZip">Zip</label>
                            <input id="gridZip" type="text" placeholder="Enter Zip" className="form-input" name="zip" value={formData.zip} onChange={handleChange} />
                            {zipError && <p className="text-red-500 text-sm">{zipError}</p>}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary !mt-6">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanyDetails;
