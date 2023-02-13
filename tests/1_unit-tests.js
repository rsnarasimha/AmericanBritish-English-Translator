const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  suite('Translation tests', () => {
    // #1
    test('Translate to British English 1', () => {
      let text = 'Mangoes are my favorite fruit.';
      let locale = 'american-to-british';

      assert.equal(translator.translate(text, locale), 'Mangoes are my <span class="highlight">favourite</span> fruit.');
    });
    // #2
    test('Translate to British English 2', () => {
      let text = 'I ate yogurt for breakfast.';
      let locale = 'american-to-british';

      assert.equal(translator.translate(text, locale), 'I ate <span class="highlight">yoghurt</span> for breakfast.');
    });
    // #3
    test('Translate to British English 3', () => {
      let text = "We had a party at my friend's condo.";
      let locale = 'american-to-british';

      assert.equal(translator.translate(text, locale), 'We had a party at my friend\'s <span class="highlight">flat</span>.');
    });
    // #4
    test('Translate to British English 4', () => {
      let text = 'Can you toss this in the trashcan for me?';
      let locale = 'american-to-british';

      assert.equal(translator.translate(text, locale), 'Can you toss this in the <span class="highlight">bin</span> for me?');
    });
    // #5
    test('Translate to British English 5', () => {
      let text = 'The parking lot was full.';
      let locale = 'american-to-british';

      assert.equal(translator.translate(text, locale), 'The <span class="highlight">car park</span> was full.');
    });
    // #6
    test('Translate to British English 6', () => {
      let text = 'Like a high tech Rube Goldberg machine.';
      let locale = 'american-to-british';

      assert.equal(translator.translate(text, locale), 'Like a high tech <span class="highlight">Heath Robinson device</span>.');
    });
    // #7
    test('Translate to British English 7', () => {
      let text = 'To play hooky means to skip class or work.';
      let locale = 'american-to-british';

      assert.equal(translator.translate(text, locale), 'To <span class="highlight">bunk off</span> means to skip class or work.');
    });
    // #8
    test('Translate to British English 8', () => {
      let text = 'No Mr. Bond, I expect you to die.';
      let locale = 'american-to-british';

      assert.equal(translator.translate(text, locale), 'No <span class="highlight">Mr</span> Bond, I expect you to die.');
    });
    // #9
    test('Translate to British English 9', () => {
      let text = 'Dr. Grosh will see you now.';
      let locale = 'american-to-british';

      assert.equal(translator.translate(text, locale), '<span class="highlight">Dr</span> Grosh will see you now.');
    });
    // #10
    test('Translate to British English 10', () => {
      let text = 'Lunch is at 12:15 today.';
      let locale = 'american-to-british';

      assert.equal(translator.translate(text, locale), 'Lunch is at <span class="highlight">12.15</span> today.');
    });
    // #11
    test('Translate to British English 11', () => {
      let text = 'We watched the footie match for a while.';
      let locale = 'british-to-american';

      assert.equal(translator.translate(text, locale), 'We watched the <span class="highlight">soccer</span> match for a while.');
    });
    // #12
    test('Translate to British English 12', () => {
      let text = 'Paracetamol takes up to an hour to work.';
      let locale = 'british-to-american';

      assert.equal(translator.translate(text, locale), '<span class="highlight">Tylenol</span> takes up to an hour to work.');
    });
    // #13
    test('Translate to British English 13', () => {
      let text = 'First, caramelise the onions.';
      let locale = 'british-to-american';

      assert.equal(translator.translate(text, locale), 'First, <span class="highlight">caramelize</span> the onions.');
    });
    // #14
    test('Translate to British English 14', () => {
      let text = 'I spent the bank holiday at the funfair.';
      let locale = 'british-to-american';

      assert.equal(translator.translate(text, locale), 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.');
    });
    // #15
    test('Translate to British English 15', () => {
      let text = 'I had a bicky then went to the chippy.';
      let locale = 'british-to-american';

      assert.equal(translator.translate(text, locale), 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.');
    });
    // #16
    test('Translate to British English 16', () => {
      let text = "I've just got bits and bobs in my bum bag.";
      let locale = 'british-to-american';

      assert.equal(translator.translate(text, locale), 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.');
    });
    // #17
    test('Translate to British English 17', () => {
      let text = 'The car boot sale at Boxted Airfield was called off.';
      let locale = 'british-to-american';

      assert.equal(translator.translate(text, locale), 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.');
    });
    // #18
    test('Translate to British English 18', () => {
      let text = 'Have you met Mrs Kalyani?';
      let locale = 'british-to-american';

      assert.equal(translator.translate(text, locale), 'Have you met <span class="highlight">Mrs.</span> Kalyani?');
    });
    // #19
    test('Translate to British English 19', () => {
      let text = "Prof Joyner of King's College, London."
      let locale = 'british-to-american';

      assert.equal(translator.translate(text, locale), '<span class="highlight">Prof.</span> Joyner of King\'s College, London.');
    });
    // #20
    test('Translate to British English 20', () => {
      let text = 'Tea time is usually around 4 or 4.30.';
      let locale = 'british-to-american';

      assert.equal(translator.translate(text, locale), 'Tea time is usually around 4 or <span class="highlight">4:30</span>.');
    });
  });
  suite('Highlight translation tests', () => {
    // #1
    test('Highlight translation 1', () => {
      let text = 'Mangoes are my favorite fruit.';
      let locale = 'american-to-british';

      assert.include(translator.translate(text, locale), '<span class="highlight">favourite</span>');
    });
    // #2
    test('Highlight translation 2', () => {
      let text = 'I ate yogurt for breakfast.';
      let locale = 'american-to-british';

      assert.include(translator.translate(text, locale), '<span class="highlight">yoghurt</span>');
    });
    // #3
    test('Highlight translation 3', () => {
      let text = 'We watched the footie match for a while.';
      let locale = 'british-to-american';

      assert.include(translator.translate(text, locale), '<span class="highlight">soccer</span>');
    });
    // #4
    test('Highlight translation 4', () => {
      let text = 'Paracetamol takes up to an hour to work.';
      let locale = 'british-to-american';

      assert.include(translator.translate(text, locale), '<span class="highlight">Tylenol</span>');
    });
  });
});
