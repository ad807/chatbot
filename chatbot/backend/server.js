import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateResponse } from './chatbot.js';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

app.post('/chat', async (req, res) => {
    const { text } = req.body;
    console.log(text);
    const response =await generateResponse(text);
    res.json({ message: response });
});