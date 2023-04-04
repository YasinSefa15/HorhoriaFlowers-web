import {useRoutes} from 'react-router-dom'
import routes from "./routes";
import {ReactNotifications} from "react-notifications-component";

function App() {
    return (
        <>
            <ReactNotifications />
            {useRoutes(routes)}
        </>
);
}

export default App;
