const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const WEATHERSTACK_API_KEY = process.env.ef8d2007ac0c5a46e2935238a798d5a7;

app.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).send({
            error: 'Please provide a city'
        });
    }

    try {
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: ef8d2007ac0c5a46e2935238a798d5a7,
                query: city
            }
        });

        if (response.data.error) {
            return res.status(400).send({ error: response.data.error.info });
        }

        const weatherData = response.data.current;
        res.send({
            location: response.data.location.name,
            temperature: weatherData.temperature,
            weather_descriptions: weatherData.weather_descriptions[0],
            humidity: weatherData.humidity,
            wind_speed: weatherData.wind_speed,
        });
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});