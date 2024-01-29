import useAuth from "../../../hooks/useAuth";

const Boards = ({ workspace }) => {

    return (
        <>
            <h2>Boards</h2>
            <div className="boards-list">
                <div className="board-item" style={{ backgroundColor: 'gray' }}>
                    <h4>Create new board</h4>
                </div>
                {(workspace?.boards && workspace?.boards.length) > 0 && (
                    workspace.boards.map(board => (
                        <div key={board._id} className="board-item" style={{ backgroundColor: `${board.background}` }}>
                            <h4>{board.title}</h4>
                        </div>
                    ))
                )}
            </div>
        </>

    )
}

export default Boards;