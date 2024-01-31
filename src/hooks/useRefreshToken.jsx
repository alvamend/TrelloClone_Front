import useAuth from "./useAuth";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const URL = 'auth/refresh';
const useRefreshToken = () => {

    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const refresh = async () => {
        try {
            const response = await axios.get(URL, {
                withCredentials: true
            });
            if (response?.status === 200) {
                setAuth(response?.data)
            }
            return response.data.accessToken;
        } catch (error) {
            error?.response?.status === 403 ? navigate('/login') : '';
        }
    };

    return refresh;

};

export default useRefreshToken;