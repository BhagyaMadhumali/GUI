const db = require("./db"); 
const jwt = require("jsonwebtoken");

const adminLogin = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const adminUser = results[0];

        if (password !== adminUser.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: adminUser.id, username: adminUser.username }, "yourjwtsecret", { expiresIn: "2h" });

        res.status(200).json({ message: "Admin login successful", token });
    });
};

module.exports = { adminLogin };
