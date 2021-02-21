const detect = require('detectlanguage');
var detectLanguage = new detect('147a588750557b16e9772a6fe29dd57d'); 

const handleApiCall = (req, res) => {
  const { text } = req.body;
  detectLanguage.detect(text).
  then(result => {
    detectLanguage.languages().then(r => {
      var data = r.filter(element => element.code === result[0].language);
      res.json(data[0].name);
    })
  });
}

module.exports = {
  handleApiCall
}
