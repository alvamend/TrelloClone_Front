const Header = () => {
    return (
        <header className="header">
            <div style={{ display: 'flex' }}>
                <div className="img-logo">
                    <img src="/img/logo-trello.png" />
                </div>
                <div className="navbar">
                    <div style={{position:'relative'}}>
                        <button onClick={e => {
                            if(document.querySelector('#floating-menu-workspaces').style.display === 'block'){
                                document.querySelector('#floating-menu-workspaces').style.display = 'none';
                                e.target.classList.remove('active')
                            }else if(document.querySelector('#floating-menu-workspaces').style.display = 'none'){
                                document.querySelector('#floating-menu-workspaces').style.display = 'block';
                                e.target.classList.add('active')
                            };
                        }}>Workspaces <img src="/img/flecha-hacia-abajo.png" /></button>
                        <div id="floating-menu-workspaces">
                            <h5>Your Workspaces</h5>
                            <hr/>
                        </div>
                    </div>
                    <button style={{ backgroundColor: 'var(--primary-dark)', width: '100px', height: '40px' }}>Create</button>
                </div>
            </div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '20px' }}>
                <form>
                    <input style={{ width: '250px', textAlign: 'start', paddingLeft: '10px' }} type="text" placeholder="Search" />
                </form>
                <div className="avatar" style={{ marginLeft: '20px' }}>
                    <h5>avatar</h5>
                </div>
            </div>
        </header>
    )
};

export default Header;