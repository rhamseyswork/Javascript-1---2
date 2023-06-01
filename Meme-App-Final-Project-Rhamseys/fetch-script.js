// NOTE: DO NOT CHANGE THE FOLLOWING FUNCTION.
/**
 * Creates a meme instance. This doesn't use the constructor to avoid importing
 * Meme into this script, which doesn't work on browsers but NodeJS, which is
 * the environment for testing.
 * @param number id The meme ID.
 * @param string url The meme URL.
 * @param string title The title of the meme.
 * @param number likeNumber The number of likes of the meme.
 */
function createMeme(id, url, title, likeNumber) {
  let meme;
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    // Import the Meme class from script.js for NodeJS environment.
    const { Meme } = require('./script');
    meme = new Meme(id, url, title);
  } else {
    // Meme is defined in script.js before this script is imported on browsers so
    // no need to import it.
    meme = new Meme(id, url, title);
  }

  meme.likeNumber = likeNumber;
  return meme;
}

// START CODING BELOW.

// TODO: Add correct URL.
const SERVER_URL = 'https://javascriptclass-22d93.firebaseio.com/memes.json?print=pretty';

/**
 * Handles list of memes fetched from the server. `data` is basically an array 
 * of meme objects in JSON format.
 * @param {*} data the list of memes.
 * @return the list of Meme instances created from the fetched JSON objects.
 */
function dataFetchSuccessCallback(data) {
  // TODO: Define an empty list of memes to return.
  let memes = [];

  // Print out the data to console to see the structure of the response.
  // Use Console or open the Inspector to see it.
  console.log(data);

  let i = 0;
  // Iterate through the data. The data is a JSON object that has dictionary
  // of key of <a string> and value of <meme information>.
  // As before, the memeID must be an integer starting from 0 and incremented
  // by 1 for each meme in the array.
  for (let id in data) {
    // TODO: Replace this with the correct object from "data".
    const meme = data[id];

    // TODO: get the URL. It has the key "url" in the JSON.
    const memeURL = meme.url; // Replace this with correct object from the correct key.

    // TODO: get the title. It has the key "title" in the JSON.
    const memeTitle = meme.title; // Replace this with correct object from the correct key from "meme". 

    // TODO: get the like count. It has the key "like_count" in the JSON.
    const memeLikeNumber = meme.like_count; // Replace this with correct object from the correct key from meme.

    // TODO: Create a new Meme object with the title, URL and like number. Look at the
    // function `createMeme()` above.
    const aMeme = createMeme(i, memeURL, memeTitle, memeLikeNumber);
    i++;
    // TODO: Add the new Meme object to the list of memes "memes".
    memes.push(aMeme);
  }
  return memes;
}

// --------------------------------------------------------------
// NOTE: DO NOT CHANGE THE LINES BELOW!!!
// --------------------------------------------------------------

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    dataFetchSuccessCallback: dataFetchSuccessCallback,
    SERVER_URL: SERVER_URL
  };
}