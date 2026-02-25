const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* =========================
   DANH SÁCH VIDEO GÁI
   👉 THÊM LINK MP4 TRỰC TIẾP VÀO ĐÂY
========================= */

const videoGai = [
    "https://yourdomain.com/video1.mp4",
    "https://yourdomain.com/video2.mp4",
    "https://yourdomain.com/video3.mp4",
    "https://yourdomain.com/video4.mp4",
    "https://yourdomain.com/video5.mp4",
    "https://yourdomain.com/video6.mp4",
    "https://yourdomain.com/video7.mp4",
    "https://yourdomain.com/video8.mp4"
];

/* =========================
   HÀM RANDOM
========================= */

function randomVideo() {
    return videoGai[Math.floor(Math.random() * videoGai.length)];
}

/* =========================
   API RANDOM VIDEO
========================= */

app.get("/api/gai", (req, res) => {
    const video = randomVideo();

    res.json({
        status: true,
        total_video: videoGai.length,
        video_url: video,
        download_api: `/api/gai/download?url=${encodeURIComponent(video)}`
    });
});

/* =========================
   API DOWNLOAD VIDEO (CHO BOT)
========================= */

app.get("/api/gai/download", async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.json({
            status: false,
            message: "Thiếu link video"
        });
    }

    try {
        const response = await axios({
            method: "GET",
            url: url,
            responseType: "stream"
        });

        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Content-Disposition", "attachment; filename=video.mp4");

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
