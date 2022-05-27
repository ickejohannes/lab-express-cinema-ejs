// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config')

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app)

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-cinema";
const Movie = require("./models/Movie.model");
const mongoose = require("mongoose");

// default value for title local
const projectName = 'lab-express-cinema'
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase()

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`

// 👇 Start handling routes here
const index = require('./routes/index')
const movies = require("./routes/movies")

app.get("/movies", async (req, res) => {
    console.log(`running app.get("/movies")`)
    const moviesFromDB = await getMovies();
    let data = { movies: moviesFromDB };
    res.render("movies", data);
});
  
app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const movieFromDB = await getMovieById(id);
    console.log(movieFromDB);
    let data = { movie: movieFromDB };
    res.render("oneMovie", data)
  });


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app



async function getMovies() {
    try {
        const y = await Movie.find();
        return y;
    } catch (error){
    console.log(error);
    }
}

async function getMovieById(id) {
    try {
        const z = await Movie.findById(id);
        return z
    } catch (error) {
        console.log(error);
    }
}

// getMovies();