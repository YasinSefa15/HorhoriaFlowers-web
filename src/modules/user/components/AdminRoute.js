import {useAuth} from "../../../context/AuthContext";
import {Navigate, useLocation} from "react-router-dom";


export default function AdminRoute({children}) {
    const {user} = useAuth();
    const location = useLocation();

    if (!user) {
        //todo is admin check it
        return <Navigate
            to="/xxxx"
            replace={true} //when user clicks back button, they will not be redirected to login page
            state={{
                return_url: location.pathname + location.search //return to page requested after login
            }}
        />
    }

    return children
}