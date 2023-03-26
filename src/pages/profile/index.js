import {Outlet} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function ProfileLayout() {

    const {setUser} = useAuth()

    const handleLogout = () => {
        setUser(false)
    }

    return (
        <>
            <div style={{display: "flex"}}>
                <h1>Profile Page</h1>
            </div>
            <button onClick={handleLogout}>Logout</button>
            <Outlet></Outlet>
        </>
    )
}