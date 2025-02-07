const express = require("express");
const WebSocket = require("ws");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

let visitors = [];
const visitorFile = "./user.json";

// Load existing visitor data
if (fs.existsSync(visitorFile)) {
    visitors = JSON.parse(fs.readFileSync(visitorFile, "utf8"));
}

// Function to broadcast visitor count to all WebSocket clients
const broadcastVisitorCount = () => {
    const count = visitors.length;
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ visitors: count }));
        }
    });
};

// WebSocket setup
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ visitors: visitors.length }));
});

// Track real visitors
app.post("/track", (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).send("Missing userId");
    }

    // Add new visitor if not already tracked
    if (!visitors.some((user) => user.userId === userId)) {
        visitors.push({ userId, timestamp: new Date() });
        fs.writeFileSync(visitorFile, JSON.stringify(visitors, null, 2));
        broadcastVisitorCount(); // Notify all clients
    }

    res.sendStatus(200);
});

// Function to add fake visitors
const addFakeVisitor = () => {
    visitors.push({ userId: null, timestamp: new Date(), fake: true }); // Flag as fake
    fs.writeFileSync(visitorFile, JSON.stringify(visitors, null, 2));
    broadcastVisitorCount(); // Notify all clients
};

// Add a fake visitor every 1 minute
setInterval(addFakeVisitor, 60 * 1000); // 60 seconds