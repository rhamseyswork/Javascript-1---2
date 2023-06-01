// Indicates whether the model has been loaded.
let isModelLoaded = false;

// A global variable that stores the model.
let net;

// Hide the app before the model is loaded.
$("#app").hide();

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  mobilenet.load().then(function(model) {
    console.log('Successfully loaded model');

    isModelLoaded = true;

    // TODO 1: Select the div with the ID "status", add the text "Model is 
    // ready" and add the class "ready" to it. There is already a CSS
    // class that makes the text green.   
    const statusElement = document.getElementById('status');
    statusElement.innerText = 'Model is ready';
    statusElement.classList.add('ready');

    // TODO 2: Show the app by using the correct ID called "app". 
    // Hint: See line 8.
    const appElement = document.getElementById('app');
    appElement.classList.remove('not-ready');

    // TODO 3: store the newly loaded model into the global `net`.
    net = await mobile;
  });
}

/// Predicts the image using the global variable `net` that should be 
/// loaded above. If there are any predictions, they will be displayed in 
/// the cards with the kinds of the dogs and their probability.
function predict() {
  if (!isModelLoaded || !net) {
    console.error("Modelnet is not loaded yet!");
    return;
  }
  // Select the image.
  const imgEl = document.getElementById('img');
  net.classify(imgEl)
    .then(function(predictions) {
      console.log(predictions);
      // Select the div element with the ID of "result" to append the results.
      const resultElement = $('#result');
      for (var i = 0; i < predictions.length; i++) {
        console.log(predictions[i]);
        const prediction = predictions[i];

        // TODO 4: Get the class name of the prediction.
        const className = predictions[i].className;


        // TODO 5: Get the probability of the prediction.
        const probability = predictions[i].probability;

        // TODO 6: Create a new element h5, change the text inside it, and add 
        // a class called "card-title".
        const nameEl = $("<h5>").text(className).addClass('card-title');

        // TODO 7: Create a new element p, change the text inside it, and add 
        // a class called "card-title". See suggestion above.
        const probabityEl = $("<p>").text('Probability: ${Math.floor(probability *100)}%').addClass('card-text');

        // TODO 8: Create a new element div and add class 'card' to it.
        const card = $("<div>").addclass('card');

        // TODO 9: Create a new element div and add class 'card-body' to it.
        // Then append the nameEl and probabilityEl above as its children.
        const cardBody = $("<div>").addClass('card-body');
        cardBody.append(nameEl, probabityEl);

        // Append the cardBody element to the card element.
        card.append(cardBody);

        // TODO 10: append the card element to resultElement so it can be 
        // displayed.
        card.append(cardBody);
        resultElement.append(card);
      }
    });
}

app();