import React, { useState, useEffect } from "react";
import Birthday from "./Birthday";
import Add from "./Add";
import BlurBackground from "./BlurBackground";
import axios from "axios";

type Props = {
    username: string;
};

const Home: React.FC<Props> = ({ username }) => {
    const [seeAdd, setSeeAdd] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/birthday/${username}`).then((res) => {
            console.log(res);
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
                <p className="text-white text-xl mb-2">In 1 Day - 10.10.2021</p>
                <div className="grid grid-flow-col grid-cols-3 gap-8">
                    <Birthday
                        age={11}
                        birthday="10.10.2016"
                        name="Mathias brandlechner"
                    />
                </div>
            </div>
        </main>
    );
};

export default Home;
