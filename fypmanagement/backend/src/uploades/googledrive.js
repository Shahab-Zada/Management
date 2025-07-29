const { google } = require("googleapis");
const stream = require("stream");
const path = require("path");

// Replace with your default folder ID
const DEFAULT_FOLDER_ID = "1FXp8-PaUvLtWMGoFGvyFe0HJvpeEemzo";

// Google Auth setup
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../src/config/apikey.json"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

async function uploadToDrive(file, folderId = DEFAULT_FOLDER_ID) {
  if (!file || !file.buffer) {
    throw new Error("Invalid file buffer");
  }

  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);

  const fileMetadata = {
    name: sanitizeFilename(file.originalname),
    parents: [folderId],
  };

  const media = {
    mimeType: file.mimetype,
    body: bufferStream,
  };

  try {
    const { data } = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id, name",
      supportsAllDrives: true,
    });

    await drive.permissions.create({
      fileId: data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
      supportsAllDrives: true,
    });

    return `https://drive.google.com/file/d/${data.id}/view`;
  } catch (err) {
    console.error("❌ Google Drive upload failed:", err.message);
    throw new Error("Google Drive upload failed");
  }
}

function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9_.-]/gi, "_");
}

module.exports = uploadToDrive;
