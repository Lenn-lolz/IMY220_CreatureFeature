
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home_page from "./Pages/Home_page";
import Post_page from "./Pages/Post_page";
import Splashpage from "./Pages/Splash_page";
import Profile_page from "./Pages/Profile_page";
import Navigation from "./Components/Navigation";
import NotFound from "./Components/NotFound";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function AppContent() {

    const noShow = ["/splash", "/login", "/signup"];

    const location = useLocation();

    return (
        <div className="App">

            {!noShow.includes(location.pathname) && <Navigation />}

            <Routes>

                <Route
                    path="/"
                    element={<Home_page />}
                />

                <Route
                    path="/posts"
                    element={<Post_page />}
                />

                <Route
                    path="/posts/:id"
                    element={<Post_page />}
                />

                <Route
                    path="/splash"
                    element={<Splashpage />}
                />

                <Route
                    path="/profile"
                    element={<Profile_page />}
                />

                <Route
                    path="/profile/:id"
                    element={<Profile_page />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<SignUp />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </div>
    );
}

function App() {

    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;

