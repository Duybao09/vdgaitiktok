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
    res.send(`
        <h1>🔥 API by Duy Bảo 🔥</h1>
        <p>Endpoints:</p>
        <ul>
            <li>/api/gai</li>
            <li>/api/gai/download</li>
        </ul>
    `);
});

/* =========================
   DANH SÁCH VIDEO
========================= */

const videoGai = [
    // giữ nguyên list của bạn ở đây (25 link)
];

/* =========================
   RANDOM FUNCTION
========================= */

function randomVideo() {
    if (videoGai.length === 0) return null;

    const index = Math.floor(Math.random() * videoGai.length);
    console.log("Random index:", index);

    return videoGai[index];
}

/* =========================
   API LẤY LINK RANDOM
========================= */

app.get("/api/gai", (req, res) => {
    if (videoGai.length === 0) {
        return res.json({
            status: false,
            message: "Danh sách video đang rỗng",
            total_video: 0
        });
    }

    const video = randomVideo();

    res.json({
        status: true,
        author: "API BY Duy Bảo",
        total_video: videoGai.length,
        video_url: video
    });
});

/* =========================
   API DOWNLOAD RANDOM
========================= */

app.get("/api/gai/download", async (req, res) => {
    if (videoGai.length === 0) {
        return res.status(500).json({
            status: false,
            message: "Danh sách video đang rỗng"
        });
    }

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
        console.error("Download error:", err.message);

        res.status(500).json({
            status: false,
            message: "Không tải được video"
        });
    }
});

app.listen(PORT, () => {
    console.log("=================================");
    console.log("Server chạy tại port:", PORT);
    console.log("Tổng số video:", videoGai.length);
    console.log("=================================");
});
