import React, { useState, useEffect } from "react";
import Birthdays from "./Birthdays";
import Add from "./Add";
import BlurBackground from "./BlurBackground";
import axios from "axios";

type Props = {
    username: string;
};

type birthday = {
    Vorname: string;
    Nachname: string;
    Geburtstag: string;
    birthdayThisYear: string;
    birthdayNextYear: string;
    nextBirthday: string;
    age: number;
    daysLeft: number;
};

const Home: React.FC<Props> = ({ username }) => {
    const [seeAdd, setSeeAdd] = useState(false);
    const [birthdays, setBirthdays] = useState(Array());

    useEffect(() => {
        let array: birthday[][];
        axios.get(`http://localhost:4000/birthday/${username}`).then((res) => {
            let j = 0;
            array = [];
            for (let i = 0; i < res.data.length; i++) {
                if (
                    i > 0 &&
                    res.data[i].daysLeft === res.data[i - 1].daysLeft
                ) {
                    console.log("if");
                    array[j - 1].push(res.data[i]);
                } else {
                    console.log("else");
                    array[j] = [];
                    array[j].push(res.data[i]);
                    j += 1;
                }
            }
            console.log(array);
            setBirthdays(array);
        });
    }, []);

    return (
        <main className="mx-auto mt-10 w-1/9 max-w-1400 flex flex-col gap-8 pb-16">
            {seeAdd ? <BlurBackground /> : null}
            <div className="flex justify-between w-full">
                <h2 className="text-white text-4xl">Next Birthdays</h2>
                <button
                    className="btn rounded-st bg-pink focus:outline-none"
                    onClick={() => setSeeAdd(true)}
                >
                    Add Birthday
                </button>
                {seeAdd ? (
                    <Add username={username} setSeeAdd={setSeeAdd} />
                ) : null}
            </div>
            <div>
                {birthdays.map((element) => {
                    return (
                        <Birthdays
                            birthdays={element}
                            key={element[0].PersonNr}
                        />
                    );
                })}
            </div>
        </main>
    );
};

export default Home;
