const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 이미지가 있는 디렉토리
const directories = [
  './contents/images/content',
  './contents/images/thumbnail',
];

directories.forEach(directory => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach(file => {
      const imagePath = path.join(directory, file);
      const outputPath = path.join(
        directory,
        file.split('.').slice(0, -1).join('.') + '.webp',
      );

      sharp(imagePath)
        .withMetadata()
        .toFormat('webp')
        .toFile(outputPath)
        .then(() => {
          console.log(`Converted ${file} to webp.`);
          // 이미지 변환이 완료되면 원본 이미지 파일을 삭제
          fs.unlink(imagePath, unlinkErr => {
            if (unlinkErr) {
              console.error(`Error deleting ${file}: ${unlinkErr}`);
            } else {
              console.log(`Deleted original file ${file}.`);
            }
          });
        })
        .catch(conversionErr =>
          console.error(`Error converting ${file} to webp: ${conversionErr}`),
        );
    });
  });
});
