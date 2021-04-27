import { useState } from 'react';
import { useHistory } from 'react-router';
import backendService from '../services/backend.service';
import config from '../constants/config';
import * as ROUTES from '../constants/routes';

export default function CreateBoard() {
    const history = useHistory();

    const [title, setTitle] = useState('');

    const isInvalid = title === '';

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const body = { title };
            await backendService.post(config.api.boards, body);
            history.push(ROUTES.HOME);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancel = async event => {
        event.preventDefault();
        history.push(ROUTES.HOME);
    };

    return (
        <div className="flex flex-col items-center p-4 mb-4">
            <form onSubmit={handleSubmit} method="POST">
                <div className="mt-4 mb-2 font-bold">Create a new board</div>
                <input
                    aria-label="Enter the title of the board"
                    type="text"
                    placeholder="Title"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                    onChange={({ target }) => setTitle(target.value)}
                    value={title}
                />
                <div className="mt-4 mb-2">
                    <span className="font-bold">Note:</span>
                    {` `}
                    you will be able to add other users to your board after it was created
                </div>
                <div className="flex gap-1">
                    <button
                        disabled={isInvalid}
                        type="submit"
                        className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                            isInvalid && 'opacity-50'
                        }`}>
                        Submit
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
