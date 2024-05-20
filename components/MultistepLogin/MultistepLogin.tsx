import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { stateAbbreviations } from '../../helpers/constants';
import styles from './MultistepLogin.module.scss';
import { useRouter } from 'next/router';

interface StepProps {
    currentStep: number;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    values: { [key: string]: string };
    errors: { [key: string]: string | undefined };
    touched: { [key: string]: boolean | undefined };
}

const Step1: React.FC<StepProps> = ({ currentStep, handleChange, values, errors, touched }) => {
    if (currentStep !== 1) return null;
    return (
        <div className={styles.stepWrapper}>
            <h2>Step 1: Create your account</h2>
            <input
                className={styles.input}
                type="text"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
            />
            {touched.username && errors.username ? <div className={styles.error}>{errors.username}</div> : null}
            <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
            />
            {touched.email && errors.email ? <div className={styles.error}>{errors.email}</div> : null}
            <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
            />
            {touched.password && errors.password ? <div className={styles.error}>{errors.password}</div> : null}
        </div>
    );
};

const Step2: React.FC<StepProps> = ({ currentStep, handleChange, values, errors, touched }) => {
    if (currentStep !== 2) return null;
    return (
        <div className={styles.stepWrapper}>
            <h2>Step 2: Personal Information</h2>
            <input
                className={styles.input}
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={values.companyName}
                onChange={handleChange}
            />
            {touched.companyName && errors.companyName ? <div className={styles.error}>{errors.companyName}</div> : null}
            <input
                className={styles.input}
                type="text"
                name="address"
                placeholder="Address"
                value={values.address}
                onChange={handleChange}
            />
            {touched.address && errors.address ? <div className={styles.error}>{errors.address}</div> : null}
            <input
                className={styles.input}
                type="text"
                name="city"
                placeholder="City"
                value={values.city}
                onChange={handleChange}
            />
            {touched.city && errors.city ? <div className={styles.error}>{errors.city}</div> : null}
            <select
                className={styles.select}
                name="state"
                value={values.state}
                onChange={handleChange}
            >
                <option value="" label="Select state" />
                {stateAbbreviations.map(state => (
                    <option key={state} value={state} label={state} />
                ))}
            </select>
            {touched.state && errors.state ? <div className={styles.error}>{errors.state}</div> : null}
            <input
                className={styles.input}
                type="text"
                name="phone"
                placeholder="Phone"
                value={values.phone}
                onChange={handleChange}
            />
            {touched.phone && errors.phone ? <div className={styles.error}>{errors.phone}</div> : null}
        </div>
    );
};

const Step3: React.FC<StepProps> = ({ currentStep, handleChange, values, errors, touched }) => {
    if (currentStep !== 3) return null;
    return (
        <div className={styles.stepWrapper}>
            <h2>Step 3: Payment Details</h2>
            <input
                className={styles.input}
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={values.cardNumber}
                onChange={handleChange}
            />
            {touched.cardNumber && errors.cardNumber ? <div className={styles.error}>{errors.cardNumber}</div> : null}
            <input
                className={styles.input}
                type="text"
                name="expiryDate"
                placeholder="Expiry Date"
                value={values.expiryDate}
                onChange={handleChange}
            />
            {touched.expiryDate && errors.expiryDate ? <div className={styles.error}>{errors.expiryDate}</div> : null}
            <input
                className={styles.input}
                type="text"
                name="cvv"
                placeholder="CVV"
                value={values.cvv}
                onChange={handleChange}
            />
            {touched.cvv && errors.cvv ? <div className={styles.error}>{errors.cvv}</div> : null}
        </div>
    );
};

const MultistepLogin: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();

    const validationSchema = [
        Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        Yup.object({
            companyName: Yup.string().required('Company Name is required'),
            address: Yup.string().required('Address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            phone: Yup.string().required('Phone is required'),
        }),
        Yup.object({
            cardNumber: Yup.string().required('Card Number is required'),
            expiryDate: Yup.string().required('Expiry Date is required'),
            cvv: Yup.string().required('CVV is required'),
        }),
    ];

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            companyName: '',
            address: '',
            city: '',
            state: '',
            phone: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        },
        validationSchema: validationSchema[currentStep - 1],
        onSubmit: values => {
            if (currentStep < 3) {
                setCurrentStep(prev => prev + 1);
            } else {
                router.push('/usable/folders');
                console.log('Form submitted:', values);
            }
        },
    });

    const next = () => {
        formik.validateForm().then(errors => {
            if (Object.keys(errors).length === 0) {
                setCurrentStep(prev => prev + 1);
            } else {
                formik.setTouched({
                    username: true,
                    email: true,
                    password: true,
                    firstName: true,
                    lastName: true,
                    companyName: true,
                    address: true,
                    city: true,
                    state: true,
                    phone: true,
                    cardNumber: true,
                    expiryDate: true,
                    cvv: true,
                });
            }
        });
    };

    const prev = () => setCurrentStep(prev => prev - 1);

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}></div>
            <div className={styles.formWrapper}>
                <div className={styles.slantedBorder}></div> {/* Slanted border */}
                <h1 className={styles.title}>Casper AI</h1>
                <h3 className={styles.subTitle}>Registration Form</h3>
                <div className={styles.progressBarWrapper}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${(currentStep / 3) * 100}%` }}
                    ></div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <Step1
                        currentStep={currentStep}
                        handleChange={formik.handleChange}
                        values={formik.values}
                        errors={formik.errors}
                        touched={formik.touched}
                    />
                    <Step2
                        currentStep={currentStep}
                        handleChange={formik.handleChange}
                        values={formik.values}
                        errors={formik.errors}
                        touched={formik.touched}
                    />
                    <Step3
                        currentStep={currentStep}
                        handleChange={formik.handleChange}
                        values={formik.values}
                        errors={formik.errors}
                        touched={formik.touched}
                    />

                    {currentStep < 3 && (
                        <button className={styles.button} type="button" onClick={next}>
                            Next
                        </button>
                    )}

                    {currentStep > 1 && (
                        <button className={styles.button} type="button" onClick={prev}>
                            Previous
                        </button>
                    )}

                    {currentStep === 3 && (
                        <button className={styles.button} type="submit">
                            Submit
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default MultistepLogin;