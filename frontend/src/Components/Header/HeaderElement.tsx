import React from "react";
import { Link } from "react-router-dom";

type Props = {
    text: string;
    link: string;
    curPage: string;
};

const HeaderElement: React.FC<Props> = ({ text, link, curPage }) => {
    return (
        <Link
            to={link}
            className={`btn rounded-st ${curPage === link ? "bg-creme" : ""}`}
        >
            {text}
        </Link>
    );
};

export default HeaderElement;
