import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import backendService from '../services/backend.service';
import authenticationService from '../services/authentication.service';
import BoardColumn from '../components/board-column.component';
import UserBoard from '../components/user-card.component';
import * as ROUTES from '../constants/routes';
import config from '../constants/config';

export default function Board() {
    const history = useHistory();

    const { boardId } = useParams();

    const [title, setTitle] = useState('');
    const [currentUsers, setCurrentUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [emailInput, setEmailInput] = useState('');
    const [newUsers, setNewUsers] = useState([]);

    const isInvalid = emailInput.length < 4;
    const currentUser = authenticationService.currentUserValue();

    useEffect(async () => {
        try {
            const boardData = await backendService.get(`${config.api.boards}/${boardId}`);
            setTitle(boardData.title);
            setCurrentUsers(boardData.users.filter(user => user.id !== currentUser.id));
            setTasks(boardData.tasks);
        } catch (err) {
            console.error(err);
        }
    }, []);

    async function handleSearch() {
        try {
            const searchResult = await backendService.get(
                `${config.api.users}?filter=${emailInput}`
            );
            setNewUsers(searchResult.filter(user => user.id !== currentUser.id));
        } catch (err) {
            console.error(err);
        }
    }

    async function addUserToBoard(user) {
        const requestBody = { boardId, userId: user.id };
        try {
            await backendService.put(config.api.addUserToBoard, requestBody);
            setNewUsers(newUsers.filter(newUser => user.id !== newUser.id));
            setCurrentUsers([...currentUsers, user]);
        } catch (err) {
            console.error(err);
        }
    }

    async function removeUserFromBoard(user) {
        const requestBody = { boardId, userId: user.id };
        try {
            await backendService.put(config.api.removeUserFromBoard, requestBody);
            setCurrentUsers(currentUsers.filter(currentUser => user.id !== currentUser.id));
            setNewUsers([...newUsers, user]);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleDeleteBoard() {
        try {
            await backendService.del(`${config.api.boards}/${boardId}`);
            history.push(ROUTES.HOME);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container p-8">
            <div className="flex flex-row justify-between">
                <h1 className="mb-8 font-bold text-3xl">{title}</h1>
                <button
                    type="button"
                    className="bg-red-primary text-white px-4 rounded h-10"
                    onClick={handleDeleteBoard}>
                    Delete this board
                </button>
            </div>
            <h2 className="my-4 font-bold text-xl">Add new users:</h2>
            <div className="my-4 flex flex-row h-10">
                <input
                    aria-label="Search for users to add to the board"
                    type="text"
                    placeholder="Search users by email"
                    className="text-sm text-gray-base mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                    onChange={({ target }) => setEmailInput(target.value)}
                    value={emailInput}
                />
                <button
                    type="button"
                    className={`bg-blue-medium text-white px-4 rounded h-10 ${
                        isInvalid && 'opacity-50'
                    }`}
                    onClick={handleSearch}>
                    Search
                </button>
                <div className="grid lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-4 xs:grid-cols-2 gap-2 mb-8 ml-4">
                    {newUsers.map(user => (
                        <UserBoard
                            boardId={boardId}
                            key={user.id}
                            user={user}
                            addAction={() => addUserToBoard(user)}
                        />
                    ))}
                </div>
            </div>
            <h2 className="mt-8 mb-4 font-bold text-xl">Users currently accessing this board:</h2>
            <div className="grid lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-4 xs:grid-cols-2 gap-2 mb-8">
                {currentUsers.map(user => (
                    <UserBoard
                        boardId={boardId}
                        key={user.id}
                        user={user}
                        removeAction={() => removeUserFromBoard(user)}
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
                <BoardColumn />
                <BoardColumn />
                <BoardColumn />
            </div>
        </div>
    );
}
