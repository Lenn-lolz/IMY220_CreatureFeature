//u24566935

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home_page from "./Pages/Home_page";
import Post_page from "./Pages/Post_page";
import Splashpage from "./Pages/Splash_page";
import Profile_page from "./Pages/Profile_page";
import Navigation from "./Components/Navigation";
import NotFound from "./Components/NotFound";
import Post from "./Components/Post"

import Login from "./Components/Login";
import SignUp from "./Components/SignUp";


function AppContent() {
    const posts = [
        {
            id: 1,
            profileId: 1,
            title: "My pet dragon just had babies!!",
            caption: "Oh gosh the house is burning down",
            comments: [
                {
                    id: 1,
                    user: "@JohnCenaaaa",
                    comment: "Absolute cinema!"
                },
                {
                    id: 2,
                    user: "@HatsuneMiku",
                    comment: "Awww cute baby dragons!!"
                }
            ]
        },
        {
            id: 2,
            profileId: 1,
            title: "Unicorns??",
            caption: "They are much fatter and greyer than I thought they would be",
            comments: [
                {
                    id: 1,
                    user: "@JohnCenaaaa",
                    comment: "That is a rhino my guy"
                }
            ]
        },
        {
            id: 3,
            profileId: 2,
            title: "Fuzzy turtle ducks",
            caption: "It's spring so the turtle ducks are having babies and it's so so so cute",
            comments: [
                {
                    id: 1,
                    user: "@BoyAndTheHeron",
                    comment: "Adorable! How many are there? "
                }
            ]
        },
        {
            id: 4,
            profileId: 3,
            title: "Blue snakes!",
            caption: "Kinda look like my pigtails",
            comments: [
                {
                    id: 1,
                    user: "@BoyAndTheHeron",
                    comment: "Oh yeah they do "
                },
                {
                    id: 2,
                    user: "@Gabe",
                    comment: "Gabe approves of this "
                }
            ]
        }
    ];

    const profs = [
        {
            id: 1,
            username: "@BoyAndTheHeron",
            bio: "Currently crying rn"
        },
        {
            id: 2,
            username: "@JohnCenaaaa",
            bio: "Dun durah dah"
        },
        {
            id: 3,
            username: "@HatsuneMiku",
            bio: "Miku miku beam!!"
        }
    ];

    const noShow = ["/splash", "/login", "/signup"];
    const location = useLocation();

    const express = 'http://localhost:3000/';


    return (
        <div className="App">
            {!noShow.includes(location.pathname) && <Navigation />}

            <Routes>
                <Route path="/" element={<Home_page profs={profs} />} />
                <Route path="/posts" element={<Post_page />} />
                <Route path="/posts/:id" element={<Post posts={posts} />} />
                
                <Route path="/splash" element={<Splashpage />} />

                <Route path="/profile" element={<Profile_page profs={profs} />} />
                <Route path="/profiles/:id" element={<Profile_page posts={posts}/>} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
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