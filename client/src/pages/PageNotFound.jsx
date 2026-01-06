import { useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Buttons from "../components/Buttons";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-h-screen flex-1 flex flex-col items-center justify-center gap-0 text-center bg-white overflow-hidden">
            <DotLottieReact src="https://lottie.host/7fa84171-936a-4d95-8629-06da9f05d197/1C6KQJr7c9.lottie" loop autoplay className="w-full h-auto" />
            <div className="fixed bottom-0 w-full md:max-w-2xl lg:max-w-3xl mx-auto h-auto flex items-end justify-center gap-8 px-6 py-50 md:py-22 md:px-24 z-50">
                <Buttons type='button' variant="primaryFW" handleClick={() => navigate('/')}>Goto Home</Buttons>
                <Buttons type='button' variant="secondaryFW" handleClick={() => navigate('/contact')}>Get Support</Buttons>
            </div>
        </div>
    );
};

export default PageNotFound;