import {Store} from "react-notifications-component";

export default function NotificationHelper(params) {
    switch (params.httpStatus) {
        case 200:
        case 201:
            Store.addNotification({
                title: params.title,
                message: params.message,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
            break;

        case 409:
            Store.addNotification({
                title: params.title,
                message: params.message,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
            break;
        case 422:
            Store.addNotification({
                title: params.title,
                message: params.message,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
            break;
        case 400:
        case 401:
        case 419:
        case 429:
            Store.addNotification({
                title: params.title,
                message: params.message,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
            break;
        case 500:
            Store.addNotification({
                title: params.title,
                message: params.message,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
            break;
        default:
    }
}