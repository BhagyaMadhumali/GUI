const db = require("./db"); 

const storeMessage = (name, email, message) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    db.query(query, [name, email, message], (err, result) => {
      if (err) {
        reject("Error inserting message into database");
      } else {
        resolve(result);
      }
    });
  });
};


const handleContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await storeMessage(name, email, message);
    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = { handleContactMessage };
