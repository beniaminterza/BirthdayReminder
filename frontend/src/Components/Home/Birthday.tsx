import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";

type Props = {
    age: number;
    birthday: string;
    name: string;
    id: number;
    setPage: Dispatch<SetStateAction<number>>;
    setReload: Dispatch<SetStateAction<boolean>>;
};

const Birthday: React.FC<Props> = ({
    age,
    birthday,
    name,
    id,
    setPage,
    setReload,
}) => {
    function deleteHandler(): void {
        axios.delete(`http://localhost:4000/birthday/${id}`);
        setPage(0);
        setReload((prev) => !prev);
    }
    return (
        <div className="w-full backgroundGlass4 birthday text-black rounded-st flex gap-2 deleteParent">
            <div className="bg-pink rounded-st left-0 top-0 h-full p-8 text-center">
                <h1 className="text-5xl font-medium">{age}</h1>
                <p>years old</p>
            </div>
            <div className="p-4 relative">
                <p className="font-medium text-xl">{name}</p>
                <p className="mt-2">{birthday}</p>
            </div>
            <div
                onClick={deleteHandler}
                className="absolute top-4 right-4 cursor-pointer delete hidden"
            >
                <RiDeleteBin7Fill color="black" />
            </div>
        </div>
    );
};

export default Birthday;
