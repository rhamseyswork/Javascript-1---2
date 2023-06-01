/**
 * @jest-environment jsdom
 */

global.window = window;
global.$ = require('jquery');
global.jQuery = $;

const { MEME_TITLES, MEME_URLS, Meme, MemeController, setUpButton } = require('./script');

describe('meme', () => {
  let memeHolderElement;
  let prevButtonElement;
  let nextButtonElement;
  let likeButtonElement;
  let dislikeButtonElement;
  let memeCtrl;
  let memes;
  let memeTitleElement;
  let memeLikesElement;

  function setUp() {
    // Set up our document body
    document.body.innerHTML =
      '<div>' +
      '  <img id="meme-image-id" src=""/>' +
      '  <button id="prev-image-id" />' +
      '  <button id="next-image-id" />' +
      '  <button id="like-button-id" />' +
      '  <button id="dislike-button-id" />' +
      '  <p id="meme-title-id" class="card-text"></p>' +
      '  <p id="meme-likes-id" class="card-text"></p>'
    '</div>';

    memeHolderElement = $('#meme-image-id');
    prevButtonElement = $('#prev-image-id');
    nextButtonElement = $('#next-image-id');
    likeButtonElement = $('#like-button-id');
    dislikeButtonElement = $('#dislike-button-id');
    memeTitleElement = $('#meme-title-id');
    memeLikesElement = $('#meme-likes-id');
  }

  function getController() {
    memes = [];
    for (let i = 0; i < MEME_URLS.length; i++) {
      // Create a new meme with the ID is i, meme URL and meme title.
      const aMeme = new Meme(i, MEME_URLS[i], MEME_TITLES[i]);
      memes.push(aMeme);
    }

    // SET UP THE CONTROLLER.
    var memeCtrl = new MemeController(memes, 0);
    return memeCtrl;
  }

  beforeEach(() => {
    setUp();
  });

  test('should add handler to the previous meme', () => {
    const ctrl = getController();
    const spy = jest.spyOn(ctrl, 'previousMeme');
    setUpButton(ctrl);

    prevButtonElement.click();

    expect(spy).toHaveBeenCalled();
  });

  test('should add handler to the like button', () => {
    const ctrl = getController();
    const spy = jest.spyOn(ctrl, 'like');
    setUpButton(ctrl);

    likeButtonElement.click();

    expect(spy).toHaveBeenCalled();
  });

  test('should add handler to the dislike button', () => {
    const ctrl = getController();
    const spy = jest.spyOn(ctrl, 'dislike');
    setUpButton(ctrl);

    dislikeButtonElement.click();

    expect(spy).toHaveBeenCalled();
  });

  test('should change the current meme title', () => {
    const ctrl = getController();
    ctrl.setCurrentMeme(memes[1]);
    expect(ctrl._currentMeme).toEqual(memes[1]);
    expect(memeTitleElement.text()).toEqual(MEME_TITLES[1]);
  });

  test('should go to the 2nd meme from the first meme when nextMeme() is called', () => {
    const ctrl = getController();
    const spy = jest.spyOn(ctrl, 'setCurrentMeme');

    ctrl.nextMeme();
    expect(ctrl._currentMeme).toEqual(memes[1]);
    expect(spy).toHaveBeenCalled();
  });

  test('should go to the 1st meme from the last meme when nextMeme() is called', () => {
    const ctrl = getController();
    ctrl._currentMeme = memes[memes.length - 1];
    const spy = jest.spyOn(ctrl, 'setCurrentMeme');

    ctrl.nextMeme();
    expect(ctrl._currentMeme).toEqual(memes[0]);
    expect(spy).toHaveBeenCalled();
  });

  test('should go to the 2nd meme from the last meme when previousMeme() is called', () => {
    const ctrl = getController();
    ctrl._currentMeme = memes[memes.length - 1];
    const spy = jest.spyOn(ctrl, 'setCurrentMeme');

    ctrl.previousMeme();
    expect(ctrl._currentMeme).toEqual(memes[memes.length - 2]);
    expect(spy).toHaveBeenCalled();
  });

  test('should go to the last meme from the first meme when previousMeme() is called', () => {
    const ctrl = getController();
    const spy = jest.spyOn(ctrl, 'setCurrentMeme');
    console.log(ctrl._currentMeme);

    ctrl.previousMeme();
    console.log(ctrl._currentMeme);
    expect(ctrl._currentMeme).toEqual(memes[memes.length - 1]);
    expect(spy).toHaveBeenCalled();
  });

  test('should change the current like number div to "10 Likes" when updateLikeNumberElement(10)', () => {
    const ctrl = getController();
    ctrl.updateLikeNumberElement(10);
    expect(memeLikesElement.text()).toEqual('10 Likes');
  });

  test('should change the current like number div to "100 Likes" when updateLikeNumberElement(100)', () => {
    const ctrl = getController();
    ctrl.updateLikeNumberElement(100);
    expect(memeLikesElement.text()).toEqual('100 Likes');
  });

  test('should decrease like numbers when dislike() is called and updateLikeNumberElement() is called', () => {
    const ctrl = getController();
    const spy = jest.spyOn(ctrl, 'updateLikeNumberElement');

    ctrl.dislike();
    expect(ctrl._currentMeme).toEqual(memes[0]);
    expect(ctrl._currentMeme.likeNumber).toEqual(-1);
    expect(spy).toHaveBeenCalledWith(-1);

    ctrl.dislike();
    expect(ctrl._currentMeme).toEqual(memes[0]);
    expect(ctrl._currentMeme.likeNumber).toEqual(-2);
    expect(spy).toHaveBeenCalledWith(-2);
  });

  test('should increase like numbers when like() is called and updateLikeNumberElement() is called', () => {
    const ctrl = getController();
    const spy = jest.spyOn(ctrl, 'updateLikeNumberElement');

    ctrl.like();
    expect(ctrl._currentMeme).toEqual(memes[0]);
    expect(ctrl._currentMeme.likeNumber).toEqual(1);
    expect(spy).toHaveBeenCalledWith(1);

    ctrl.like();
    expect(ctrl._currentMeme).toEqual(memes[0]);
    expect(ctrl._currentMeme.likeNumber).toEqual(2);
    expect(spy).toHaveBeenCalledWith(2);
  });
});