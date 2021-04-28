import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import backendService from '../services/backend.service';
import { TASK } from '../constants/page-titles';
import config from '../constants/config';
import TASK_STATUSES from '../constants/task-statuses';

const NEW_TASK_ID = 'new';

export default function Task() {
    const { boardId, taskId } = useParams();

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const isInvalid = title === '' || description === '';

    useEffect(async () => {
        document.title = TASK;
        if (taskId === NEW_TASK_ID) {
            return;
        }
        const taskData = await backendService.get(`${config.api.tasks}/${taskId}`);
        setTitle(taskData.title);
        setDescription(taskData.description);
    }, []);

    async function saveTask() {
        const requestBody = { title, description, status: TASK_STATUSES.TODO.key, board: boardId };
        console.log(requestBody);
        await backendService.post(config.api.tasks, requestBody);
    }

    async function updateTask() {
        const requestBody = { title, description };
        await backendService.put(`${config.api.tasks}/${taskId}`, requestBody);
    }

    async function handleSave(event) {
        event.preventDefault();
        try {
            if (taskId === NEW_TASK_ID) {
                await saveTask();
            } else {
                await updateTask();
            }
            history.goBack();
        } catch (err) {
            console.error(err);
        }
    }

    function handleCancel() {
        history.goBack();
    }

    return (
        <div className="flex flex-col items-center p-4 mb-4">
            <form onSubmit={handleSave} method="POST">
                <div className="mt-4 mb-2 font-bold">Create a new task</div>
                <input
                    aria-label="Enter the title of the task"
                    type="text"
                    placeholder="Title"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                    onChange={({ target }) => setTitle(target.value)}
                    value={title}
                />
                <input
                    aria-label="Enter the description of the task"
                    type="text"
                    placeholder="Description"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                    onChange={({ target }) => setDescription(target.value)}
                    value={description}
                />

                <div className="flex gap-1">
                    <button
                        disabled={isInvalid}
                        type="submit"
                        className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                            isInvalid && 'opacity-50'
                        }`}
                        onClick={handleSave}>
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-red-primary text-white w-full rounded h-8 font-bold">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
