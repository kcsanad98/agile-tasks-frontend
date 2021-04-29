import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import backendService from '../services/backend.service';
import authenticationService from '../services/authentication.service';
import UserCard from '../components/user-card.component';
import { BOARD } from '../constants/page-titles';
import config from '../constants/config';
import KanbanBoard from '../components/kanban-board.component';

export default function Board() {
    const { boardId } = useParams();

    const [title, setTitle] = useState('');
    const [currentUsers, setCurrentUsers] = useState([]);
    const [emailInput, setEmailInput] = useState('');
    const [newUsers, setNewUsers] = useState([]);

    const isInvalid = emailInput.length < 4;
    const currentUser = authenticationService.currentUserValue();

    useEffect(async () => {
        try {
            const boardData = await backendService.get(`${config.api.boards}/${boardId}`);
            setTitle(boardData.title);
            setCurrentUsers(boardData.users.filter(user => user.id !== currentUser.id));
            document.title = `${BOARD} ${title}`;
        } catch (err) {
            console.error(err);
        }
    }, []);

    async function handleSearch() {
        try {
            const searchResult = await backendService.get(
                `${config.api.users}?filter=${emailInput}`
            );
            const currentUserIds = currentUsers.map(user => user.id);
            setNewUsers(
                searchResult.filter(
                    user => user.id !== currentUser.id && !currentUserIds.includes(user.id)
                )
            );
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

    return (
        <div className="container p-8">
            <div className="flex flex-row justify-between">
                <h1 className="mb-8 font-bold text-3xl">{title}</h1>
            </div>
            <h2 className="my-4 font-bold text-xl">Add new users:</h2>
            <div className="flex flex-col">
                <div className="my-4 flex flex-row h-10">
                    <input
                        aria-label="Search users to add to the board"
                        type="text"
                        placeholder="Search users by email"
                        className="text-sm text-gray-base mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setEmailInput(target.value)}
                        value={emailInput}
                    />
                    <button
                        type="button"
                        title="Seach users"
                        aria-label="Search users"
                        className={`bg-blue-medium text-white px-4 rounded h-10 ${
                            isInvalid && 'opacity-50'
                        }`}
                        disabled={isInvalid}
                        onClick={handleSearch}>
                        <span className="fa fa-search" />
                    </button>
                </div>
                <div className="flex flex-col md:flex-row">
                    {newUsers.map(user => (
                        <UserCard
                            boardId={boardId}
                            key={user.id}
                            user={user}
                            addAction={() => addUserToBoard(user)}
                        />
                    ))}
                </div>
            </div>
            <h2 className="mt-8 mb-4 font-bold text-xl">Users currently accessing this board:</h2>
            <div className="flex flex-col md:flex-row">
                {currentUsers.map(user => (
                    <UserCard
                        boardId={boardId}
                        key={user.id}
                        user={user}
                        removeAction={() => removeUserFromBoard(user)}
                    />
                ))}
            </div>
            <KanbanBoard boardId={boardId} />
        </div>
    );
}
