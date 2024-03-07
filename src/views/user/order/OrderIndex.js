import "./Order.css"
import OrderWizard from "./OrderWizard";
import {useLocation} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";
import MessageBox from "./components/MessageBox";

export default function OrderIndex() {
    const {secret, user} = useAuth()
    const location = useLocation();
    const total = location.state ? location.state.total : -1;

    return (
        <>
            {((() => {
                if (!secret || !user) {
                    return <MessageBox/>
                }
            }))()}


            <OrderWizard total={total}/>
        </>
    )
}