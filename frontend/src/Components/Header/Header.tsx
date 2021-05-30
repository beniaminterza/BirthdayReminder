import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import HeaderElement from "./HeaderElement";
import { Link, useHistory } from "react-router-dom";
import Gift from "../../img/gift.svg";
import axios from "axios";

type Props = {
    curPage: string;
    isLoggedIn: boolean;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const Header: React.FC<Props> = ({
    curPage,
    isLoggedIn,
    username,
    setUsername,
    setIsLoggedIn,
}) => {
    const history = useHistory();

    function logoutHandler(): void {
        axios.delete("http://localhost:4000/login").then((res) => {
            console.log(res.data);
            setUsername("");
            setIsLoggedIn(false);
        });
    }

    return (
        <header>
            <div className="flex text-black m-auto w-1/9 max-w-1400 justify-between items-center py-5">
                <Link to="/">
                    <img src={Gift} alt="Gift" className="h-10" />
                </Link>
                {!isLoggedIn ? (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn bg-pink rounded-st">
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="btn rounded-st bg-white text-pinkDark"
                        >
                            Register
                        </Link>
                    </div>
                ) : (
                    <div className="flex gap-6 items-center">
                        <p className="font-medium">{username}</p>
                        <button
                            onClick={logoutHandler}
                            className="btn focus:outline-none rounded-st bg-white text-black"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
