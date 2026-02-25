const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* =========================
   DANH SÁCH VIDEO
========================= */

const videoGai = [
    "https://image2url.com/r2/default/videos/1772015321565-b0b63bcb-1407-487b-82a9-8c12ffea74c7.mp4",
    "https://image2url.com/r2/default/videos/1772015449414-c46875a0-d461-4c0d-91dd-29b4d9174287.mp4",
    "https://image2url.com/r2/default/videos/1772015477160-793aa9d8-e639-407b-939d-6de5bd71b594.mp4",
    "https://image2url.com/r2/default/videos/1772015497060-077a393f-1c43-43af-918e-1458e7d57140.mp4",
    "https://image2url.com/r2/default/videos/1772015520494-1927384e-efca-4e17-9238-6b510a73aeb4.mp4",
    "https://image2url.com/r2/default/videos/1772015541585-326a744d-f1e3-4116-bacb-fc732da00c39.mp4",
    "https://image2url.com/r2/default/videos/1772015561396-4adc5dca-e7eb-4198-ac5c-57c81440e407.mp4",
    "https://image2url.com/r2/default/videos/1772015581843-0246e54f-9d4f-482e-b418-f36b9f1df567.mp4",
    "https://image2url.com/r2/default/videos/1772015622280-9c6f2166-190f-4fe1-a440-8aed33628140.mp4",
    "https://image2url.com/r2/default/videos/1772015644220-de4bc53c-bf1d-4bac-890b-4c50096f672a.mp4",
    "https://image2url.com/r2/default/videos/1772015664504-6d84c350-2f43-4a09-97c3-0d5b126cd49f.mp4"
];

/* =========================
   RANDOM FUNCTION
========================= */

function randomVideo() {
    return videoGai[Math.floor(Math.random() * videoGai.length)];
}

/* =========================
   API LẤY LINK RANDOM
========================= */

app.get("/api/gai", (req, res) => {
    const video = randomVideo();

    res.json({
        status: true,
        total_video: videoGai.length,
        video_url: video
    });
});

/* =========================
   API DOWNLOAD RANDOM LUÔN
========================= */

app.get("/api/gai/download", async (req, res) => {
    const video = randomVideo(); // 🔥 tự random luôn

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
