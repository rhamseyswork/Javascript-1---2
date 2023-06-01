// --------------------------------------------------------------
// SETUP. DO NOT CHANGE THESE LINES. SEE EXERCISE SECTION BELOW.
// --------------------------------------------------------------
// An array of URLs to the memes.
const MEME_URLS = [
  "https://res.cloudinary.com/baolocdo/image/upload/v1494196596/meme1_ldhisb.jpg",
  "https://res.cloudinary.com/baolocdo/image/upload/v1494196602/meme2_fcgumx.jpg",
  "https://res.cloudinary.com/baolocdo/image/upload/v1494196604/meme3_r4ke3j.jpg"
];

const MEME_TITLES = ["I have no idea why", "Welcome mat", "Happiness"];

class Meme {
  // Constructs the meme with the provided URL.
  constructor(memeID, url, title) {
    this._url = url;

    // The numer of likes.
    this._likeNumber = 0;

    // The title of the meme.
    this._title = title;

    // The ID of the meme.
    this._id = memeID;
  }

  // Returns the ID of the meme.
  get ID() {
    return this._id;
  }

  // Returns the URL of the meme.
  get URL() {
    return this._url;
  }

  // Returns the number of likes.
  get likeNumber() {
    return this._likeNumber;
  }

  // Update the like number.
  set likeNumber(likeNumber) {
    this._likeNumber = likeNumber;
  }

  // Returns the title of the meme.
  get title() {
    return this._title;
  }
}

/**
 * Replaces the negative mod. To find a remainder of the two number a and b, 
 * use a.mod(b). For example, 12 % 5 is equivalent to 12.mod(5)
 * See explanation at https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers.
 * @param {Number} n the number 
 */
Number.prototype.mod = function(n) {
  return ((this % n) + n) % n;
}

// --------------------------------------------------------------
// END SETUP
// --------------------------------------------------------------

// --------------------------------------------------------------
// EXERCISE: COMPLETE THE TODO'S BELOW
// --------------------------------------------------------------
class MemeController {

  // Set the current meme to the provided meme, and update the image to the meme's img
  // source, its title and the like number.
  setCurrentMeme(meme) {
    this._currentMeme = meme;

    // Get the element with the ID "#meme-image-id" and replace the
    // source with the URL of the current meme.
    $("#meme-image-id").attr("src", meme.URL);

    // TODO: Set the title of the current meme.
    $("#meme-title-id").text(meme.title);

    // Call updateLikeNumberElement with the current meme's likeNumber.
    this.updateLikeNumberElement(this._currentMeme.likeNumber);
  }

  // Updates the Like Number DOM element with the provided likeNumber.
  updateLikeNumberElement(likeNumber) {
    // TODO: Set the number of likes by updating the text of the element with the ID
    // "#meme-likes-id".
    $("#meme-likes-id").text(`${likeNumber} Likes`);
  }

  // Sets the next meme.
  nextMeme() {
    // The next meme ID. It will go back to the first one if the
    // current one is the last one in the list.
    var nextMemeID = (this._currentMeme.ID + 1) % this._memes.length;
    var nextMeme = this._memes[nextMemeID];
    if (nextMeme) {
      this.setCurrentMeme(nextMeme);
    }
  }

  // Sets the previous meme.
  previousMeme() {
    // TODO: Complete this function. It should be similar to the nextMeme() function above.
    var prevMemeID = (this._currentMeme.ID - 1) >= 0 ? this._currentMeme.ID - 1 : this._memes.length - 1;
    var prevMeme = this._memes[prevMemeID];
    if (prevMeme) {
      this.setCurrentMeme(prevMeme);
    }
  }

  // Updates the likeNumber of the current meme when it is liked.
  like() {
    // TODO: update the like number of the "#meme-likes-id" element.
    this._currentMeme.likeNumber++;
    this.updateLikeNumberElement(this._currentMeme.likeNumber);
  }

  // Updates the likeNumber of the current meme when it is disliked.
  dislike() {
    // TODO: Complete this function. It should be similar to the like() function above.
    this._currentMeme.likeNumber--;
    this.updateLikeNumberElement(this._currentMeme.likeNumber);

  }

  constructor(memes, currentMemeID) {
    // Use self to capture the this object.
    // Otherwise, this will refer to the button object, not the controlle object!
    // This is why knowing Scope & Closure is important!
    self = this;

    this._memes = memes;
    this._currentMeme = memes[currentMemeID];

    this.setCurrentMeme(memes[currentMemeID]);
  }
}

function setUpButton(memeCtrl) {
  // Set the handler for the Next button. It will go to the next meme.
  $("#next-image-id").click(function() {
    // If you use 'this' inside this function, it refers to the button "Next", not
    // the MemeController instance when this function is called as the button is clicked. 
    memeCtrl.nextMeme();
  });

  // TODO: Add handler for previous meme. The element is the button 
  // with the ID "#prev-image-id". See the example above.

  $("#prev-image-id").click(function() {
    memeCtrl.previousMeme();
  });

  // TODO: Add handler for clicking Like button. The element is the button
  // with the ID "#like-button-id". See the example above.
  $("#like-button-id").click(function() {
    memeCtrl.like();
  });

  // TODO: Add handler for clicking dislike button. The element is the button
  // with the ID "#dislike-button-id". See the example above.
  $("#dislike-button-id").click(function() {
    memeCtrl.dislike();
  });
};

// --------------------------------------------------------------
// END EXERCISE
// --------------------------------------------------------------

// --------------------------------------------------------------
// NOTE: DO NOT CHANGE THE LINES BELOW!!!
// --------------------------------------------------------------

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    MEME_URLS: MEME_URLS,
    MEME_TITLES: MEME_TITLES,
    Meme: Meme,
    MemeController: MemeController,
    setUpButton: setUpButton
  };
}