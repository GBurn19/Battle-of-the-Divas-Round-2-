const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Load tickets from tickets.json
const ticketsFile = './tickets.json';
let ticketsData = JSON.parse(fs.readFileSync(ticketsFile, 'utf8'));

// Endpoint to get tickets left
app.get('/tickets-left', (req, res) => {
    res.json({ ticketsLeft: ticketsData.ticketsLeft });
});

// Endpoint to claim a ticket
app.post('/claim-ticket', (req, res) => {
    if (ticketsData.ticketsLeft > 0) {
        ticketsData.ticketsLeft -= 1;
        fs.writeFileSync(ticketsFile, JSON.stringify(ticketsData, null, 2));
        res.json({ success: true, message: "Ticket claimed successfully!" });
    } else {
        res.status(400).json({ success: false, message: "No tickets left." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
