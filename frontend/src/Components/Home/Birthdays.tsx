import React, { useEffect } from "react";
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
};

type Props = {
    birthdays: [birthday];
};

const Birthdays: React.FC<Props> = ({ birthdays }) => {
    useEffect(() => {
        var date = moment("2014-02-27T10:00:00").format("DD-MM");
        console.log(date + " vs " + moment(new Date()).format("DD-MM"));
    }, []);

    return (
        <div className="mb-4">
            <p className="text-white text-xl mb-2">
                In {birthdays[0].daysLeft} Day -{" "}
                {moment(birthdays[0].nextBirthday).format("DD.MM.YYYY")}
            </p>
            <div className="grid grid-flow-col grid-cols-3 gap-8">
                {birthdays.map((element) => {
                    return (
                        <Birthday
                            age={
                                moment(element.Geburtstag).format("DD-MM") !==
                                moment(new Date()).format("DD-MM")
                                    ? element.age + 1
                                    : element.age
                            }
                            birthday={moment(element.Geburtstag).format(
                                "DD.MM.YYYY"
                            )}
                            name={`${element.Vorname} ${element.Nachname}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Birthdays;
