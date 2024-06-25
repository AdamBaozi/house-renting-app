import Home from '../Pages/Home';
import Message from '../Pages/Message';
import Find from '../Pages/Find';
import Me from '../Pages/Me';
import Layout from '../Pages/Layout';
import LocationList from '../Pages/locationList';
const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        children: [
            {
                index: true,
                element: <Layout/>,
                // children: [
                //     {
                //         path: 'locationList',
                //         element: <LocationList/>
                //     }
                // ]
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
    },
    {
        path: '/locationList',
        element: <LocationList/>
    }
])

export default router;