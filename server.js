import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const ollamaEndpoint = '';
const apiKey = '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'; 

app.post('/chat', async (req, res) => {
    const userInput = req.body.message;
    try {
        const response = await fetch(ollamaEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ message: userInput }),
        });
        const data = await response.json();
        res.json({ message: data.message });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
