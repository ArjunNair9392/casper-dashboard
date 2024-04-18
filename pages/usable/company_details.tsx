import Link from 'next/link';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '@/components/Icon/IconCode';

const Layouts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Layouts'));
    });
    const [codeArr, setCodeArr] = useState<string[]>(['code1,code2,code3,code4,code5,code6,code7,code8']);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    return (
        <div>
            <div className="mb-5">
                        <form className="space-y-5">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="gridEmail">Email</label>
                                    <input id="gridEmail" type="email" placeholder="Enter Email" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="gridPassword">Password</label>
                                    <input id="gridPassword" type="Password" placeholder="Enter Password" className="form-input" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="gridAddress1">Address</label>
                                <input id="gridAddress1" type="text" placeholder="Enter Address" defaultValue="1234 Main St" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="gridAddress2">Address2</label>
                                <input id="gridAddress2" type="text" placeholder="Enter Address2" defaultValue="Apartment, studio, or floor" className="form-input" />
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                <div className="md:col-span-2">
                                    <label htmlFor="gridCity">City</label>
                                    <input id="gridCity" type="text" placeholder="Enter City" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="gridState">State</label>
                                    <select id="gridState" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="gridZip">Zip</label>
                                    <input id="gridZip" type="text" placeholder="Enter Zip" className="form-input" />
                                </div>
                            </div>
                            <div>
                                <label className="mt-1 flex cursor-pointer items-center">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-white-dark">Check me out</span>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary !mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
        </div>
    );
};

export default Layouts;
