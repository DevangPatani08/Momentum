import { X } from 'lucide-react';
import Text from '../Text.jsx';
import Modal from './Modal.jsx';
import Buttons from '../Buttons.jsx';

const ViewMessageModal = ({ isOpen, title, msg, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='p-6 flex flex-col items-center justify-center gap-0'>
                <div className="w-full flex items-center justify-between mb-6">
                    <Text variant='h5' weight='semibold'>{title}</Text>
                    <Buttons type='button' variant='iconOnlySqNoBr' handleClick={onClose}><X className='w-8 h-8' /></Buttons>
                </div>
                <div className="w-full max-h-60 min-h-50 overflow-y-scroll border border-slate-300 rounded-md p-3 bg-slate-50">
                    <Text weight='medium'>{msg}</Text>
                </div>
            </div>
        </Modal>
    );
};

export default ViewMessageModal;
