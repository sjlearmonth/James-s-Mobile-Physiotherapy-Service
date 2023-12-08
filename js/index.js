function removeMenuItems(x) {

  if (mediaQueryListObject.matches) {
    document.getElementById("logo").remove();
    document.getElementById("about").remove();
    document.getElementById("services").remove();
    document.getElementById("contact-us").remove();
    
    
    // const nodes = document.getElementsByClassName("here")[0].childNodes;
  
    // for (let i = 0; i < nodes.length; i++) {
    //   console.log(nodes[i].nodeType);
    // }
    
  } else {

    const nodes = document.getElementsByClassName("here")[0].childNodes;

    var elemNodeCount = 0;
    for ( let i = 0; i < nodes.length; i++ ) {
      // console.log(nodes[i].nodeType);
      if ( nodes[i].nodeType == 1 ) {
        elemNodeCount++;
      }
    }

    if (elemNodeCount != 4 ) {
      // Append child nodes
      console.log("element nodes all gone")
    } else {
      console.log("4 element nodes remain.")
    }
  
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

var logo = document.getElementById("logo");
var about = document.getElementById("about");
var services = document.getElementById("services");
var contactUs = document.getElementById("contact-us");


