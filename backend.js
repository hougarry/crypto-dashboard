const PORT = 4000;
const express = require('express')
const cors = require('cors')
const axios = require('axios')

require('dotenv').config()

const app = express()

// Apply the cors() middleware globally to all routes
app.use(cors());

app.get('/', (req, res) => {
    res.json('Hi, this is the crypto dashboard server backend--open /news to get the latest crypto news');
})

app.get('/convert', async (req, res) => {
    const fromcurrency = req.query.from_currency
    const tocurrency = req.query.to_currency

    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            from_currency: fromcurrency,
            function: 'CURRENCY_EXCHANGE_RATE',
            to_currency: tocurrency
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    }
    try {
        const response = await axios.request(options);
        res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch conversion rate" });
    }
})



app.get('/news', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://crypto-update-live.p.rapidapi.com/news',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'crypto-update-live.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options)
        const receivedArticles = response.data
        const limitedArticles = receivedArticles.slice(0, 12) // Limit to the first 12 articles
        res.json(limitedArticles)
    } catch (error) {
        console.error(error)
        if (error.response) {
            console.log(error.response.data)
        }
        res.json({ message: "Failed to fetch news" })
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
