const fs = require('fs');
const { google } = require('googleapis');

const CREDENTIALS = 'credentials.json'; 
const ZIP_FILE = 'playwright-report.zip';
const FOLDER_ID = process.env.GDRIVE_FOLDER_ID;

async function upload() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: ZIP_FILE,
    parents: [FOLDER_ID],
  };

  const media = {
    mimeType: 'application/zip',
    body: fs.createReadStream(ZIP_FILE),
  };

  const file = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  console.log(`✅ Uploaded to Google Drive, file ID: ${file.data.id}`);
}

upload().catch(console.error);
