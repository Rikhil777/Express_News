const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = process.env.NEWS_API_KEY; 


app.get("/api/news", async (req, res) => {
    try {
        const { category, q, country } = req.query; 
        const response = await axios.get(NEWS_API_URL, {
            params: {
                apiKey: API_KEY,
                country: country || "us", 
                category: category || undefined, 
                q: q || undefined, 
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error fetching news");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
