import InputField from "../components/InputField.jsx";
import Text from "../components/Text.jsx";
import Buttons from "../components/Buttons.jsx";
import { Activity, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { Oval } from "react-loader-spinner";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const name = e.target.name;
        const val = e.target.value;

        setFormData({ ...formData, [name]: val });

        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const formvalidation = () => {
        const err = {};

        if (!formData.email) err.email = 'Email is a required field!...';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = 'Enter a valid email!...';

        if (!formData.password) err.password = 'Password is a required field!...';

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formvalidation) return;

        setLoading(true);
        setErrors({});

        try {
            await login({ email: formData.email, password: formData.password });
            navigate('/tasks');
            window.scrollTo({ top: 0, behavior: 'instant' });
        } catch (error) {
            setErrors({ submit: error.response?.data?.message || error.message || 'Lofin failed. Please try again later!...' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex-1 bg-custom section">
            <div className="wrapper flex-1 flex items-center justify-center">
                <div className="w-full flex flex-col items-center justify-start max-w-xl gap-6 p-6 backdrop-blur-lg rounded-md shadow-lg">
                    <Text variant='h2' weight='bold' className="w-full text-center text-indigo-500">Login</Text>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-center gap-4.5">
                        <InputField type='email' icon='Mail' name='email' id='email' value={formData.email} onChange={handleChange} placeholder='Enter email (jhon.doe@gmail.com)' errMsg={errors.email} required />
                        
                        <InputField variant='P' icon='Lock' name='password' id='password' value={formData.password} onChange={handleChange} placeholder='Enter password' errMsg={errors.password} showPass={showPass} setShowPass={setShowPass} required />

                        <Buttons type='submit' variant="primaryFW" disabled={loading}>
                            {loading ? (
                                <span className="w-full h-auto flex items-center justify-center gap-0">
                                    <Oval width={20} height={20} color="#FFFFFF" />
                                    <span>Processing</span>
                                </span>
                            ): (
                                <span>Register Now</span>
                            )}
                        </Buttons>
                        
                        <Text className="w-full h-max text-center py-4">Don't have an account? <Link to='/register' className="text-indigo-500 font-semibold underline">Create Now!</Link></Text>
                        
                        <Activity mode={errors.submit ? 'visible' : 'hidden'}>
                            <span className="mt-1 w-full h-fit rounded-md bg-red-50 p-4 border border-red-500 flex items-center justify-center text-red-700 text-sm font-semibold">{errors.submit}</span>
                        </Activity>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
