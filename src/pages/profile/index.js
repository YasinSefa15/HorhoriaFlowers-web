import {Link, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function ProfileLayout() {

    const {setUser, user} = useAuth()
    const location = useLocation()

    const handleLogout = () => {
        setUser(false)
    }

    return (
        <>
            <div style={{display: "flex"}}>
                <h1>Profile Page</h1>
            </div>
            {!user && <Link
                replace={true}
                state={{
                return_url: location.pathname + location.search}
            } to="/auth/login">Login</Link>}
            {user && <button onClick={handleLogout}>Logout</button>}
            <Outlet></Outlet>
        </>
    )
}