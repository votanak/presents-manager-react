app.post('/write_json', (req, res) => {
  try {
    arrayToFile(`${req.body.filename}.json`, checkImages(req.body.data));
    return res.send({ msg: 'json successfully writed' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ 'server write error': error });
  }
});

const checkImages = (array) => {
  let resultArray = [];
  array.forEach((gd) => {
    let blank =
      gd.id.toString().slice(0, 2) === 'up'
        ? 'blank-pack.svg'
        : 'blank-good.svg';
    const files = globSync(`./public/good-pictures/img-${gd.id}-*.*`);
    // console.log('chIm: ', files[0], path.basename(files[0]));
    files.length
      ? resultArray.push({
          ...gd,
          picture: `${path.basename(files[0])}`,
        })
      : resultArray.push({ ...gd, picture: blank });
  });
  return resultArray;
};

app.get('/get_json', (req, res) => {
  fs.readFile(
    `./data/${url.parse(req.url, true).query.filename}.json`,
    'utf8',
    (err, data) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        console.error('Ошибка чтения файла:', err);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      console.log('get_json: Данные из файла успешно отправлены');
      res.end(data);
      return;
    },
  );
});
