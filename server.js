const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 ĐỔI API KEY Ở ĐÂY (1 CHỖ DUY NHẤT)
const API_KEY = process.env.API_KEY || "duybao095";

app.use(cors());
app.use(express.json());

/* =========================
   TRANG CHỦ (KHÔNG LỘ KEY)
========================= */

app.get("/", (req, res) => {
    res.send("API by Duy Bảo");
});

/* =========================
   DANH SÁCH VIDEO
========================= */

const videoGai = [
"https://image2url.com/r2/default/videos/1772093964438-d6c982b6-aee9-4e00-9d85-fa3a8159a899.mp4",
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
"https://image2url.com/r2/default/videos/1772033238128-34456eb5-7bf2-442f-bd4b-573d8b4f9322.mp4",
"https://image2url.com/r2/default/videos/1772093907763-1b6d60d8-a2f5-438b-b783-caaa77fd1783.mp4",
"https://image2url.com/r2/default/videos/1772094026944-8ed06c1f-92d2-49e2-b13b-4aed3e8ec19f.mp4",
"https://image2url.com/r2/default/videos/1772094040804-f82aebfe-ecd1-4da0-94a4-ac5f2bf06ab6.mp4",
"https://image2url.com/r2/default/videos/1772094063775-c202013d-75f3-4759-9489-6d107a976b77.mp4",
"https://image2url.com/r2/default/videos/1772094080230-a495aaff-ddbc-43bf-9681-c5dcf2ddcec8.mp4",
"https://image2url.com/r2/default/videos/1772094102124-54112629-38dd-46fd-9c86-97d85d0aa6a6.mp4",
"https://image2url.com/r2/default/videos/1772094129346-5312ae60-948a-4049-a2aa-a2e8a29c0534.mp4",
"https://image2url.com/r2/default/videos/1772094255665-361e96fb-b289-4fa6-bd82-f1d5f3a34a83.mp4",
"https://image2url.com/r2/default/videos/1772094274024-d0fa7a13-dd68-441a-ad8b-ecc2a3ea332e.mp4",
"https://image2url.com/r2/default/videos/1772094299952-27f8c331-e690-4ddb-bb67-3d7e4283647a.mp4",
"https://image2url.com/r2/default/videos/1772094321550-931bbc59-54f3-49c0-8bb1-184be27d3532.mp4",
"https://image2url.com/r2/default/videos/1772094321550-931bbc59-54f3-49c0-8bb1-184be27d3532.mp4",
"https://image2url.com/r2/default/videos/1772094387353-9f9ff374-7404-4798-9da3-b0da122952e5.mp4",
"https://image2url.com/r2/default/videos/1772094410274-5a7a65b9-1077-4d09-b331-69a9f77a094f.mp4",
"https://image2url.com/r2/default/videos/1772094429976-828aa961-3829-4af4-aff9-60ac6acbe628.mp4",
"https://image2url.com/r2/default/videos/1772094441216-9477b72f-ca50-4047-8e9c-4a3c8352524a.mp4",
"https://image2url.com/r2/default/videos/1772094455155-002d9303-e4bb-469a-8179-23743bbd7eb2.mp4"
];

/* =========================
   XOAY VÒNG VIDEO
========================= */

let currentIndex = 0;

function getNextVideo() {
    if (videoGai.length === 0) return null;

    const video = videoGai[currentIndex];

    currentIndex++;
    if (currentIndex >= videoGai.length) {
        currentIndex = 0;
    }

    return video;
}

/* =========================
   API LẤY VIDEO (CÓ KEY)
========================= */

app.get("/api/gai", (req, res) => {

    const { apikey } = req.query;

    // ❌ Thiếu key
    if (!apikey) {
        return res.status(401).json({
            api: "API by Duy Bảo",
            status: false,
            message: "Thiếu API Key"
        });
    }

    // ❌ Sai key
    if (apikey !== API_KEY) {
        return res.status(403).json({
            api: "API by Duy Bảo",
            status: false,
            message: "API Key không hợp lệ"
        });
    }

    // ❌ Không có video
    if (videoGai.length === 0) {
        return res.json({
            api: "API by Duy Bảo",
            status: false,
            message: "Danh sách video rỗng"
        });
    }

    const video = getNextVideo();

    res.json({
        api: "API by Duy Bảo",
        status: true,
        total_video: videoGai.length,
        video_url: video
    });
});

/* ========================= */

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server chạy tại port " + PORT);
});
