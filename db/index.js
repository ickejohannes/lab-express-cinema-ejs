// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
// const Movie = require('./models/Movie.model');

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-cinema";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


/* async function getMovies() {
  try {
    const x = await mongoose.connect(MONGODB_URI);
    
    console.log(`connected to the database: ${x.connection.name}`)
    await Movie.
    await mongoose.disconnect(MONGODB_URI);
  } catch (error){
    console.log(error);
  }
} */