import Header from '../Navigations/Header.jsx';
import Footer from '../Navigations/Footer.jsx';
import { Activity, useEffect, useState } from 'react';
import Preloader from './Preloader.jsx';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [navH, setNavH] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const preLoading = () => {
            const timeoutId = setTimeout(() => { setIsLoading(false); }, 4000);
            return timeoutId;
        };

        const timeoutId = preLoading();

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (isLoading) return;

        const updateHeight = () => {
            const header = document.getElementById('header');
            if (header) {
                const h = header.offsetHeight;
                setNavH(h);
            }
        };

        updateHeight();

        const timeoutId = setTimeout(updateHeight, 100);
        window.addEventListener('resize', updateHeight);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateHeight);
        };
    }, [isLoading, location.pathname]);

    if (isLoading) {
        return <Preloader />;
    } else {
        return (
            <div className='w-full h-max min-h-screen flex flex-col items-center justify-start gap-0 relative'>
                <Header />
                <main className='w-full h-max min-h-screen flex flex-col items-center justify-start gap-0' style={{paddingTop: `${navH}px`}}>{children}</main>
                <Activity mode={location.pathname === '/tasks' ? 'hidden' : 'visible'}><Footer /></Activity>
                <Toaster position='top-right' containerStyle={{ position: 'absolute', top: '100px', right: '50px'}} reverseOrder={false} />
            </div>
        );
    }
};

export default Layout;
