import {useRoutes} from 'react-router-dom'
import routes from "./routes";
import {ReactNotifications} from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
import './App.css'
function App() {
    return (
        <>
            <ReactNotifications />
            {useRoutes(routes)}
        </>
);
}

export default App;
