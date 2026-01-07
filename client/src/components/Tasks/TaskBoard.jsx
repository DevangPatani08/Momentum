import { useEffect, useMemo, useState } from 'react';
import { ctgTasks } from '../../utils/taskUtils';
import TaskColumn from './TaskColumn';

const TaskBoard = ({ tasks, onEdit, toggling, onDelete, onToggleComplete }) => {
    const [currTime, setCurrTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrTime(new Date());
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const ctg = useMemo(() => { return ctgTasks(tasks || []); }, [tasks, currTime]);

    return (
        <div className='w-full flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-4'>
            <TaskColumn toggling={toggling} title='Right Now' tasks={ctg.rightNow} colType='right-now' onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete} />
            
            <TaskColumn toggling={toggling} title='On Convenience' tasks={ctg.onConvenience} colType='on-convenience' onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete} />
            
            <TaskColumn toggling={toggling} title='Complete Later' tasks={ctg.completeLater} colType='complete-later' onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete} />
            
            <TaskColumn toggling={toggling} title='Over Due' tasks={ctg.overDue} colType='overdue' onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete} />
        </div>
    );
};

export default TaskBoard;
