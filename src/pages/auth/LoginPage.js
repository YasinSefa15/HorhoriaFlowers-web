import {useAuth} from "../../context/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";

export default function LoginPage() {
    const {setUser} = useAuth()
    const navigate = useNavigate()
    const location = useLocation() //

    const handleLogin = (e) => {
        setUser({
            id: 1,
            first_name: "John",
            last_name: "Doe",
        })
        navigate(location?.state?.return_url || "/")
    }

    return (
        <>
            Login
            <button onClick={handleLogin}>LOG IN</button>
        </>
    )
}