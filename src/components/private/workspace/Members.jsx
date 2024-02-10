import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const URL = 'workspace/remove-member'
const Members = ({ workspace, setWorkspace }) => {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const handleDelete = async (memberEmail) => {
        const membersArray = [];
        try {
            const response = await axiosPrivate.put(`${URL}/${workspace._id}`, {
                email: memberEmail
            }, {
                headers: {
                    Authorization: auth.accessToken
                }
            });

            if (response?.status === 200) {
                workspace.members.forEach(member => {
                    if (member?.user?.email !== memberEmail) {
                        membersArray.push(member);
                    }
                });
                setWorkspace({ ...workspace, members: membersArray });
            }
        } catch (error) {
            console.error(error);
        }
    }
    console.log(workspace);
    return (
        <>
            <h2>Members</h2>
            <ul className="members-list">
                {(workspace?.members && workspace?.members.length > 0) && (
                    workspace.members.map(member => (
                        <li key={member._id} onClick={e => handleDelete(member?.user?.email)}>
                            <div>
                                <h4>{member?.user?.name} {member?.user?.surname}</h4>
                                <p>{member?.user?.username}</p>
                                <p>{member?.user?.email}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <p>{member?.workspaceRole}</p>
                                {
                                    (auth?.sub !== member.user?._id)
                                        ? (
                                            <div className="members__action">
                                                <img src="/img/borrar.png" />
                                            </div>
                                        )
                                        : ''
                                }
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </>
    )
}

export default Members;