import * as dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from 'openai';

// Add your OPENAI API key directly here or in a .env file
const openai = new OpenAI({apiKey: process.env.OPENAI});

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/image-generator', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const aiResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: '1024x1024',
        });

        const image = aiResponse.data[0].url;
        res.send({ image });
    } catch (error) {
        console.error(error)
        res.status(500).send('You cannot generate an image with those words');
      }
});

app.listen(8080, () => console.log('make art on http://localhost:8080/image-generator'));