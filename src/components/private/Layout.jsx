import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const FETCH_URL = 'workspace';
const Layout = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [workspaces, setWorkspaces] = useState([])
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    useEffect(() => {

        const getWorkspaces = async () => {
            try {
                const response = await axiosPrivate.get(FETCH_URL, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });
                if (response?.status === 200) {
                    setWorkspaces(response?.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getWorkspaces();

        return () => {
            setWorkspaces([]);
            setIsLoading(true);
        }

    }, [])

    return (
        <div className="layout">
            {isLoading
                ? ''
                : (
                    <>
                        <Header workspaces={workspaces} setWorkspaces={setWorkspaces} />
                        <Sidebar workspaces={workspaces} />
                    </>
                )
            }
            <main className="content">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout