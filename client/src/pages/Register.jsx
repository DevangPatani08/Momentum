import { Activity, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import Text from "../components/Text.jsx";
import InputField from "../components/InputField.jsx";
import Buttons from "../components/Buttons";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Register = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        setFormData({ ...formData, [name]: val });

        if (errors[name]) return setErrors({ ...errors, [name]: '' });
    };

    const validPassStr = (password) => {
        const req = {
            minLen: password.length >= 8,
            hasUpper: /[A-Z]/.test(password),
            hasLower: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
        };

        return req;
    };

    const maxReq = 5;
    const passReq = formData.password ? validPassStr(formData.password) : null;
    const passStrength = passReq ? Object.values(passReq).filter(Boolean).length : 0;

    const getPassStrMsg = (req) => {
        const msg = [];
        if (!req.minLen) msg.push('at least 8 characters');
        if (!req.hasUpper) msg.push('one uppercase letter is required');
        if (!req.hasLower) msg.push('one lowercase letter is required');
        if (!req.hasNumber) msg.push('one numerical digit is required');
        if (!req.hasSpChar) msg.push('one special character is required');

        return msg.length > 0 ? `Password must contain ${msg.join(', ')}.` : "Password is strong.";
    };

    const formValidation = () => {
        const err = {};

        if (!formData.firstName) {
            err.firstName = 'First name is a required field!...';
        } else if (formData.firstName.length < 3) {
            err.firstName = 'First name must at least 3 characters!...';
        } else if (!formData.lastName) {
            err.lastName = 'Last name is a required field!...';
        } else if (formData.lastName.length < 1) {
            err.lastName = 'Last name must at least 1 characters!...';
        }

        if (!formData.email) {
            err.email = 'Email is a required field!...';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            err.email = 'Please enter a valid email!...';
        }

        if (!formData.password) {
            err.password = 'Password is a required field!...';
        } else {
            const passReq = validPassStr(formData.password);
            const isStrong = Object.values(passReq).every(req => req);

            if (!isStrong) err.password = getPassStrMsg(passReq);
        }

        if (!formData.confirmPassword) {
            err.confirmPassword = 'Comfirming your password is mandatory!...';
        } else if (formData.confirmPassword !== formData.password) {
            err.confirmPassword = 'Both passwords enteries must match!...';
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formValidation()) return;

        setLoading(true);
        setErrors({});

        try {
            await register({ firstName: formData.firstName, lastName: formData.lastName, email: formData.email, password: formData.password, confirmPassword: formData.confirmPassword });
            navigate('/tasks');
            window.scrollTo({ top: 0, behavior: 'instant' });
        } catch (error) {
            setErrors({ submit: error.response?.data?.message || error.message || 'Registeration failed. Please try again later!...' });
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="w-full flex-1 bg-custom section">
            <div className="wrapper flex-1 flex items-center justify-center">
                <div className="w-full flex flex-col items-center justify-start max-w-xl gap-6 p-6 backdrop-blur-lg rounded-md shadow-lg">
                    <Text variant='h2' weight='bold' className="w-full text-center text-indigo-500">Register</Text>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-center gap-4.5">
                        <div className="w-full flex items-start justify-center gap-4.5">
                            <InputField type='text' icon='User' name='firstName' id='firstName' value={formData.firstName} onChange={handleChange} placeholder='First Name (Jhon)' errMsg={errors.firstName} required />
                            
                            <InputField type='text' icon='User' name='lastName' id='lastName' value={formData.lastName} onChange={handleChange} placeholder='Last Name (Doe)' errMsg={errors.lastName} required />
                        </div>

                        <InputField type='email' icon='Mail' name='email' id='email' value={formData.email} onChange={handleChange} placeholder='Enter email (jhon.doe@gmail.com)' errMsg={errors.email} required />
                        
                        <div className="w-full flex flex-col items-start justify-start">
                            <InputField variant='P' icon='Lock' name='password' id='password' value={formData.password} onChange={handleChange} placeholder='Enter password' errMsg={errors.password} showPass={showPass} setShowPass={setShowPass} required />
                            {formData.password && (
                                <div className="w-full mt-2">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>Password Strength:</span>
                                        <span>{passStrength}/{maxReq}</span>
                                    </div>
                                    <div className="w-full h-2.5 rounded-full overflow-hidden bg-slate-200 my-1">
                                        <div className={`h-2.5 rounded-full ${passStrength <= 2 ? 'bg-red-500' : passStrength <= 3 ? 'bg-yellow-500' : passStrength <= 4 ? 'bg-blue-500' : 'bg-green-500'}`} style={{width: `${(passStrength/maxReq) * 100}%`}} />
                                    </div>
                                    <div className="text-xs text-slate-600 mt-1">{formData.password && getPassStrMsg(passReq)}</div>
                                </div>
                            )}
                        </div>
                        
                        <InputField variant='P' icon='Lock' name='confirmPassword' id='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm password' errMsg={errors.confirmPassword} showPass={showConfirmPass} setShowPass={setShowConfirmPass} required />

                        <Buttons type='submit' variant="primaryFW" disabled={loading}>
                            {loading ? (
                                <span className="w-full h-auto flex items-center justify-center gap-2">
                                    <Oval width={20} height={20} color="#FFFFFF" />
                                    <span>Processing</span>
                                </span>
                            ): (
                                <span>Register Now</span>
                            )}
                        </Buttons>
                        
                        <Text className="w-full h-max text-center py-4">Already have an account? <Link to='/login' className="text-indigo-500 font-semibold underline">LogIn Now!</Link></Text>
                        
                        <Activity mode={errors.submit ? 'visible' : 'hidden'}>
                            <span className="mt-1 w-full h-fit rounded-md bg-red-50 p-4 border border-red-500 flex items-center justify-center text-red-700 text-sm font-semibold">{errors.submit}</span>
                        </Activity>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
