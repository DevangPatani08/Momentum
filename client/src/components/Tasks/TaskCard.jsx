import { Activity, useState } from 'react';
import { checkOverdue } from '../../utils/taskUtils';
import { Oval } from 'react-loader-spinner';
import { BadgeInfo, Clock3, Edit, Trash } from 'lucide-react';
import Buttons from '../Buttons';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import ViewMessageModal from '../modal/ViewMessageModal';
import ConfirmationModal from '../modal/ConfirmationModal';
import Text from '../Text';

const TaskCard = ({ task, toggling, onEdit, onDelete, onToggleComplete }) => {
    const [showDelModal, setShowDelModal] = useState(false);
    const [showMsgModal, setShowMsgModal] = useState(false);
    const overdue = checkOverdue(task);

    const handleDel = () => {
        onDelete(task._id);
        setShowDelModal(false);
    };

    const getPriorityColor = (priority) => {
        const priorityLower = priority?.toLowerCase();
        switch (priorityLower) {
            case 'right-now': return 'bg-green-100 text-green-900'
            case 'complete-later': return 'bg-slate-100 text-slate-900'
            default: return 'bg-indigo-100 text-indigo-900'
        }
    };

    const getPriorityText = (priority) => {
        const priorityLower = priority?.toLowerCase();
        switch (priorityLower) {
            case 'right-now': return 'High'
            case 'complete-later': return 'Low'
            default: return 'Medium'
        }
    };

    const calDue = () => {
        const { deadline, createdAt, completed } = task;

        if (!createdAt || !deadline) return 'No deadline';

        try {
            let DDate = new Date(deadline);
            let CDate = new Date(createdAt);
            let now = new Date();

            let tmins = DDate - CDate;
            let tdays = Math.ceil(tmins / (24 * 60 * 60 * 1000));

            let remianingMins = DDate - now;
            let remianingDays = Math.ceil(remianingMins / (24 * 60 * 60 * 1000));

            if (isNaN(tdays) || isNaN(remianingDays)) return 'Invalid date';
            if (completed) return `${remianingDays}d left`;
            if (remianingDays < 0) return `-${Math.abs(remianingDays)}d left`;

            return `${remianingDays}d left`;

        } catch (err) {
            console.error(`Error calculating deadline: ${err}`);
            return 'Error';
        }
    };
    
    return (
        <>
            <div className={`min-h-56 flex flex-col gap-0 border rounded-md p-4 mb-3 ${task.completed ? 'bg-slate-50 border-slate-300' : overdue ? 'bg-white border-red-300' : 'bg-white border-slate-300'}`}>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-sm font-medium rounded-full ${getPriorityColor(task.priority)}`}>{getPriorityText(task.priority)}</span>

                        <Activity mode={task.completed ? 'visible' : 'hidden'}><span className='px-2 py-1 text-sm font-medium rounded-full text-green-900 bg-green-200'>Completed</span></Activity>
                        <Activity mode={!task.completed && overdue ? 'visible' : 'hidden'}><span className='px-2 py-1 text-sm font-medium rounded-full text-red-900 bg-red-100'>Overdue</span></Activity>
                    </div>

                    {toggling.load === true && toggling.id === task._id ? (
                        <Oval width={20} height={20} color='#615fff' />
                    ) : (
                        <div className='group grid size-5 grid-cols-1'>    
                            <input type='checkbox' checked={task.completed} onChange={() => onToggleComplete(task._id)} className="w-5 h-5 col-start-1 row-start-1 appearance-none rounded-sm border border-slate-400 bg-white checked:border-green-600 checked:bg-green-600 indeterminate:border-green-600 indeterminate:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:border-slate-400 disabled:bg-slate-100 disabled:checked:bg-slate-100 forced-colors:appearance-auto" data-tooltip-id='my-tooltip' data-tooltip-content={`${task.completed ? 'Mark as pending' : 'Mark as complete'}`} data-tooltip-place='left' />
                            <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
                                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
                                <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-indeterminate:opacity-100" />
                            </svg>    
                        </div>
                    )}
                </div>
                <div className="w-full flex-1 p-2 border-b border-slate-300 mt-2 mb-4">
                    <Text weight='medium' className={`line-clamp-2 ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>{task.message}</Text>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <div className={`flex items-center justify-center gap-2 px-2 py-1 rounded-full text-sm text-slate-900 ${task.completed || overdue ? 'bg-transparent' : 'bg-orange-100'}`}>
                        {task.completed || overdue ? (
                            <span> </span>
                        ) : (
                            <>
                                <Clock3 className='w-4 h-4' />
                                <span className='w-max'>{calDue()}</span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <Buttons type='button' variant='iconOnly' handleClick={() => setShowMsgModal(true)} data-tooltip-id='my-tooltip' data-tooltip-content='View Message' data-tooltip-place='bottom'><BadgeInfo className='w-4.5 h-4.5' /></Buttons>
                        <Buttons type='button' variant='iconOnly' handleClick={() => onEdit(task)} disabled={task.completed} data-tooltip-id='my-tooltip' data-tooltip-content={`${task.completed ? 'Cannot edit completed task' : 'Edit Task'}`} data-tooltip-place='bottom'><Edit className='w-4.5 h-4.5' /></Buttons>
                        <Buttons type='button' variant='iconOnly' handleClick={() => setShowDelModal(true)} data-tooltip-id='my-tooltip' data-tooltip-content='Delete Task' data-tooltip-place='bottom'><Trash className='w-4.5 h-4.5' /></Buttons>
                    </div>
                </div>
            </div>

            <Tooltip id="my-tooltip" />

            <ViewMessageModal isOpen={showMsgModal} onClose={() => setShowMsgModal(false)} title='View Full Message' msg={task.message} />
            
            <ConfirmationModal isOpen={showDelModal} onClose={() => setShowDelModal(false)} onConfirm={handleDel} title='Delete Task' msg='Are you sure, you want to delete this task? This action is irreversible!...' />
        </>
    );
};

export default TaskCard;
