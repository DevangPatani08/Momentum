const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    } else {
        return (
            <div className='fixed inset-0 bg-black/10 flex items-center justify-center p-4 z-50'>
                <div className="bg-white rounded-md max-w-md w-full max-h-[90vh] overflow-y-auto">{children}</div>
            </div>
        );
    }
};

export default Modal;
