const db = require("./db"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;

    try {
        db.query("SELECT * FROM registerformdata WHERE email = ?", [email], async (err, users) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error" });
            }

            if (users.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const query = `INSERT INTO registerformdata (first_name, last_name, age, email, password) VALUES (?, ?, ?, ?, ?)`;
            db.query(query, [first_name, last_name, age, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Error saving user" });
                }
                res.status(201).json({ message: "User registered successfully" });
            });
        });
    } catch (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Error hashing password" });
    }
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM registerformdata WHERE email = ?", [email], (err, users) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const dbUser = users[0];

        bcrypt.compare(password, dbUser.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).json({ message: "Error comparing passwords" });
            }

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }

            const token = jwt.sign(
                { id: dbUser.id, email: dbUser.email },
                "yourjwtsecret",
                { expiresIn: "1h" }
            );

            res.status(200).json({ message: "Login successful", token });
        });
    });
};

module.exports = { registerUser, loginUser };
