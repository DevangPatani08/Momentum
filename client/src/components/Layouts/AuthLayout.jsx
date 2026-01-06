import TopBar from '../Navigations/TopBar';
import BottomBar from '../Navigations/BottomBar';
import { useEffect, useState } from 'react';
import Preloader from './Preloader';

const AuthLayout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const preLoading = () => {
            const timeoutId = setTimeout(() => { setIsLoading(false); }, 4000);
            return timeoutId;
        };

        const timeoutId = preLoading();

        return () => clearTimeout(timeoutId);
    }, []);


    if (isLoading) {
        return <Preloader />;
    } else {
        return (
            <div className='w-full max-w-screen h-auto min-h-screen flex flex-col items-center justify-start gap-0 overflow-hidden'>
                <TopBar />
                <main className='w-full flex-1 flex flex-col items-center justify-start gap-0'>{children}</main>
                <BottomBar />
            </div>
        );
    }
};

export default AuthLayout;