import { Activity } from 'react';
import logo from '../../assets/Logo Light.svg';
import { useAuth } from '../../hooks/useAuth.js';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Text from '../Text.jsx';

const Footer = () => {
    const { user } = useAuth();
    const currYear = new Date().getFullYear();
    return (
        <footer className="w-full h-fit px-6 py-10 md:px-16 md:pt-20 md:pb-10 bg-indigo-100">
            <div className="w-full container mx-auto space-y-12">
                <div className="flex items-center justify-between">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Company Logo</span>
                        <img src={logo} alt="MOMENTUM" className='w-auto h-8 object-cover' />
                    </a>

                    <div className="flex items-center justify-center gap-6 xl:gap-12">
                        <Activity mode={user ? 'visible' : 'hidden'}><a href="/tasks" className='w-max capitalize font-medium text-slate-600 hover:text-indigo-500 transition-all duration-200 ease-in-out'>My Tasks</a></Activity>
                        <a href="/#why-us" className='w-max capitalize font-medium text-slate-600 hover:text-indigo-500 transition-all duration-200 ease-in-out'>Why Us</a>
                        <a href="/#about" className='w-max capitalize font-medium text-slate-600 hover:text-indigo-500 transition-all duration-200 ease-in-out'>About Us</a>
                        <a href="/#faqs" className='w-max capitalize font-medium text-slate-600 hover:text-indigo-500 transition-all duration-200 ease-in-out'>FAQs</a>
                        <a href="/contact" className='w-max capitalize font-medium text-slate-600 hover:text-indigo-500 transition-all duration-200 ease-in-out'>Get in touch</a>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <Link to='/' className='p-2 rounded-full hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out'><Facebook className='w-5.5 h-5.5 stroke-[1.25px]' /></Link>
                        <Link to='/' className='p-2 rounded-full hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out'><Linkedin className='w-5.5 h-5.5 stroke-[1.25px]' /></Link>
                        <Link to='/' className='p-2 rounded-full hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out'><Instagram className='w-5.5 h-5.5 stroke-[1.25px]' /></Link>
                        <Link to='/' className='p-2 rounded-full hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out'><Twitter className='w-5.5 h-5.5 stroke-[1.25px]' /></Link>
                    </div>
                </div>
                <div className="w-full pt-8 flex flex-col md:flex-row items-center justify-center gap-2.5 border-t border-slate-300">
                    <Text className='w-full text-center text-slate-800'>&copy; Momentum {currYear} by Devang Mrugesh Patani. All rights reserved.</Text>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
