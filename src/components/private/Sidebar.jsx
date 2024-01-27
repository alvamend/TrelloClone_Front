import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Sidebar = () => {

    const [workspaces, setWorkspaces] = useState([]);
    const {auth, project, setProject} = useAuth();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {

    }, [])

    return (
        <aside className="sidebar">
            <div className="sidebar-items">
                <h4>Workspaces</h4>
            </div>
        </aside>
    )
}

export default Sidebar