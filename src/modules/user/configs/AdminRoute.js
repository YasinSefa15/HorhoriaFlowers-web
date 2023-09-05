import {useAuth} from "../../../context/AuthContext";
import {useEffect} from "react";
import Page404 from "../pages/error/Page404";
import getIsAdmin from "../../../api.requests/UnclassifiedRequests";

export default function AdminRoute({children}) {
    const {secret, isAdmin, setIsAdmin} = useAuth();

    useEffect(() => {
        const isAdmin = async () => {
            await getIsAdmin({secret: secret, setIsAdmin: setIsAdmin})
        }
        isAdmin().then(r => {

        })
    }, [])

    if (!isAdmin) {
        return <Page404></Page404>
    }

    return children
}