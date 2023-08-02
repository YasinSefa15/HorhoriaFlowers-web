import {Store} from "react-notifications-component";

export default function NotificationHelper({type, title}) {
    Store.addNotification({
        title: title,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true
        }
    })
}