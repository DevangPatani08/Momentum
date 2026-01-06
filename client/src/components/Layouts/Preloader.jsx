import { Bars } from 'react-loader-spinner';

const Preloader = () => {
    return (
        <div className='w-full h-full min-h-screen flex flex-col items-center justify-center gap-2'>
            <Bars height="100" width="100" color="#615fff" />
        </div>
    );
};

export default Preloader;
