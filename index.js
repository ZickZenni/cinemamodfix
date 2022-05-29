const express = require("express");
const app = express();
const ytdl = require("ytdl-core");

app.get('/info' , async (req, res) => {
    console.log(req.query.url);
    if (req.query.url == undefined || !ytdl.validateURL(req.query.url)) {
        return res.sendStatus(404);
    }
    const v_id = req.query.url.split('v=')[1];
    if (!ytdl.validateID(v_id)) {
        return res.sendStatus(404);
    }
    const info = await ytdl.getInfo(req.query.url);
    const data = { formats: info.formats, title: info.player_response.videoDetails.title }
    res.send(data).status(200);
});

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});