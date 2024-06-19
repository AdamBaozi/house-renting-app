import Home from '../Pages/Home';
import Message from '../Pages/Message';
import Find from '../Pages/Find';
import Me from '../Pages/Me';
import Layout from '../Pages/Layout';
const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        children: [
            {
                path: 'layout',
                element: <Layout/>
            },
            {
                path: 'find',
                element: <Find/>
            },
            {
                path: 'message',
                element: <Message/>
            },
            {
                path: 'me',
                element: <Me/>
            }
        ]
    }
])

export default router;