const express = require("express");
const cors = require("cors");
const repoContext = require("./repository/repository-wrapper");
const app = express();
const songValidate = require("./middleware/song-validation");
const songLogger = require("./middleware/song-logger");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Endpoints
// URL: http:/localhost:5005/api/music
app.get("/api/music", (req, res) => {
    console.log(req.headers);
    const songs = repoContext.songs.findAllSongs();
    return res.send(songs);
})

// URL: http:/localhost:5005/api/music/:id
app.get("/api/music/:id", (req, res) => {
    const id = req.params.id;
    const song = repoContext.songs.findSongById(id);
    return res.send(song);
})

// URL: http:/localhost:5005/api/music
app.post("/api/music",[songLogger,songValidate], (req,res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    console.log(req)
    return res.status(201).send(addedSong);
})

// URL: http:/localhost:5005/api/music/:id
app.put("/api/music/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const songPropertiesToModify = req.body;
    const songToUpdate = repoContext.songs.updateSong(id, songPropertiesToModify);
    return  res.send(songToUpdate);
})

// URL: http:/localhost:5005/api/music/:id
app.delete("/api/music/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const deletedSong = repoContext.songs.deleteSong(id);
    return res.send(deletedSong);
})

// Starting a server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server running! On PORT: ${PORT}`);
});


