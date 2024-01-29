import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Boards from "./Boards";
import Members from "./Members";
import WorkspaceSettings from "./WorkspaceSettings";

const Workspace = () => {

    const workspaceId = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [workspace, setWorkspace] = useState({})
    const { auth, project } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getWorkspace = async () => {
            try {
                const response = await axiosPrivate.get(`workspace/${workspaceId.id}`, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });

                if (response?.status === 200) {
                    document.title = response?.data?.title;
                    setWorkspace(response?.data);
                    setIsLoading(false);
                }
            } catch (error) {
                if (error?.response?.status === 403) {
                    navigate('/login');
                }
            }
        };

        getWorkspace();

        return () => {
            setWorkspace({});
        }
    }, []);

    useEffect(() => {
        const workspaceToUse = project?._id ? project?._id : workspaceId.id;
        const renderWorkspace = async () => {
            try {
                const response = await axiosPrivate.get(`workspace/${workspaceToUse}`, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });
                if (response?.status === 200) {
                    document.title = response?.data?.title;
                    setWorkspace(response?.data);
                }
            } catch (error) {
                if (error?.response?.status === 403) {
                    navigate('/login');
                }
            }
        };

        renderWorkspace();

    }, [project]);

    const showAddMember = (e) => {
        document.querySelector('.modal-background').style.display = 'flex';
        document.querySelector('.modal-content').style.display = 'block';
        document.querySelector('#add-member').style.display = 'block';
    }

    return (
        isLoading
            ? <h4>Loading...</h4>
            : <>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: 'calc(100% - 200px)' }}>
                        <div className="title_workspace">
                            <h1>{workspace.title}</h1>
                            <img src="/img/boligrafo.png" alt="edit" />
                        </div>
                        <div className="privacy_workspace">
                            <img src={workspace.privacy === 'public' ? '/img/tierra.png' : '/img/candado.png'} alt="privacy" />
                            <p style={{ textTransform: 'capitalize' }}>{workspace.privacy}</p>
                        </div>
                    </div>
                    <div style={{ width: '200px' }}>
                        <button className="add-member" onClick={showAddMember}>+ Add Member</button>
                    </div>
                </div>
                <hr />

                {/* Routes Inside Workspace */}
                <Routes>
                    <Route path="/" element={
                        <section className="workspace__information">
                            <Outlet />
                        </section>
                    }>
                        <Route index element={<Boards workspace={workspace} />} />
                        <Route path="b" element={<Boards workspace={workspace} />} />
                        <Route path="m" element={<Members workspace={workspace} />} />
                        <Route path="s" element={<WorkspaceSettings workspace={workspace} />} />
                    </Route>
                </Routes>
            </>
    )
}

export default Workspace;