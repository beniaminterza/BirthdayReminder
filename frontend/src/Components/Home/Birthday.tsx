import React from "react";

type Props = {
    age: number;
    birthday: string;
    name: string;
};

const Birthday: React.FC<Props> = ({ age, birthday, name }) => {
    return (
        <div className="w-full backgroundGlass text-black rounded-st flex gap-2">
            <div className="bg-pink rounded-st left-0 top-0 h-full p-8 text-center">
                <h1 className="text-5xl font-medium">{age}</h1>
                <p>years old</p>
            </div>
            <div className="p-4">
                <p className="font-medium text-xl">{name}</p>
                <p className="mt-2">{birthday}</p>
            </div>
        </div>
    );
};

export default Birthday;
