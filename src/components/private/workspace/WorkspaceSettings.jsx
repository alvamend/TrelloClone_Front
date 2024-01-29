import { useState } from "react";

const WorkspaceSettings = ({ workspace }) => {

    const [workspaceTitle, setWorkspaceTitle] = useState('');

    return (
        <>
            <h2>Workspace settings</h2><br />
            <h3>Workspace visibility</h3><hr />
            <div className="privacy_workspace">
                <img src={workspace.privacy === 'public' ? '/img/tierra.png' : '/img/candado.png'} alt="privacy" />
                <p style={{textTransform:'capitalize'}}>{workspace.privacy}</p>
            </div>
            <p style={{ textTransform: 'capitalize' }}>
                 {workspace.privacy === 'private' ? "This Workspace is private. It's not indexed or visible to those outside the Workspace" : "This Workspace is public. It's visible to anyone with the link and will show up in search engines like Google. Only those invited to the Workspace can add and edit Workspace boards."}
            </p>
            <div>
                <button>Delete this workspace</button>
            </div>
        </>
    )
}

export default WorkspaceSettings;