import useAuth from "./useAuth";
import axios from "../api/axios";

const LOGOUT_URL = 'auth/logout'
const useLogout = () => {
    const { auth, setAuth } = useAuth();

    const logout = async () => {
        setAuth({})
        try {
            const response = await axios.delete(LOGOUT_URL, {
                headers: {
                    Authorization: auth.accessToken,
                },
                withCredentials: true
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return logout;
}

export default useLogout;