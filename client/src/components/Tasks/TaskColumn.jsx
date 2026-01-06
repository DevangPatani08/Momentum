import { sortTasks } from "../../utils/taskUtils.js";
import Text from "../Text";
import TaskCard from './TaskCard.jsx';

const TaskColumn = ({ toggling, title, tasks, colType, onEdit, onDelete, onToggleComplete }) => {
    const sortedTasks = sortTasks(tasks);

    const colColor = () => {
        switch (colType) {
            case 'on-convenience': return 'bg-indigo-50 border-indigo-200'
            case 'right-now': return 'bg-green-50 border-green-200'
            case 'complete-later': return 'bg-slate-50 border-slate-200'
            case 'overdue': return 'bg-red-50 border-red-200'
            default: return 'bg-slate-50 border-slate-200'
        }
    };

    const headerColor = () => {
        switch (colType) {
            case 'on-convenience': return 'bg-indigo-400 text-white'
            case 'right-now': return 'bg-green-400 text-white'
            case 'complete-later': return 'bg-slate-400 text-white'
            case 'overdue': return 'bg-red-400 text-white'
            default: return 'bg-slate-400 text-white'
        }
    };

    return (
        <div className={`border-2 rounded-md ${colColor()} flex flex-col items-center justify-start`}>
            <div className={`w-full p-3 rounded-t-md ${headerColor()}`}>
                <Text variant='h6' weight='bold' className="text-center">{title} <span className="text-base opacity-90">({tasks.length})</span></Text>
            </div>

            <div className="w-full p-3 flex-1 min-h-max max-h-full overflow-y-auto">
                {sortedTasks.length === 0 ? (
                    <Text className="w-full text-center text-slate-700 rounded-md bg-slate-200 px-8 py-2">No task found...</Text>
                ) : (
                    sortedTasks.map(task => (
                        <TaskCard key={task._id} task={task} toggling={toggling} onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete} />
                    ))
                )}
            </div>
      
        </div>
    );
};

export default TaskColumn;
