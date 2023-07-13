import {useAuth} from "../../context/AuthContext";
import {Navigate, useLocation} from "react-router-dom";


export default function PrivateRoute({children}) {
    const {user} = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate
            to="/auth/login"
            replace={true} //when user clicks back button, they will not be redirected to login page
            state={{
                return_url: location.pathname + location.search //return to page requested after login
            }}
        />
    }

    return children
}