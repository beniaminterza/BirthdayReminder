import React, { Dispatch, SetStateAction, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import "react-notifications-component/dist/theme.css";

type Props = {
    setSeeAdd: Dispatch<SetStateAction<boolean>>;
    username: string;
    setPage: Dispatch<SetStateAction<number>>;
    setReload: Dispatch<SetStateAction<boolean>>;
};

const Add: React.FC<Props> = ({ setSeeAdd, username, setPage, setReload }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [error, setError] = useState("");

    function postBirthday(event: React.FormEvent<EventTarget>) {
        event.preventDefault();

        if (!/\S/.test(firstName)) {
            setError("Please enter the first name");
            return;
        } else if (!/\S/.test(lastName)) {
            setError("Please enter the last name");
            return;
        } else if (birthday === "") {
            setError("Please enter the birthday");
            return;
        }

        axios
            .post("http://localhost:4000/birthday", {
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                username: username,
            })
            .then((res) => {
                console.log(res.data);
                setReload((prev) => !prev);
                setPage(0);
                setSeeAdd(false);
            });
    }

    return (
        <form
            onSubmit={postBirthday}
            className="rounded-st flex flex-col fixed z-10 top-1/2 left-1/2 backgroundGlass3 p-10 centerXY"
        >
            <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => {
                    setSeeAdd(false);
                }}
            >
                <ImCross color="red" />
            </div>
            <h2 className="text-4xl font-medium text-center mb-10">
                Add a Birthday
            </h2>
            <p>First name</p>
            <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="First name"
                className=" rounded-st mt-2 w-80 text-black py-2 px-4 focus:outline-none"
            ></input>
            <p className="mt-4">Last name</p>
            <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder="Last name"
                className=" rounded-st mt-2 w-80 text-black py-2 px-4 focus:outline-none"
            ></input>
            <p className="mt-4">Birthday</p>
            <input
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday}
                type="date"
                className=" rounded-st mt-2 w-80 text-black py-2 px-4 focus:outline-none"
            ></input>
            <p className="w-full text-red-600 mt-4 text-center">{error}</p>
            <button
                type="submit"
                className="bg-pink text-dark mt-2 rounded-st py-3 hover:bg-cremeDark focus:outline-none"
            >
                Add
            </button>
        </form>
    );
};

export default Add;
