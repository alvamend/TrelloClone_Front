import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useNavigateProject = () => {
    const { setProject } = useAuth();
    const navigate = useNavigate();

    const navigateToProject = (projectId) => {
        setProject({
            id: projectId
        });
        navigate(`/workspace/${projectId}`)
    }

    return navigateToProject;
};

export default useNavigateProject;