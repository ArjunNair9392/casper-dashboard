import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { stateAbbreviations } from '../../helpers/constants';
import { registerCompany } from '@/services/registrationService';

const CompanyDetails = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Company Details'));
    });
    const [formData, setFormData] = useState({
        company: '',
        address: '',
        city: '',
        state: '',
        phone_number: '',
        admin_email: ''
    });
    const [phoneError, setPhoneError] = useState('');
    const [cityError, setCityError] = useState('');

    const breadcrumbTrails = [
        { name: 'Home', link: '/' },
        { name: 'Company Registration', link: '/company-registration' }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'phone_number') {
            if (/[^0-9]/.test(value)) {
                setPhoneError('Zip code should only contain numbers.');
            } else {
                setPhoneError('');
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
            await registerCompany(formData);
            router.push('/usable/folder_path');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Breadcrumb trails={breadcrumbTrails} />
            <div className="mb-5">
                <p className="text-xl mb-8">Register your company</p>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="gridCompany">Company Name</label>
                        <input id="gridCompany" type="text" placeholder="Enter company name" className="form-input" name="company" value={formData.company} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="gridAddress2">Address</label>
                        <input id="gridAddress2" type="text" placeholder="Enter company address" className="form-input" name="address" value={formData.address} onChange={handleChange} />
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
                            <label htmlFor="gridPhoneNumber">Phone Number</label>
                            <input id="gridPhoneNumber" type="text" placeholder="Enter Phone Number" className="form-input" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
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
