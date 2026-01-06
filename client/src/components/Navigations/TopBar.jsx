import Buttons from '../Buttons';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftToLine } from 'lucide-react';

const TopBar = () => {
    const navigate = useNavigate();

    return (
        <header className='w-full max-w-screen h-fit py-3 px-6 md:px-20 fixed top-0 z-50'>
            <nav className='w-full container mx-auto h-fit flex items-center justify-between'>
                <Buttons type='button' variant='bgNone' handleClick={() => navigate('/')}>
                    <ArrowLeftToLine className='w-5 h-5' />
                    <span>Back</span>
                </Buttons>
            </nav>
        </header>
    );
};

export default TopBar;
