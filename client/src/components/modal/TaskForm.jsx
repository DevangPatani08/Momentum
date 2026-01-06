import { Activity, useEffect, useState } from 'react'
import Text from '../Text';
import Buttons from '../Buttons';

const TaskForm = ({ isOpen, onClose, task, mode, onSubmit }) => {
    const [formData, setFormData] = useState({ message: '', priority: 'on-convenience', deadline: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const formatDD = (dateValue) => {
            if (!dateValue) return '';

            const deadline = new Date(dateValue);

            if (!deadline) return '';

            const y = deadline.getFullYear();
            const m = String(deadline.getMonth() + 1).padStart(2, '0');
            const d = String(deadline.getDate()).padStart(2, '0');
            const hr = String(deadline.getHours()).padStart(2, '0');
            const min = String(deadline.getMinutes()).padStart(2, '0');

            const formattedDeadline = !isNaN(deadline.getTime()) ? `${d}-${m}-${y}T${hr}:${min}` : '';

            return formattedDeadline;
        };

        const fake = () => {  
            if (task && mode === 'edit') {
                setFormData({ message: task.message, priority: task.priority, deadline: formatDD(task.deadline) });
            } else {
                setFormData({ message: '', priority: '', deadline: '' });
            }
            
            setErrors({});
        };

        fake();

    }, [task, mode, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const formValidation = () => {
        const err = {};

        if (!formData.message) {
            err.message = 'Message is a required field!...';
        } else if (!formData.message.length > 500) {
            err.message = 'Message cannot exceed 500 characters!...';
        }

        if (!formData.deadline) {
            err.deadline = 'Deadline is a required field!...';
        } else if (new Date(formData.deadline) < new Date()) {
            err.deadline = 'Deadline cannot be the past!...';
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formValidation()) return;

        try {
            await onSubmit(formData);
            onClose();
        } catch (err) {
            console.error(`Submission Error: ${err}`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50'>
            <div className="bg-white rounded-lg w-full max-w-md">
                <div className="p-6">
                    <Text variant='h4' weight='bold' className='mb-4 capitalize'>{mode === 'create' ? 'Create a new task' : 'Edit task'}</Text>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="message" className='block text-sm font-medium text-slate-700 mb-2'>Message<span className='text-red-500'>*</span></label>
                            <textarea name='message' id='message' value={formData.message} onChange={handleChange} placeholder='Type message here...' rows={3} className={`w-full p-3 text-slate-600 focus:text-slate-700 bg-white border rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus: ring-indigo-500 ${errors.message ? 'border-red-500' : 'border-slate-300' }`} maxLength={500} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="priority" className='block text-sm font-medium text-slate-700 mb-2'>Priority<span className='text-red-500'>*</span></label>
                            <select name="priority" id="priority" value={formData.priority} onChange={handleChange} className='w-full text-slate-700 border border-slate-300 rounded-md p-3 text-base bg-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500' required>
                                <option value="on-convenience">On Convenience</option>
                                <option value="right-now">Right Now</option>
                                <option value="complete-later">Complete Later</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="deadline" className='block text-sm font-medium text-slate-700 mb-2'>Deadline<span className='text-red-500'>*</span></label>
                            <input type="datetime-local" name="deadline" id="deadline" value={formData.deadline} onChange={handleChange} className={`w-full p-3 text-slate-600 focus:text-slate-700 border bg-white rounded-md text-base focus:outline-none focus:ring-indigo-500 focus:border-transparent ${errors.message ? 'border-red-500' : 'border-slate-300'}`} required />
                            <Activity mode={errors.deadline ? 'visible' : 'hidden'}><span className='w-full mt-1 text-xs text-right text-red-500'>{errors.deadline}</span></Activity>
                        </div>
                        <div className='flex items-center justify-end gap-6 pt-6 pb-2'>
                            <Buttons type='button' variant='bgNone' handleClick={onClose}>Cancel</Buttons>
                            <Buttons type='submit' variant='primary'>{mode === 'create' ? 'Create Task' : 'Update Task'}</Buttons>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
