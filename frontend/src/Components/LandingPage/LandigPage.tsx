import React from "react";
import Illustration from "../../img/giftIllustration.png";
import { Link } from "react-router-dom";

const LandigPage: React.FC = () => {
    return (
        <main className="m-auto w-1/9 max-w-1400 flex gap-20 flex-1 pb-16 items-center">
            <div className="text-white w-full md:w-1/2 flex flex-col gap-8">
                <h3 className="text-lightWhite text-xl">
                    Don't dissappoint your friends again
                </h3>
                <h1 className="text-6xl font-medium">
                    Never Forget A Birthday Again
                </h1>
                <h2 className="text-lightWhite text-2xl">
                    BRem is a free Service to help you remembering the birthdays
                    of your friends
                </h2>
                <Link
                    to="/register"
                    className="btn bg-pink text-black rounded-st w-max text-xl mb-20"
                >
                    Register for Free
                </Link>
            </div>
            <div className="w-1/2 hidden md:block">
                <img
                    src={Illustration}
                    alt="Gift Illustration"
                    className="w-full"
                />
            </div>
        </main>
    );
};

export default LandigPage;
