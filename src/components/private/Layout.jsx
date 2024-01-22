import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <Sidebar />
            <main className="content">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout