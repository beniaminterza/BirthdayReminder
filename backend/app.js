const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const pageElementsAmount = 10;

const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
    session({
        key: "userId",
        secret: process.env.secret,
        resave: "false",
        saveUninitialized: false,
        cookie: {
            secure: false, //true wenn https
            expires: 60 * 60 * 24 * 30,
        },
    })
);

console.log("Host " + process.env.DB_HOST);

var con = mysql.createConnection({
    host: "mysql_server",
    database: "brem",
    user: "benni",
    password: "secret",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/", (req, res) => {
    con.query("SELECT * FROM benutzer", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    res.send("Hello World!");
});

app.post("/birthday", (req, res) => {
    const { firstName, lastName, birthday, username } = req.body;

    con.query(
        "INSERT INTO person (Vorname, Nachname, Geburtstag, UsernameFK) SELECT ? as Vorname, ? as Nachname, ? as Geburtstag, benutzer.UserNr FROM benutzer WHERE benutzer.Username = ?",
        [firstName, lastName, birthday, username],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                return;
            } else {
                res.send(true);
            }
        }
    );
});

app.get("/birthday/:username/:page", (req, res) => {
    const { username, page } = req.params;
    console.log(page);
    con.query(
        "SELECT person.PersonNr,person.Vorname, person.Nachname, person.Geburtstag, person.Geburtstag + INTERVAL( YEAR(CURRENT_DATE) - YEAR(person.Geburtstag) ) YEAR AS birthdayThisYear, person.Geburtstag + INTERVAL( YEAR(CURRENT_DATE) - YEAR(person.Geburtstag) ) + 1 YEAR AS birthdayNextYear, CASE WHEN person.Geburtstag + INTERVAL( YEAR(CURRENT_DATE) - YEAR(person.Geburtstag) ) YEAR >= CURRENT_DATE THEN person.Geburtstag + INTERVAL( YEAR(CURRENT_DATE) - YEAR(person.Geburtstag) ) YEAR ELSE person.Geburtstag + INTERVAL( YEAR(CURRENT_DATE) - YEAR(person.Geburtstag)) + 1 YEAR END AS nextBirthday, TIMESTAMPDIFF( YEAR, person.Geburtstag, CURRENT_DATE ) AS age, CASE WHEN person.Geburtstag + INTERVAL( YEAR(CURRENT_DATE) - YEAR(person.Geburtstag) ) YEAR >= CURRENT_DATE THEN TIMESTAMPDIFF( DAY, CURRENT_DATE, person.Geburtstag + INTERVAL( YEAR(CURRENT_DATE) - YEAR(person.Geburtstag) ) YEAR ) ELSE TIMESTAMPDIFF( DAY, CURRENT_DATE, person.Geburtstag + INTERVAL( YEAR(CURRENT_DATE) - YEAR(person.Geburtstag) ) +1 YEAR ) END AS daysLeft FROM `person` JOIN benutzer ON benutzer.UserNr = person.UsernameFK WHERE benutzer.Username = ? ORDER BY CASE WHEN birthdayThisYear >= CURRENT_DATE THEN birthdayThisYear ELSE birthdayNextYear END LIMIT ? OFFSET ?",
        [username, pageElementsAmount, page * pageElementsAmount],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                return;
            } else {
                let isLastPage;
                if (result.length < pageElementsAmount) isLastPage = true;
                else isLastPage = false;
                res.send({ birthdays: result, isLastPage: isLastPage });
            }
        }
    );
});

app.delete("/birthday/:id", (req, res) => {
    const { id } = req.params;
    con.query(
        "DELETE FROM person WHERE person.PersonNr = ?",
        [id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                return;
            }
            res.send(true);
        }
    );
});

app.post("/register", (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        con.query(
            "INSERT INTO benutzer (Username, Password) SELECT * FROM (SELECT ? AS Username, ? AS Password) AS tmp WHERE NOT EXISTS (SELECT Username FROM benutzer WHERE Username = ?) LIMIT 1;",
            [username, hash, username],
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                } else {
                    if (
                        result &&
                        result.affectedRows &&
                        result.affectedRows > 0
                    ) {
                        req.session.user = [{ Username: username }];
                        res.send(username);
                    } else {
                        res.send({
                            message:
                                "This username already exists, use another one",
                        });
                    }
                }
            }
        );
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    con.query(
        "SELECT * FROM benutzer WHERE username = ? ",
        [username],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result && result.length > 0) {
                bcrypt.compare(
                    password,
                    result[0].Password,
                    (err, response) => {
                        if (response) {
                            req.session.user = result;
                            res.send(result);
                        } else {
                            res.send({ message: "The password is wrong" });
                        }
                    }
                );
            } else {
                res.send({ message: "Username doesn't exist" });
            }
        }
    );
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
        return;
    }
    res.send({ loggedIn: false });
});

app.delete("/login", (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
    });
    res.send("Destroyed");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
