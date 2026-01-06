import { useEffect, useState } from 'react';
import logo from '../../assets/Logo Light.svg';
import { useAuth } from '../../hooks/useAuth.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Buttons from '../Buttons.jsx';
import { ArrowRight, LogOut, Menu, X } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const [activeLink, setActiveLink] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const sectionIds = ['home', 'how-it-works', 'why-us', 'about', 'faqs', 'contact', 'tasks'];
        
        const fakeLoad = () => {
            if (location.pathname === '/') {
                const options = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 };
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) setActiveLink(entry.target.id);
                    });
                }, options);
                
                sectionIds.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) observer.observe(element); 
                });
                
                return () => observer.disconnet();
            } else {
                const currPage = location.pathname.replace('/', '');
                setActiveLink(currPage);
            }
        };

        fakeLoad();
    }, [location.pathname]);

    const sectionClick = (e, sectionId) => {
        e.preventDefault();

        const id = sectionId.replace('#', '');
        setActiveLink(id);
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({ top: (element.offsetTop - document.getElementById('header').style.height), behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) window.scrollTo({ top: (element.offsetTop - document.getElementById('header').style.height), behavior: 'smooth' });
            }, 100);
        };
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (linkId) => {
        return activeLink === linkId.replace('#', '');
    };

    const pageChange = (path) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveLink(path.replace('/', ''));
        navigate(path);
    };

    return (
        <header id='header' className='w-full fixed top-0 left-0 z-50 bg-white shadow-md py-4 px-6 md:px-16'>
            <nav aria-label='Global' className='flex items-center justify-between container mx-auto'>
                <div className="flex md:flex-1">
                    <Link to='/' className='-m-1.5 p-1.5' onClick={() => setActiveLink('#home')}>
                        <span className='sr-only'>Company Logo</span>
                        <img src={logo} alt="MOMENTUM" className='w-auto h-8 object-cover' />
                    </Link>
                </div>
                <div className="hidden xl:flex xl:gap-12">
                    <HashLink to='/' onClick={() => { pageChange('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`transition-all duration-200 ease-in-out ${isActive('#home') ? 'text-indigo-500 font-semibold' : 'text-slate-600 hover:text-indigo-500'}`}>Home</HashLink>
                    <HashLink to='/#how-it-works' onClick={(e) => sectionClick(e, 'about')} className={`capitalize transition-all duration-200 ease-in-out ${isActive('#about') ? 'text-indigo-500 font-semibold' : 'text-slate-600 hover:text-indigo-500'}`}>about us</HashLink>
                    <HashLink to='/#how-it-works' onClick={(e) => sectionClick(e, 'why-us')} className={`capitalize transition-all duration-200 ease-in-out ${isActive('#why-us') ? 'text-indigo-500 font-semibold' : 'text-slate-600 hover:text-indigo-500'}`}>why us</HashLink>
                    <HashLink to='/#how-it-works' onClick={(e) => sectionClick(e, 'how-it-works')} className={`capitalize transition-all duration-200 ease-in-out ${isActive('#how-it-works') ? 'text-indigo-500 font-semibold' : 'text-slate-600 hover:text-indigo-500'}`}>Process</HashLink>
                    <HashLink to='/#how-it-works' onClick={(e) => sectionClick(e, 'faqs')} className={`capitalize transition-all duration-200 ease-in-out ${isActive('#faqs') ? 'text-indigo-500 font-semibold' : 'text-slate-600 hover:text-indigo-500'}`}>FAQs</HashLink>
                    <HashLink to='/contact' onClick={() => { pageChange('/contact'); window.scrollTo({ top: 0, behavior: 'instant' }); }} className={`transition-all duration-200 ease-in-out ${isActive('contact') ? 'text-indigo-500 font-semibold' : 'text-slate-600 hover:text-indigo-500'}`}>Get in touch</HashLink>
                </div>

                <div className="hidden xl:flex xl:flex-1 justify-end items-center">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Buttons type='button' variant='primary' handleClick={() => navigate('/tasks')}>My Tasks</Buttons>
                            <Buttons type='button' variant='secondary' handleClick={handleLogout}>
                                <span>Logout</span>
                                <LogOut className='w-5 h-5' />
                            </Buttons>
                        </div>
                    ): (
                        <Buttons type='button' variant='primary' handleClick={() => navigate('/login')}>
                            <span>Get Started</span>
                            <ArrowRight className='w-5 h-5' />
                        </Buttons>
                    )}
                </div>

                <div className="flex xl:hidden">
                    <Buttons type='button' variant='iconOnlySq' command='show-modal' commandfor='mobile-menu'>
                        <span className='sr-only'>Open mobile menu</span>
                        <Menu className='w-5 h-5' />
                    </Buttons>
                </div>
            </nav>
            <el-dialog>
                <dialog id='mobile-menu' className='backdrop:bg-transparent xl:hidden'>
                    <div tabIndex='0' className='fixed inset-0 focus:outline-none'>
                        <el-dialog-panel className='fixed inset-y-0 right-0 z-50 bg-white p-6 w-full overflow-y-auto sm:max-w-sm sm:ring-1 sm:rimg-slate-900/10'>
                            <div className="flex items-center justify-between">
                                <a href="/" className='-m-1.5 p-1.5 cursor-pointer'>
                                    <span className='sr-only'>Company Logo</span>
                                    <img src={logo} alt="MOMENTUM" className='w-auto h-8 object-cover' />
                                </a>

                                <Buttons type='button' variant='iconOnlySqNoBr' command='close' commandfor='mobile-menu'>
                                    <span className='sr-only'>Close mobile menu</span>
                                    <X className='w-8 h-8' />
                                </Buttons>
                            </div>

                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-slate-300">
                                    <div className="space-y-2 py-6">
                                        <a href="/" className={`-mx-3 capitalize block rounded-md px-3 py-2 text-base font-semibold transition-all duration-200 ease-in-out ${isActive('#home') ? 'text-white bg-indigo-500 hover:bg-indigo-700' : 'text-slate-600 hover:text-indigo-800 hover:bg-indigo-50'}`}>Home</a>
                                        {user && <a href="/tasks" className={`-mx-3 capitalize block rounded-md px-3 py-2 text-base font-semibold transition-all duration-200 ease-in-out ${isActive('tasks') ? 'text-white bg-indigo-500 hover:bg-indigo-700' : 'text-slate-600 hover:text-indigo-800 hover:bg-indigo-50'}`}>My Tasks</a>}
                                        <a href="/#how-it-works" className={`-mx-3 capitalize block rounded-md px-3 py-2 text-base font-semibold transition-all duration-200 ease-in-out ${isActive('#how-it-works') ? 'text-white bg-indigo-500 hover:bg-indigo-700' : 'text-slate-600 hover:text-indigo-800 hover:bg-indigo-50'}`}>Process</a>
                                        <a href="/#why-us" className={`-mx-3 capitalize block rounded-md px-3 py-2 text-base font-semibold transition-all duration-200 ease-in-out ${isActive('#why-us') ? 'text-white bg-indigo-500 hover:bg-indigo-700' : 'text-slate-600 hover:text-indigo-800 hover:bg-indigo-50'}`}>Why us</a>
                                        <a href="/#about" className={`-mx-3 capitalize block rounded-md px-3 py-2 text-base font-semibold transition-all duration-200 ease-in-out ${isActive('#about') ? 'text-white bg-indigo-500 hover:bg-indigo-700' : 'text-slate-600 hover:text-indigo-800 hover:bg-indigo-50'}`}>about us</a>
                                        <a href="/#faqs" className={`-mx-3 capitalize block rounded-md px-3 py-2 text-base font-semibold transition-all duration-200 ease-in-out ${isActive('#faqs') ? 'text-white bg-indigo-500 hover:bg-indigo-700' : 'text-slate-600 hover:text-indigo-800 hover:bg-indigo-50'}`}>FAQs</a>
                                        <a href="/contact" className={`-mx-3 capitalize block rounded-md px-3 py-2 text-base font-semibold transition-all duration-200 ease-in-out ${isActive('contact') ? 'text-white bg-indigo-500 hover:bg-indigo-700' : 'text-slate-600 hover:text-indigo-800 hover:bg-indigo-50'}`}>Get in touch</a>
                                    </div>
                                    <div className="py-6">
                                        {user ? (
                                            <Buttons type='button' variant='secondaryFW' handleClick={handleLogout}>
                                                <span>Logout</span>
                                                <LogOut className='w-5 h-5' />
                                            </Buttons>
                                        ) : (
                                            <Buttons type='button' variant='primaryFW' handleClick={() => navigate('/login')}>
                                                <span>Get started</span>
                                                <ArrowRight className='w-5 h-5' />
                                            </Buttons>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </el-dialog-panel>
                    </div>
                </dialog>
            </el-dialog>
        </header>
    );
};

export default Header;
