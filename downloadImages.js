const https = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, filename).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(path.join(__dirname, 'client', 'public', filename));
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(filename, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function main() {
  try {
    await download('https://upload.wikimedia.org/wikipedia/commons/5/5e/Elon_Musk_-_54820081119_%28cropped%29.jpg', 'elon.jpg');
    console.log('Downloaded Elon');
    await download('https://upload.wikimedia.org/wikipedia/commons/e/e6/Sundar_Pichai_%28cropped%29.jpg', 'sundar.jpg');
    console.log('Downloaded Sundar');
    await download('https://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg', 'steve.jpg');
    console.log('Downloaded Steve');
  } catch (err) {
    console.error(err);
  }
}

main();
