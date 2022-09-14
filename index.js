const express = require("express");
const app = express();
const ytdl = require("ytdl-core");

app.get('/info' , async (req, res) => {
    if (req.query.url == undefined || !ytdl.validateURL(req.query.url)) {
        return res.sendStatus(404);
    }
    const data = await getYouTubeData(req.query.url);
    if (data == undefined) {
        return res.sendStatus(404);
    }
    res.send(data).status(200);
});

app.get("/redirect", async (req, res) => {
    if (req.query.url == undefined || !ytdl.validateURL(req.query.url)) {
        return res.sendStatus(404);
    }
    const data = await getYouTubeData(req.query.url);
    if (data == undefined) {
        return res.sendStatus(404);
    }

    const format = ytdl.chooseFormat(data.formats, { quality: "highest", filter: format => format.container === 'mp4' });
    if (format == undefined) {
        return res.sendStatus(404);
    }

    res.redirect(format.url);
});

app.listen(5000, () => {
	console.log("Server is running on http://localhost:3000");
});

async function getYouTubeData(url) {
    const v_id = .url.split('v=')[1];
    if (!ytdl.validateID(v_id)) {
        return undefined;
    }
    const info = await ytdl.getInfo(req.query.url);
    const data = { formats: info.formats, title: info.player_response.videoDetails.title }
    return data;
}

module.exports = app;
