import { useEffect, useState } from 'react';
import TaskCard from './task-card.component';
import backendService from '../services/backend.service';
import config from '../constants/config';

export default function BoardColumn(props) {
    const { status, boardId } = props;

    const [tasks, setTasks] = useState([]);

    useEffect(async () => {
        try {
            const currentTasks = await backendService.get(
                `${config.api.getTasksByBoard}/${boardId}?status=${status.key}`
            );
            setTasks(currentTasks);
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="p-4 border-2 border-blue-medium w-full">
            <h1 className="text-3xl font-bold border-b-2">{status.value}</h1>
            <div className="flex flex-col gap-2 mt-4">
                {tasks.map(task => (
                    <TaskCard key={task.id} data={task} boardId={boardId} />
                ))}
            </div>
        </div>
    );
}
