import {useAuth} from "../../../context/AuthContext";
import {useEffect} from "react";
import getIsAdmin from "../../../requests/UnclassifiedRequests";
import Page404 from "../error/Page404";

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