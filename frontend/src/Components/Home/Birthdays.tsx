import React, {
    Dispatch,
    SetStateAction,
    useState,
    forwardRef,
    useEffect,
} from "react";
import Birthday from "./Birthday";
import moment from "moment";

type birthday = {
    Vorname: string;
    Nachname: string;
    Geburtstag: string;
    birthdayThisYear: string;
    birthdayNextYear: string;
    nextBirthday: string;
    age: number;
    daysLeft: number;
    PersonNr: number;
};

type Props = {
    birthdays: [birthday];
    setPage: Dispatch<SetStateAction<number>>;
    setReload: Dispatch<SetStateAction<boolean>>;
};

export type Ref = HTMLDivElement;

const Birthdays = forwardRef<Ref, Props>(
    ({ birthdays, setPage, setReload }, ref) => {
        useEffect(() => {
            var date = moment("2014-02-27T10:00:00").format("DD-MM");
            console.log(date + " vs " + moment(new Date()).format("DD-MM"));
        }, []);

        return (
            <div className="mb-8" ref={ref}>
                <p
                    className={`${
                        birthdays[0].daysLeft === 0
                            ? "text-pinkDark font-medium"
                            : "text-black"
                    } text-xl mb-4`}
                >
                    {birthdays[0].daysLeft === 0
                        ? "Today"
                        : `In ${birthdays[0].daysLeft} Day - ${moment(
                              birthdays[0].nextBirthday
                          ).format("DD.MM.YYYY")}`}
                </p>
                <div
                    className={`grid grid-flow-row ${
                        birthdays.length === 1
                            ? "grid-cols-1"
                            : birthdays.length === 2
                            ? "grid-cols-1 md:grid-cols-2 "
                            : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                    } gap-4`}
                >
                    {birthdays.map((element) => {
                        return (
                            <Birthday
                                age={
                                    moment(element.Geburtstag).format(
                                        "DD-MM"
                                    ) !== moment(new Date()).format("DD-MM")
                                        ? element.age + 1
                                        : element.age
                                }
                                birthday={moment(element.Geburtstag).format(
                                    "DD.MM.YYYY"
                                )}
                                name={`${element.Vorname} ${element.Nachname}`}
                                key={element.PersonNr}
                                id={element.PersonNr}
                                setPage={setPage}
                                setReload={setReload}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
);

export default Birthdays;
