// Classifier Variable
let classifier;
let classifier1;
// Model URL
let imageModelURL = 'human-model/';
let imageModelURL1 = 'mask-model/';

// Video
let video1;
let flippedVideo;
// To store the classification
let label = "";
let label1 = "";
let textStr = "";
// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  classifier1 = ml5.imageClassifier(imageModelURL1 + "model.json");
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video1 = createCapture(VIDEO);
  video1.size(320, 240);
  video1.hide();

  flippedVideo = ml5.flipImage(video1)
  // Start classifying
  classifyVideo();
  classifyVideo1();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);
  if(label1 === "with_mask" && label === "person"){
    background(0,255,0,50);
    textStr = "You are safe with mask!";

    setTimeout(function(){
      //to be filled
    }, 3000);
  }
  else if(label1 === "without_mask" && label === "person"){
    background(255,0,0,50);
    textStr = "Please wear mask!";
  }
  else if(label === "noperson"){
    textStr = "No human found.";
  } 
  // Draw the label
  console.log(label1);
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(textStr, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video1)
  classifier.classify(flippedVideo, gotResult);
}
function classifyVideo1() {
  classifier1.classify(flippedVideo, gotResult1);
}
// When we get a result
function gotResult1(error, results1) {
  // If there is an error
  if (error) {
    
    return;
  }
  // The results are in an array ordered by confidence.
  //console.log(results1[0]);
  label1 = results1[0].label;
  

  // Classifiy again!
  classifyVideo1();
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  

  // Classifiy again!
  classifyVideo();
}