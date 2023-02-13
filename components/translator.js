const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

const SwapObject = (object) => {
  return Object.entries(object).reduce((swap, entry) => {
    const [ key, value ] = entry;
    swap[ value ] = key;
    return swap;
  }, {});
};

const buildDictionary = (objectArray) => {
  const dictionary = {};

  objectArray.forEach((object) => {
    Object.entries(object).forEach((entry) => {
      const [ key, value ] = entry;
      dictionary[key] = value;
    })
  });

  return dictionary;
};

const AtoBDictionary = {
  ...americanOnly,
  ...americanToBritishSpelling,
  ...americanToBritishTitles
};

const BtoADictionary = {
  ...britishOnly,
  ...SwapObject(americanToBritishSpelling),
  ...SwapObject(americanToBritishTitles)
};

const localeDictionary = {
  'american-to-british': AtoBDictionary,
  'british-to-american': BtoADictionary
};

const localeTime = {
  'american-to-british': {
    regex: /[0-2]?[0-9]:[0-5][0-9]/gi,
    separator: '.'
  },
  'british-to-american': {
    regex: /[0-2]?[0-9]\.[0-5][0-9]/gi,
      separator: ':'
  }
};

const buildRegex = (dictionary) => {
  const wordRegex = Object.keys(dictionary)
    .map((word) => {
      if (word[word.length - 1] === '.') {
        return '\\b' + word.replace(/\./g, '[.]');
      } else {
        return '\\b' + word + '\\b';
      }
    })
    .join('|');

  const regex = new RegExp(wordRegex, 'gi');

  return regex;
};

class Translator {

  isValidLocale(locale) {
    return localeDictionary.hasOwnProperty(locale);
  }

  translate(text, locale) {

    let dictionary = localeDictionary[locale];
    let time = localeTime[locale];
    let timeRegex = time.regex;
    let timeSeparator = time.separator;
    let regex = buildRegex(dictionary);

    let translatedText = text;
    let translatedWordArr = [];
    let translateCount = 0;

    let matchWords = text.match(regex);
    //console.log(matchWords);

    if (matchWords) {
      let startIdx = 0;
      for (let match of matchWords) {
        translateCount++;
        let idx = text.search(match);
        if (idx != 0)
          translatedWordArr.push(text.slice(startIdx, idx));

        startIdx = idx + match.length;

        let lowerCaseMatch = match.toLowerCase();
        let translatedWord = dictionary[lowerCaseMatch];
        let translation = translatedWord;
        //console.log(translatedWord);

        let upperCase = match.toUpperCase() === match;
        let capitalized = match[0].toUpperCase() === match[0];
        if (upperCase) {
          translation = translatedWord.toUpperCase();
        } else if (capitalized) {
          translation = translatedWord[0].toUpperCase()+translatedWord.slice(1);
        }
        //console.log(translation);

        //highlight the translation and push to array
        translatedWordArr.push(`<span class="highlight">${translation}</span>`);
      }
      //console.log(translatedWordArr, startIdx, text.length);
      if (startIdx < text.length) {
        translatedWordArr.push(text.slice(startIdx));
      }
      translatedText = translatedWordArr.join('');
      //console.log(translatedWordArr, translatedText);
    }

    //check for time translation, if any
    //console.log(timeRegex, timeSeparator);
    let matchTimes = translatedText.match(timeRegex);
    console.log(matchTimes);
    if (matchTimes) {
      for (let match of matchTimes) {
        translateCount++;
        let matchToReplace = match.replace(/[:|.]/, timeSeparator);
        translatedText = translatedText.replace(match,
        `<span class="highlight">${matchToReplace}</span>`,
      );
      }
    }

    if (translateCount == 0) {
      const returnStr = "Everything looks good to me!";
      return returnStr;
    }

    return translatedText;
  }
}

module.exports = Translator;
