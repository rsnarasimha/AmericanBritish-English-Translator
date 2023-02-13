'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let { text, locale } = req.body;
      console.log(text, locale);

      if (text === '') {
        return res.json({ error: 'No text to translate' });
      }

      if (!text || !locale) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if (!translator.isValidLocale(locale)) {
        return res.json({ error: 'Invalid value for locale field' });
      }

      let translation = translator.translate(text, locale);

      return res.json({ text, translation });
    });
};
