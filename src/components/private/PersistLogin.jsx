import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

    }, []);

    return(
        isLoading
            ? 'Loading...'
            : <Outlet />
    )

};

export default PersistLogin;