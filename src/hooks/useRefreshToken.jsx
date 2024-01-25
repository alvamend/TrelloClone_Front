import useAuth from "./useAuth";
import axios from "../api/axios";

const URL = 'auth/refresh';
const useRefreshToken = () => {

    const { auth, setAuth } = useAuth();

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
            error?.response?.status === 403 ? console.error('Expired Cookie') : '';
        }
    };

    return refresh;

};

export default useRefreshToken;