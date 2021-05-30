import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link, useHistory } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import axios from "axios";

type Props = {
    setUsernameGlobal: Dispatch<SetStateAction<string>>;
    usernameGlobal: string;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    isLoggedIn: boolean;
};

const Login: React.FC<Props> = ({
    setUsernameGlobal,
    setIsLoggedIn,
    usernameGlobal,
    isLoggedIn,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    useEffect(() => {
        if (usernameGlobal !== "" && isLoggedIn) {
            console.log("moin");
            history.push("/");
        }
    }, [usernameGlobal, isLoggedIn]);

    function submitHandler(e: React.FormEvent<EventTarget>): void {
        e.preventDefault();
        if (!/\S/.test(username)) {
            setError("Please enter a username");
            return;
        } else if (!/\S/.test(password)) {
            setError("Please enter a password");
            return;
        }

        axios
            .post("http://localhost:4000/login", {
                username: username,
                password: password,
            })
            .then((res) => {
                if (res.data.message) {
                    setError(res.data.message);
                } else {
                    if (error !== "") {
                        setError("");
                    }
                    console.log(res.data[0].Username);
                    setUsernameGlobal(res.data[0].Username);
                    setIsLoggedIn(true);
                }
                console.log(res);
            });
    }

    return (
        <form
            onSubmit={submitHandler}
            className="m-auto backgroundGlass text-black p-10 rounded-st flex justify-center flex-col items-center gap-2"
        >
            <h1 className="text-5xl font-medium">Login</h1>
            <p className="mb-4">
                Are you new?{" "}
                <Link
                    to="/register"
                    className="text-pinkDark font-medium underline"
                >
                    Register
                </Link>
            </p>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className=" rounded-st mt-2 w-80 text-black py-2 px-4 focus:outline-none"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className=" rounded-st mt-2 w-80 text-black py-2 px-4 focus:outline-none"
            />
            <p className="w-full text-red-600 mt-2 text-center">{error}</p>
            <button
                type="submit"
                className="btn mt-2 relative focus:outline-none bg-pink hover:bg-cremeDark w-full rounded-st"
            >
                Log In
                <div className="absolute right-4 top-1/2 centerY">
                    <HiArrowRight size="20px" color="black" />
                </div>
            </button>
        </form>
    );
};

export default Login;
