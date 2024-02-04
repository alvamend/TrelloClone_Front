import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import BoardSideMenu from "./BoardSideMenu";

const Board = () => {

    const params = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [boardInfo, setBoardInfo] = useState({});
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const getBoardData = async () => {
            try {
                const response = await axiosPrivate.get(`board/${params.id}`, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });
                if (response?.status === 200) {
                    setBoardInfo(response?.data);
                    document.querySelector('.content').style.background = response?.data?.background
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        getBoardData();

        return () => {
            setBoardInfo({});
            setIsLoading(true);
            document.querySelector('.content').style.background = 'white'
        }
    }, [params.id])

    const toggleBoardMenu = (e) => {
        if (!document.querySelector('.board-sidemenu').style.transform || document.querySelector('.board-sidemenu').style.transform === 'translateX(360px)') {
            document.querySelector('.board-sidemenu').style.transform = 'translateX(0px)'
        } else if (document.querySelector('.board-sidemenu').style.transform === 'translateX(0px)') {
            document.querySelector('.board-sidemenu').style.transform = 'translateX(360px)'
        }
    }

    return (
        isLoading
            ? 'Loading'
            : (
                <>
                    <div className="board-header">
                        <div className="board-header_icon">
                            <h2 style={{ marginRight: '20px' }}>{boardInfo?.title}</h2>
                            <img src='/img/candado.png' />
                            <p style={{ textTransform: 'capitalize' }}>{boardInfo?.privacy}</p>
                        </div>
                        <div className="board-header_icon" onClick={toggleBoardMenu}>
                            <img src="/img/configuracion.png" style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                    <BoardSideMenu board={boardInfo} setBoard={setBoardInfo} />
                </>
            )
    )
}

export default Board;