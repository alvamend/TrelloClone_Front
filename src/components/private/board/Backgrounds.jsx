import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const URL = 'board'
const Backgrounds = ({ gradient, board, mini = false }) => {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const updateBackground = async (e) => {
        try {
            const response = await axiosPrivate.put(`${URL}/${board._id}`, {
                background: gradient
            }, {
                headers: {
                    Authorization: auth.accessToken
                }
            });
            if(response?.status === 200){
                document.querySelector('.content').style.background = gradient;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={!mini ? 'background-item' : 'background-item mini'} style={{ background: gradient }} onClick={updateBackground}>

        </div>
    )
}

export default Backgrounds;