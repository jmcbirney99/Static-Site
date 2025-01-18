const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize AI clients
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Recommendation Engine endpoint
app.post('/api/recommend', async (req, res) => {
    try {
        const { currentPost, userInterests } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [
                {
                    role: "system",
                    content: "You are a content recommendation system. Based on the current post and user interests, suggest related content."
                },
                {
                    role: "user",
                    content: `Current post: ${currentPost}\nUser interests: ${userInterests}\nSuggest related content.`
                }
            ]
        });

        res.json({ recommendations: completion.choices[0].message.content });
    } catch (error) {
        console.error('Recommendation error:', error);
        res.status(500).json({ error: 'Failed to generate recommendations' });
    }
});

// AI Writing Assistant endpoint
app.post('/api/writing-assist', async (req, res) => {
    try {
        const { content, task } = req.body;
        
        const message = await anthropic.messages.create({
            model: 'claude-3-opus-20240229',
            max_tokens: 1000,
            messages: [{
                role: 'user',
                content: `Task: ${task}\nContent: ${content}\nPlease help improve this content.`
            }]
        });

        res.json({ suggestions: message.content[0].text });
    } catch (error) {
        console.error('Writing assistance error:', error);
        res.status(500).json({ error: 'Failed to generate writing suggestions' });
    }
});

// Content Distribution endpoint
app.post('/api/distribute', async (req, res) => {
    try {
        const { content, platforms } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [
                {
                    role: "system",
                    content: "You are a social media content optimizer. Adapt the given content for different platforms."
                },
                {
                    role: "user",
                    content: `Content: ${content}\nPlatforms: ${platforms.join(', ')}\nCreate optimized versions for each platform.`
                }
            ]
        });

        res.json({ adaptedContent: completion.choices[0].message.content });
    } catch (error) {
        console.error('Distribution error:', error);
        res.status(500).json({ error: 'Failed to adapt content for distribution' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
}); 