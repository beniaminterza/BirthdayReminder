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

const Register: React.FC<Props> = ({
    setUsernameGlobal,
    setIsLoggedIn,
    usernameGlobal,
    isLoggedIn,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
        } else if (!/\S/.test(confirmPassword)) {
            setError("Please confirm your password");
            return;
        } else if (confirmPassword !== password) {
            setError("Password does not match");
            return;
        } else if (
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)
        ) {
            console.log("Match");
            setError(
                "Your password should contain at least one digit, one lower case, one uppercase be at least 8 characters long"
            );
            return;
        }
        axios
            .post("http://localhost:4000/register", {
                username: username,
                password: password,
            })
            .then((res) => {
                console.log(res);
                if (res.data.message) {
                    setError(res.data.message);
                } else {
                    if (error !== "") {
                        setError("");
                    }
                    setUsernameGlobal(res.data);
                    setIsLoggedIn(true);
                }
            });
    }

    return (
        <form
            onSubmit={submitHandler}
            className="m-auto backgroundGlass text-black p-10 rounded-st flex justify-center flex-col items-center gap-2"
        >
            <h1 className="text-5xl font-medium">Register</h1>
            <p className="mb-4">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-pinkDark font-medium underline"
                >
                    Log In
                </Link>
            </p>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className=" rounded-st mt-2 w-80 text-black py-2 px-4 focus:outline-none"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className=" rounded-st mt-2 w-80 text-black py-2 px-4 focus:outline-none"
            />
            <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm password"
                className=" rounded-st mt-2 w-80 text-black py-2 px-4 focus:outline-none"
            />
            <p className="w-80 text-red-600 mt-2 text-center">{error}</p>
            <button
                type="submit"
                className="btn mt-2 relative focus:outline-none bg-pink hover:bg-cremeDark w-full rounded-st"
            >
                Register
                <div className="absolute right-4 top-1/2 centerY">
                    <HiArrowRight size="20px" />
                </div>
            </button>
        </form>
    );
};

export default Register;
