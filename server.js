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
"https://image2url.com/r2/default/videos/1772020463287-0ea2b389-cdec-4797-8de4-4f85d42b21f2.mp4",
"https://image2url.com/r2/default/videos/1772020494654-75e4cbac-21b8-4d4f-94d8-34f7c6502122.mp4",
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
"https://image2url.com/r2/default/videos/1772015664504-6d84c350-2f43-4a09-97c3-0d5b126cd49f.mp4",
"https://image2url.com/r2/default/videos/1772019286892-41d8ff18-ca49-47bc-be8c-1b3eba4c8b05.mp4",
"https://image2url.com/r2/default/videos/1772019391526-5930e0c5-c054-4dc4-b6ad-b91b160cd1be.mp4",
"https://image2url.com/r2/default/videos/1772019410867-e782ae3a-6312-4a8a-a614-44c21d5d516e.mp4",
"https://image2url.com/r2/default/videos/1772019447386-fa545b79-399e-491f-a8e4-457454d81b7e.mp4",
"https://image2url.com/r2/default/videos/1772019469086-e67ee9a9-5d08-457b-8063-adceeac3f0ab.mp4",
"https://image2url.com/r2/default/videos/1772019491104-514630e0-fd23-4983-9574-d1a600173998.mp4",
"https://image2url.com/r2/default/videos/1772019537085-132db6b4-21c6-4016-9d61-3e78a524a573.mp4",
"https://image2url.com/r2/default/videos/1772019553530-95acd388-1d06-4f6a-b08e-d59765bee3f1.mp4",
"https://image2url.com/r2/default/videos/1772019570784-5ad9e547-cdca-448f-bca0-ae79451a2029.mp4",
"https://image2url.com/r2/default/videos/1772019588853-c3c33b79-4f6e-40ee-a6f0-42592fef3b28.mp4",
"https://image2url.com/r2/default/videos/1772019605533-f85120f5-7cf0-401e-8ce8-caf006e5b93e.mp4",
"https://image2url.com/r2/default/videos/1772019621150-65d7bc96-df92-41d9-b320-f4c039b6ab59.mp4",
"https://image2url.com/r2/default/videos/1772032852415-4fbcdfd6-86b4-486d-bf3a-a239440a8a18.mp4",
"https://image2url.com/r2/default/videos/1772032887878-1cafe1c7-301b-41b0-a81c-0500f6ec35b7.mp4",
"https://image2url.com/r2/default/videos/1772032923232-b36a6469-ffea-41f8-b215-ac345d64043a.mp4",
"https://image2url.com/r2/default/videos/1772032948943-3b8039ae-fba3-4036-a4d8-982490c9edd9.mp4",
"https://image2url.com/r2/default/videos/1772032983001-b06658c0-ade3-4e87-80b1-51e657a22c01.mp4",
"https://image2url.com/r2/default/videos/1772033003468-43521440-9c13-4b2e-ac41-4e0ed3cb3029.mp4",
"https://image2url.com/r2/default/videos/1772033032384-be2b67ae-6c30-4b8c-8043-b9f20143efc6.mp4",
"https://image2url.com/r2/default/videos/1772033238128-34456eb5-7bf2-442f-bd4b-573d8b4f9322.mp4"
];

/* =========================
   BIẾN XOAY VÒNG
========================= */

let currentIndex = 0;

function getNextVideo() {
    if (videoGai.length === 0) return null;

    const video = videoGai[currentIndex];

    currentIndex++;

    if (currentIndex >= videoGai.length) {
        currentIndex = 0; // quay lại đầu
    }

    console.log("Index hiện tại:", currentIndex);

    return video;
}

/* =========================
   API LẤY LINK
========================= */

app.get("/api/gai", (req, res) => {

    if (videoGai.length === 0) {
        return res.json({
            status: false,
            message: "Danh sách video rỗng",
            total_video: 0
        });
    }

    const video = getNextVideo();

    res.json({
        status: true,
        author: "API BY DUYBAO",
        total_video: videoGai.length,
        video_url: video
    });
});

/* =========================
   API DOWNLOAD
========================= */

app.get("/api/gai/download", async (req, res) => {

    if (videoGai.length === 0) {
        return res.status(500).json({
            status: false,
            message: "Danh sách video rỗng"
        });
    }

    const video = getNextVideo();

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
    console.log("Server chạy tại port", PORT);
    console.log("Tổng video:", videoGai.length);
});
