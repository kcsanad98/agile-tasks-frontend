export default function UserCard(props) {
    const { user, addAction, removeAction } = props;

    return (
        <div className="border rounded-3xl bg-blue-medium font-bold text-white w-max px-4 py-1 flex flex-row gap-4">
            <div>{user.email}</div>
            {removeAction && (
                <button
                    className="text-red-primary font-extrabold"
                    type="button"
                    aria-label="Remove user from board"
                    onClick={removeAction}>
                    x
                </button>
            )}
            {addAction && (
                <button
                    className="text-white font-extrabold"
                    type="button"
                    aria-label="Add user to board"
                    onClick={addAction}>
                    +
                </button>
            )}
        </div>
    );
}
