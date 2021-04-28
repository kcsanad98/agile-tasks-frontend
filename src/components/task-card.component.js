import { Link } from 'react-router-dom';
import backendService from '../services/backend.service';
import TASK_STATUSES from '../constants/task-statuses';
import config from '../constants/config';
import * as ROUTES from '../constants/routes';

export default function TaskCard(props) {
    const { data, boardId } = props;

    async function changeTaskStatus(newStatus) {
        try {
            const requestBody = { status: newStatus };
            await backendService.put(`${config.api.tasks}/${data.id}`, requestBody);
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteTask() {
        try {
            await backendService.del(`${config.api.tasks}/${data.id}`);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="border-blue-medium border-2 h-12 items-center flex justify-between p-2">
            <Link to={ROUTES.TASK.replace(':taskId', data.id).replace(':boardId', boardId)}>
                <h1>{data.title}</h1>
            </Link>
            <div className="flex flex-row gap-1">
                {data.status !== TASK_STATUSES.TODO.key && (
                    <button
                        type="button"
                        title="Move task to Todo"
                        aria-label="Move task to Todo"
                        className="bg-blue-light p-1 rounded"
                        onClick={() => changeTaskStatus(TASK_STATUSES.TODO.key)}>
                        <span className="fa fa-list-ul text-white" />
                    </button>
                )}
                {data.status !== TASK_STATUSES.IN_PROGRESS.key && (
                    <button
                        type="button"
                        title="Move task to In Progress"
                        aria-label="Move task to In Progress"
                        className="bg-blue-dark p-1 rounded"
                        onClick={() => changeTaskStatus(TASK_STATUSES.IN_PROGRESS.key)}>
                        <span className="fa fa-arrow-right text-white" />
                    </button>
                )}
                {data.status !== TASK_STATUSES.DONE.key && (
                    <button
                        type="button"
                        title="Move task to Done"
                        aria-label="Move task to Done"
                        className="bg-blue-medium p-1 rounded"
                        onClick={() => changeTaskStatus(TASK_STATUSES.DONE.key)}>
                        <span className="fa fa-check text-white" />
                    </button>
                )}
                <button
                    type="button"
                    title="Delete task"
                    aria-label="Delete task"
                    className="bg-red-primary p-1 rounded"
                    onClick={deleteTask}>
                    <span className="fa fa-trash text-white" />
                </button>
            </div>
        </div>
    );
}
