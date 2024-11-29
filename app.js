const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public')); // This line allows serving static files like CSS

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Define the GET route
app.get('/', async (req, res) => {
    const city = req.query.city || 'Mumbai';  // Default city if no city is provided

    try {
        // Fetch data from OpenWeatherMap API
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: 'e8e71ecf342c21d133fc396cefffac6b',
                units: 'metric'        // Display temperature in Celsius
            }
        });

        const weatherData = response.data;

        // Render the index.ejs template with weather data
        res.render('index', { 
            city: city, 
            weather: weatherData 
        });

    } catch (error) {
        console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
        res.status(500).send('An error occurred while fetching the weather data.');
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
