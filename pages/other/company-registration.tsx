import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle, toggleLocale, toggleRTL } from '../../store/themeConfigSlice';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { IRootState } from '@/store';
import IconUser from '@/components/Icon/IconUser';
import IconMail from '@/components/Icon/IconMail';
import IconPhoneCall from '@/components/Icon/IconPhoneCall';
import IconPencil from '@/components/Icon/IconPencil';
import { registerCompany } from '@/services/registrationService';
import { getSession, GetSessionParams } from 'next-auth/react';

const CompanyRegistration = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(setPageTitle('Company Registration'));
    }, [dispatch]);

    const [formData, setFormData] = useState({
        company: '',
        admin_email: '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        country: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await registerCompany(formData);
            if (response && response.status === 200) {
                router.push('/');
            } else {
                console.error('Registration failed', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };

    const [flag, setFlag] = useState('');
    useEffect(() => {
        setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
    }, [themeConfig.locale, dispatch]);

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="background" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="object1" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="object2" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="object3" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="polygon" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px]">
                        <div className="absolute end-6 top-6">
                        </div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Company Registration</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Looks like you haven't registered your company before. Register now to access the dashboard.</p>
                            </div>
                            <form className="space-y-5" onSubmit={submitForm}>
                                <div className="relative text-white-dark">
                                    <input id="company" type="text" placeholder="Company name" value={formData.company} onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconUser fill={true} />
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="admin_email" type="email" placeholder="Email" value={formData.admin_email} onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconMail fill={true} />
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="phone_number" type="text" placeholder="Phone" value={formData.phone_number} onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconPhoneCall fill={true} />
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconPencil fill={true} />
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconPencil fill={true} />
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="state" type="text" placeholder="State" value={formData.state} onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconPencil fill={true} />
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="country" type="text" placeholder="Country" value={formData.country} onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconPencil fill={true} />
                                    </span>
                                </div>
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async (context: GetSessionParams | undefined) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: { session },
    };
};

CompanyRegistration.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default CompanyRegistration;