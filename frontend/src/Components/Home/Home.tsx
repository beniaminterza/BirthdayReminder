import React, { useState, useEffect, useRef, useCallback } from "react";
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
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadMore, setLoadMore] = useState(true);
    const [reload, setReload] = useState(false);

    const observer = useRef<any>(null);

    const lastElementRef = useCallback(
        (node) => {
            console.log("Callback");
            if (loading) return;
            if (observer.current) {
                observer.current.disconnect();
                console.log("Observer disconnecting");
            }
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && loadMore) {
                    console.log("visible");
                    setPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading]
    );

    useEffect(() => {
        setLoading(true);
        let array: birthday[][];
        axios
            .get(`http://localhost:4000/birthday/${username}/${page}`)
            .then((res) => {
                if (res.data.isLastPage) {
                    setLoadMore(false);
                }
                let j = 0;
                console.log(res.data.birthdays);

                if (page > 0) {
                    array = [...birthdays];
                    if (array.length > 0) {
                        j = array.length;
                    }
                } else {
                    array = [];
                }

                for (let i = 0; i < res.data.birthdays.length; i++) {
                    if (
                        array.length > 0 &&
                        res.data.birthdays[i].daysLeft ===
                            array[array.length - 1][0].daysLeft
                    ) {
                        array[j - 1].push(res.data.birthdays[i]);
                    } else {
                        array[j] = [];
                        array[j].push(res.data.birthdays[i]);
                        j += 1;
                    }
                }
                setBirthdays(array);
                setLoading(false);
            });
    }, [page, reload]);

    return (
        <main className="mx-auto mt-10 w-1/9 max-w-1400 flex flex-col gap-8 pb-16">
            {seeAdd ? <BlurBackground /> : null}
            <div className="flex flex-col gap-4 sm:flex-row justify-between w-full">
                <h2 className="text-black text-4xl">Next Birthdays</h2>
                <button
                    className="btn rounded-st bg-pink focus:outline-none"
                    onClick={() => setSeeAdd(true)}
                >
                    Add Birthday
                </button>
                {seeAdd ? (
                    <Add
                        username={username}
                        setSeeAdd={setSeeAdd}
                        setPage={setPage}
                        setReload={setReload}
                    />
                ) : null}
            </div>
            <div>
                {birthdays.map((element, index) => {
                    if (birthdays.length === index + 1) {
                        return (
                            <Birthdays
                                ref={lastElementRef}
                                birthdays={element}
                                key={element[0].PersonNr}
                                setPage={setPage}
                                setReload={setReload}
                            />
                        );
                    }
                    return (
                        <Birthdays
                            birthdays={element}
                            key={element[0].PersonNr}
                            setPage={setPage}
                            setReload={setReload}
                        />
                    );
                })}
            </div>
        </main>
    );
};

export default Home;
