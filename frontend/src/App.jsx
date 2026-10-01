
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home_page from "./Pages/Home_page";

import Splashpage from "./Pages/Splash_page";
import Profile_page from "./Pages/Profile_page";
import AlbumPage from "./Pages/AlbumPage";

import Navigation from "./Components/Navigation";
import NotFound from "./Components/NotFound";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import CreatePost from "./Components/Create_Post";
import Create_album from "./Components/Create_album";
import Edit_Post from "./Components/Edit_Post";

function AppContent() {

    const noShow = ["/splash", "/login", "/signup"];

    const location = useLocation();

    return (
        <div className="App">

            {!noShow.includes(location.pathname) && <Navigation />}

            <Routes>

                <Route path="/" element={<Home_page />}/>

                <Route path="/splash" element={<Splashpage />}/>
                <Route path="/profile" element={<Profile_page />}/>
                <Route path="/profile/:id" element={<Profile_page />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/CreatePost"element={<CreatePost />}/>
                <Route path="/createAlbum" element={<Create_album />} />
                <Route path="*" element={<NotFound />}/>
                <Route path="/albums/:id" element={<AlbumPage />} />
                <Route path="/editPost/:id" element={<Edit_Post />} />

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

