import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const WorkspaceHeaderList = ({ workspaces }) => {

    const { auth, project, setProject } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.setItem('project', JSON.stringify(project));
    }, [project])

    return (
        <div id="floating-menu-workspaces">
            <h5>Your Workspaces</h5>
            <hr />
            <ul className="workspace-list">
                {workspaces.map(workspace => (
                    (workspace.members[0].user === auth.sub)
                        ? <li key={workspace._id} onClick={e => {
                            setProject(workspace._id);
                            navigate(`/workspace/${workspace._id}`);
                            document.querySelector('#floating-menu-workspaces').style.display = 'none';
                        }}>
                            <p>{workspace.title}</p>
                        </li> : ''
                ))}
            </ul>
            <h5>Guest Workspaces</h5>
            <hr />
            <ul className="workspace-list">
                {workspaces.map(workspace => (
                    (workspace.members[0].user !== auth.sub)
                        ? <li key={workspace._id} onClick={e => {
                            setProject(workspace._id);
                            navigate(`/workspace/${workspace._id}`);
                            document.querySelector('#floating-menu-workspaces').style.display = 'none';
                        }}>
                            <p>{workspace.title}</p>
                        </li> : ''
                ))}
            </ul>
        </div>
    )
}

export default WorkspaceHeaderList;