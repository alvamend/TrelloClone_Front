const Members = ({ workspace }) => {
    return (
        <>
            <h2>Members</h2>
            <ul className="members-list">
                {(workspace?.members && workspace?.members.length > 0) && (
                    workspace.members.map(member => (
                        <li key={member._id}>
                            <div>
                                <h4>{member?.user?.name} {member.user.surname}</h4>
                                <p>{member?.user?.username}</p>
                                <p>{member?.user?.email}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <p>{member?.workspaceRole}</p>
                                <div className="members__action">
                                    <img src="/img/borrar.png" />
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </>
    )
}

export default Members;