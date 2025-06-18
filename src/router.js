import { createBrowserRouter } from "react-router-dom"
import Register from "./components/register"
import Login from "./components/Login"
import Changepass from "./components/changepass";
import Watchlist from "./components/Watchlist";

import App from "./App";
import WatchHistory from "./components/Watchhistory";
import SelectedMovieWrapper from "./components/moviewrapper";
import LandingPage  from "./components/landingpage";
import SelectedMovie from "./components/Movieview";






const router = createBrowserRouter([
    { path: '/movies', element: <App/> },
    {path :'/register',element:<Register/>},
    {path :'/login',element:<Login/>},
    {path :'/changepass',element:<Changepass/>},
    {path :'/watchlist',element:<Watchlist/>},
    {path :'/watchhistory',element:<WatchHistory/>},
    { path:'/movies/:id', element:<SelectedMovieWrapper/>},
    {path:'/',element:<LandingPage/>},
    {path:'/movie/:id' ,element:<SelectedMovie />}

    

   ]);

export default router;