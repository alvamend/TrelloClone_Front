import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import UserSidebar from "./UserSidebar";

const UserSettings = () => {

    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();

    return (
        <div className="user-container">
            <div className="user-profile">
                <UserSidebar />
                <section>

                </section>
            </div>
        </div>
    )
}

export default UserSettings;