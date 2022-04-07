const express = require("express");
const cors = require("cors");
const repoContext = require("./repository/repository-wrapper");
const songValidate = require("./middleware/song-validation");
const songLogger = require("./middleware/song-logger");
const app = express();


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



// Endpoints
app.get("/api/music", (req, res) => {
    console.log(req.headers);
    const songs = repoContext.songs.findAllSongs();
    return res.send(songs);
})

app.get("/api/music/:id", (req, res) => {
    const id = req.params.id;
    const song = repoContext.songs.findSongById(id);
    return res.send(song);
})

app.post("/api/music",[songLogger,songValidate], (req,res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    return res.status(201).send(addedSong);
})

app.put("/api/music/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const songPropertiesToModify = req.body;
    const songToUpdate = repoContext.songs.updateSong(id, songPropertiesToModify);
    return  res.send(songToUpdate);
})

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


