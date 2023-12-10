const express = require("express");
const bodyParser = require("body-parser");
const tencentcloud = require("tencentcloud-sdk-nodejs-ocr");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '7mb' }));
app.use(bodyParser.urlencoded({ limit: '7mb', extended: true }));
// 允许所有域进行跨域访问
const corsOptions = {
	origin: '*',
};
app.use(cors(corsOptions));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

const clientConfig = {
	credential: {
		secretId: process.env.TENCENT_CLOUD_SECRET_ID,
		secretKey: process.env.TENCENT_CLOUD_SECRET_KEY,
	},
	region: process.env.TENCENT_CLOUD_REGION || "ap-beijing",
	profile: {
		httpProfile: {
			endpoint: "ocr.tencentcloudapi.com",
		},
	},
};

const ocrClient = new tencentcloud.ocr.v20181119.Client(clientConfig);

app.post("/ocr", async (req, res) => {
	try {
		const { imageBase64 } = req.body;

		const params = {
			ImageBase64: imageBase64,
			"IsPdf": true,
			//"LanguageType": "auto",
			//"PdfPageNumber": 1,
			//"IsWords": false
		};

		const data = await ocrClient.GeneralAccurateOCR(params);
		res.json(data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
