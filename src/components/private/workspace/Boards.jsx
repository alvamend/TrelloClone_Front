import { useNavigate } from "react-router-dom";

const Boards = ({ workspace }) => {

    const navigate = useNavigate();

    const showCreateBoard = (e) => {
        document.querySelector('#floating-menu-create').style.display = 'none'
        document.querySelector('.modal-background').style.display = 'flex';
        document.querySelector('#create-board').style.display = 'block';
    }

    return (
        <>
            <h2>Boards</h2>
            <div className="boards-list">
                <div className="board-item" style={{ backgroundColor: 'gray' }} onClick={e => showCreateBoard()}>
                    <h4>Create new board</h4>
                </div>
                {(workspace?.boards && workspace?.boards.length) > 0 && (
                    workspace.boards.map(board => (
                        <div key={board._id} className="board-item" style={{ background: `${board.background}` }} onClick={e => navigate(`/board/${board._id}`)}>
                            <h4>{board.title}</h4>
                        </div>
                    ))
                )}
            </div>
        </>

    )
}

export default Boards;