import React, { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import BackGroundCircles from "./Components/BackgroundCircles/BackgroundCircles";
import LandingPage from "./Components/LandingPage/LandigPage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

const App: React.FC = () => {
    const [curPage, setCurPage] = useState("/");
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [username, setUsername] = useState("");

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:4000/login").then(
            (res) => {
                console.log(res.data);
                if (res.data.loggedIn) {
                    setIsLoggedIn(true);
                    setUsername(res.data.user[0].Username);
                } else {
                    setIsLoggedIn(false);
                }
                setLoaded(true);
            },
            (error) => {
                setLoaded(true);
            }
        );
    }, []);

    return (
        <Router>
            <BackGroundCircles />
            {!loaded ? (
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ) : (
                <Header
                    curPage={curPage}
                    username={username}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setUsername={setUsername}
                />
            )}
            {loaded ? (
                <Switch>
                    <Route path="/" exact>
                        {isLoggedIn ? (
                            <Home username={username} />
                        ) : (
                            <LandingPage />
                        )}
                    </Route>
                    <Route path="/login" exact>
                        <Login
                            setIsLoggedIn={setIsLoggedIn}
                            setUsernameGlobal={setUsername}
                            isLoggedIn={isLoggedIn}
                            usernameGlobal={username}
                        />
                    </Route>
                    <Route path="/register" exact>
                        <Register
                            setIsLoggedIn={setIsLoggedIn}
                            setUsernameGlobal={setUsername}
                            isLoggedIn={isLoggedIn}
                            usernameGlobal={username}
                        />
                    </Route>
                </Switch>
            ) : null}
        </Router>
    );
};

export default App;
