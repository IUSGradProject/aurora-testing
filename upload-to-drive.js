const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const CREDENTIALS = 'credentials.json';
const REPORT_FOLDER = 'playwright-report';
const PARENT_FOLDER_ID = process.env.GDRIVE_FOLDER_ID;
const SUBFOLDER_NAME = process.env.REPORT_FOLDER_NAME || 'Playwright Report';

async function upload() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  const drive = google.drive({ version: 'v3', auth });

  // 1. Create subfolder with timestamp under the main folder
  const folderMetadata = {
    name: SUBFOLDER_NAME,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [PARENT_FOLDER_ID],
  };

  const folder = await drive.files.create({
    resource: folderMetadata,
    fields: 'id',
  });

  const folderId = folder.data.id;
  console.log(`📁 Created Drive subfolder: "${SUBFOLDER_NAME}" (ID: ${folderId})`);

  // 2. Upload all files from playwright-report to that subfolder
  const uploadFile = async (filePath, relativePath) => {
    const fileMetadata = {
      name: relativePath,
      parents: [folderId],
    };

    const media = {
      mimeType: 'text/html', 
      body: fs.createReadStream(filePath),
    };

    const res = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });

    console.log(`✅ Uploaded: ${relativePath}`);
  };

  const files = fs.readdirSync(REPORT_FOLDER);
  for (const file of files) {
    const fullPath = path.join(REPORT_FOLDER, file);
    const stat = fs.statSync(fullPath);
    if (stat.isFile()) {
      await uploadFile(fullPath, file);
    }
  }

  console.log('🎉 All report files uploaded successfully.');
}

upload().catch(console.error);
