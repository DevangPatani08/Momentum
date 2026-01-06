import Buttons from '../Buttons.jsx';
import Text from '../Text.jsx';
import Modal from './Modal.jsx';

const ConfirmationModal = ({isOpen, onClose, onConfirm, title, msg}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                <Text variant='h5' weight='bold' className='mb-2'>{title}</Text>
                <Text className='text-slate-600 mb-2'>{msg}</Text>
                <div className="flex items-center justify-end gap-3">
                    <Buttons type='button' variant='bgNone' handleClick={onClose}>Cancel</Buttons>
                    <Buttons type='button' variant='danger' handleClick={onConfirm}>Delete</Buttons>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
