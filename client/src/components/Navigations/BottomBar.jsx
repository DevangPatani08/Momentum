import Text from "../Text";


const BottomBar = () => {
    const currYear = new Date().getFullYear();
    
    return (
        <footer className="w-full h-fit py-4 px-6 xl:px-20 fixed bottom-0 z-50 flex items-center justify-center">
            <div className="w-full container mx-auto flex items-center justify-center">
                <Text className="w-full h-max text-center text-slate-600">&copy; Momentum {currYear} by Devang Mrugesh Patani. All rights reserved.</Text>
            </div>
        </footer>
    );
};

export default BottomBar;
