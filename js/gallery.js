// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
// Counter for the mImages array
var mCurrentIndex = null;

function swapPhoto() {
	if(mCurrentIndex == null){
		mCurrentIndex = 0;
	}

	else if (mCurrentIndex ==  mImages.length - 1) {
		mCurrentIndex = 0;
	}

	else{
		mCurrentIndex++;
		console.log(mCurrentIndex);
	}

	const location = "Location: ", description = "Description: ", date = "Date: ";
	var photoLocation = mImages[mCurrentIndex].imgLocation;
	var photoDesc = mImages[mCurrentIndex].description;
	var photoDate = mImages[mCurrentIndex].date;
	console.log('swap photo');
	$("#photo").attr("src", mImages[mCurrentIndex].imgPath);
	console.log(mImages[mCurrentIndex].imgPath);
	$(".location").text(location + photoLocation);
	$(".description").text(description + photoDesc);
	$(".date").text(date + photoDate);

	console.log(photoLocation);
	console.log(mCurrentIndex + " mCurrentIndex on swapPhoto");
}


// XMLHttpRequest variable
var mURL = "images.json";
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
mRequest2.onreadystatechange = function() {
  // Do something interesting if file is opened successfully
  if (mRequest2.readyState == 4 && mRequest2.status == 200) {
    try {
      // Let’s try and see if we can parse JSON
      var mJson2 = JSON.parse(mRequest2.responseText);

      for (var i = 0; i < mJson2.images.length; i++){
      	mImages.push(new GalleryImage(mJson2.images[i].imgPath, mJson2.images[i].imgLocation, mJson2.images[i].description, mJson2.images[i].date));
      }
      // Let’s print out the JSON; It will likely show as “obj”
      console.log(mJson2.images);
      console.log(mJson2.images[0].imgPath);

     
    } catch (err) {
      console.log(err.message)
    }
  }
};

mRequest.open("GET", mURL, true);
mRequest.send();

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'insert_url_here_to_image_json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(imgPath, imgLocation, description, date){
	this.imgPath = imgPath;
	this.imgLocation = imgLocation;
	this.description = description;
	this.date = date;
};