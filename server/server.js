const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const corsOptions = {
    origin: "http://localhost:5500",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 8080;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5500";

app.post("/handle-image-download", async (req, res) => {
    const { formData, templateType, selectedTemplateId  } = req.body;

    if (!formData || !templateType || !selectedTemplateId) {
        return res.status(400).json({ error: "Missing required data" });
    }

    let browser;

    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        await page.setViewport({
            width: 1123,
            height: 794,
            deviceScaleFactor: 2,
        });

        await page.goto(clientUrl, { waitUntil: "networkidle0" });

        await page.evaluate(({ formData, templateType, selectedTemplateId }) => {
            window.dispatchEvent(
                new CustomEvent("puppeteer:inject", {
                    detail: { formData, templateType, selectedTemplateId }
                })
            );
        }, { formData, templateType, selectedTemplateId });

        await page.waitForSelector("#poster-preview", { visible: true });
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const posterElement = await page.$("#poster-preview");
        const imageBuffer = await posterElement.screenshot({
            type: "jpeg",
            quality: 100,
            omitBackground: false,
        });

        await browser.close();

        const filename = `${selectedTemplateId}__${formData.agentName || formData.receiverName || "unknown"}__${new Date().toISOString().replace(/[:.]/g, "-")}.jpg`;

        res.status(200).set({
            "Content-Type": "image/jpeg",
            "Content-Disposition": `attachment; filename="${filename}"`,
        });

        return res.send(imageBuffer);
    } catch (error) {
        console.error("Error Capturing Poster: ", error);
        if (browser) await browser.close();

        return res.status(500).json({ error: "Failed to capture poster" });
    }
});

app.post("/handle-pdf-download", async (req, res) => {
    const { formData, templateType, selectedTemplateId } = req.body;
  
    if (!formData || !templateType || !selectedTemplateId) {
      return res.status(400).json({ error: "Missing required data" });
    }
  
    let browser;
  
    try {
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
  
      const page = await browser.newPage();
  
      // Set high resolution for better image quality
      await page.setViewport({
        width: 1123,
        height: 794,
        deviceScaleFactor: 2,
      });
  
      await page.goto(clientUrl, { waitUntil: "networkidle0" });
  
      // Inject data
      await page.evaluate(({ formData, templateType, selectedTemplateId }) => {
        window.dispatchEvent(
          new CustomEvent("puppeteer:inject", {
            detail: { formData, templateType, selectedTemplateId },
          })
        );
      }, { formData, templateType, selectedTemplateId });
  
      await page.waitForSelector("#poster-preview", { visible: true });
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Let poster render
  
      const posterElement = await page.$("#poster-preview");
  
      // Capture screenshot as PNG (for sharpness and transparency)
      const imageBuffer = await posterElement.screenshot({
        type: "png",
        omitBackground: false,
      });
  
      // Create new page and embed image for full-page PDF
      const pdfPage = await browser.newPage();
      await pdfPage.setContent(`
        <html>
          <head>
            <style>
              * { margin: 0; padding: 0; }
              html, body {
                width: 100%;
                height: 100%;
                overflow: hidden;
                background: white;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
              }
            </style>
          </head>
          <body>
            <img src="data:image/png;base64,${imageBuffer.toString("base64")}" />
          </body>
        </html>
      `);
  
      const pdfOutput = await pdfPage.pdf({
        format: "A4",
        landscape: true,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });
  
      await browser.close();
  
        // 🔠 Construct the filename
        const rawName = formData.receiverName || formData.agentName || "poster";
        const safeName = String(rawName).toLowerCase().replace(/\s+/g, "-");
        const timestamp = new Date()
            .toISOString()
            .replace(/T/, "_")
            .replace(/:/g, "")
            .split(".")[0]; // "2025-06-23_145230"
        const filename = `${templateType}_${safeName}_${timestamp}.pdf`;

        res.status(200).set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${filename}"`,
        });

        return res.send(pdfOutput);
    } catch (error) {
      console.error("Error Capturing PDF: ", error);
      if (browser) await browser.close();
      return res.status(500).json({ error: "Failed to generate PDF" });
    }
});
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});