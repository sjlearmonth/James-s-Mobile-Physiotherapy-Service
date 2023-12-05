function removeMenuItems(x) {
  if (mediaQueryListObject.matches) { // If media query matches
    document.body.style.backgroundColor = "yellow";
  } else {
   document.body.style.backgroundColor = "pink";
  }
}

// Create a MediaQueryList object
var mediaQueryListObject = window.matchMedia("(max-width: 750px)")

// Call listener function at run time
removeMenuItems(mediaQueryListObject);

// Attach listener function on state changes
mediaQueryListObject.addEventListener("change", function() {
    removeMenuItems(mediaQueryListObject);
});