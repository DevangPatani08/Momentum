import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import { Activity, useState } from 'react';
import Preloader from '../components/Layouts/Preloader';
import Text from '../components/Text';
import Buttons from '../components/Buttons';
import { Plus } from 'lucide-react';
import TaskBoard from '../components/Tasks/TaskBoard';
import TaskForm from '../components/modal/TaskForm';

const Tasks = () => {
    const { tasks, loading, error, toggling, makeTask, updateTask, delTask, toggleStatus } = useTasks();
    const { user } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [edit, setEdit] = useState(null);

    const handleEditClick = (task) => setEdit(task);
    const handleMake = async (data) => await makeTask(data);
    const handleEdit = async (data) => {
        await updateTask(edit._id, data);
        setEdit(null);
    };

    const hanleClose = () => {
        setShowForm(false);
        setEdit(null);
    }

    if (loading) {
        return (
            <Preloader />
        );
    } else if (error) {
        return (
            <div className='wrapper'>
                <div className="bg-red-50 border-red-300 rounded-md p-4">
                    <Text className='text-red-700'>{`Error: ${error}`}</Text>
                </div>
            </div>
        );
    } else {
        return (
            <section className='w-full h-max py-6 md:py-4 px-3 md:px-16 flex flex-col justify-center items-center flex-1'>
                <div className="wrapper flex-1 flex flex-col jusitfy-center items-start h-full">
                    <div className="w-full px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="w-full md:w-fit text-center md:text-left">
                            <Text variant='h3' weight='bold'>Welcome <span className='text-indigo-500'>{`${user.firstName} ${user.lastName}`}</span></Text>
                            <Text className='text-slate-600'>Organize your tasks and boost your productivity.</Text>
                        </div>

                        <Buttons type='button' variant='primary' handleClick={() => setShowForm(true)}>
                            <Plus className='w-5 h-5' />
                            <span>Create Task</span>
                        </Buttons>
                    </div>

                    <TaskBoard tasks={tasks} onDelete={delTask} toggling={toggling} onToggleComplete={toggleStatus} onEdit={handleEditClick} />
            
                    <Activity mode={showForm ? 'visible' : 'hidden'}>
                        <TaskForm isOpen={showForm} onClose={hanleClose} mode='create' onSubmit={handleMake} />
                    </Activity>
                    
                    <Activity mode={edit ? 'visible' : 'hidden'}>
                        <TaskForm isOpen={!!edit} onClose={hanleClose} mode='edit' onSubmit={handleEdit} task={edit} />
                    </Activity>
                </div>
            </section>
        );
    }
};

export default Tasks;
