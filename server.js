const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* =========================
   TRANG CHỦ
========================= */

app.get("/", (req, res) => {
    res.send("<h1>🔥 API by Duy Bảo 🔥</h1>");
});

/* =========================
   DANH SÁCH VIDEO
========================= */

const videoGai = [
    // toàn bộ list của bạn giữ nguyên ở đây
];

/* =========================
   RANDOM KHÔNG TRÙNG
========================= */

let lastIndex = -1;

function randomVideo() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * videoGai.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;

    console.log("Random index:", randomIndex);

    return videoGai[randomIndex];
}

/* =========================
   API RANDOM
========================= */

app.get("/api/gai", (req, res) => {
    const video = randomVideo();

    res.json({
        status: true,
        author: "API BY Duy Bảo",
        total_video: videoGai.length,
        video_url: video
    });
});

/* =========================
   DOWNLOAD RANDOM
========================= */

app.get("/api/gai/download", async (req, res) => {
    const video = randomVideo();

    try {
        const response = await axios({
            method: "GET",
            url: video,
            responseType: "stream"
        });

        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Content-Disposition", "attachment; filename=random.mp4");

        response.data.pipe(res);

    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Không tải được video"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server chạy tại port ${PORT}`);
});
