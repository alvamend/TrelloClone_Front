import useAuth from "../../hooks/useAuth";

const Home = () => {
    const { auth } = useAuth();

    return (
        <div className="home-page">
            <div style={{width:'70%'}}>
            <div style={{display:'flex', justifyContent: 'center'}}>
                <img src="/img/logo-trello.png" alt="logo" />
            </div>
            <h1 style={{ textAlign: 'center', color: 'var(--primary-dark)' }}>Welcome to Trello Clone! - Your Project Management Platform</h1><br />
            <p>Are you ready to take your project organization to the next level? At <strong>Trello Clone</strong>, we provide an intuitive and efficient task management experience inspired by the popular platform Trello. Our platform is designed to help you visualize, collaborate, and complete your projects with ease and enjoyment.</p><br />
            <h3 style={{ color: 'var(--primary-dark)' }}>Key Features:</h3>
            <ul>
                <li><strong style={{ color: 'var(--primary-dark)' }}>Visual and Intuitive Boards: </strong>Organize your tasks with our visual boards and drag-and-drop cards to prioritize and update the status of your projects.</li>
                <li><strong style={{ color: 'var(--primary-dark)' }}>Real-time Collaboration: </strong>Invite your team to join your boards and work together in real-time. Share ideas, feedback, and files instantly. (Coming Soon!)</li>
                <li><strong style={{ color: 'var(--primary-dark)' }}>Customize to Your Style: </strong>Personalize your boards with eye-catching backgrounds and organize your cards the way that suits you best.</li>
                <li><strong style={{ color: 'var(--primary-dark)' }}>Security and Confidentiality: </strong>Your data is important. We ensure the security and confidentiality of your information, allowing you to focus on what truly matters: your projects.</li>
                <li><strong style={{ color: 'var(--primary-dark)' }}>Access Anywhere: </strong>Trello Clone is available on all your devices. Manage your projects from your desktop, tablet, or mobile phone, wherever you are.</li>
            </ul><br />
            <h3 style={{ color: 'var(--primary-dark)' }}>Getting Started:</h3>
            <ul>
                <li><strong style={{ color: 'var(--primary-dark)' }}>Create Workspaces, Boards and Cards: </strong>Kick off your projects by creating boards and cards to outline your tasks and milestones.</li>
                <li><strong style={{ color: 'var(--primary-dark)' }}>Add Your Team: </strong>Collaborate with your team by inviting them to your boards. Work together seamlessly for increased productivity.</li>
            </ul>
            </div>
        </div>
    )
};

export default Home;