function removeMenuItems() {

  //
  // if width is less than 750px
  //
  if ( mediaQueryListObject.matches ) {

    // Remove element nodes first
    document.getElementById("logo").remove();
    document.getElementById("about").remove();
    document.getElementById("services").remove();
    document.getElementById("contact-us").remove();

    // Append element node
    const menuElem = document.createElement('img');
    menuElem.setAttribute("style", "width:22px;height:16px;margin:25px;");
    menuElem.setAttribute('src', "images/hamburger.png");
    menuElem.setAttribute("id", "hamburger");
    menuElem.addEventListener("click", dropDownMenu);

    // Modify attributes for inner-left-flex-container
    const lcElemNode = document.getElementsByClassName("inner-left-flex-container")[0];
    lcElemNode.setAttribute("style", "width:auto;");
    lcElemNode.appendChild(menuElem);

  //
  // if width is greater than 750px
  //
  } else {

    const nodes = document.getElementsByClassName("inner-left-flex-container")[0].childNodes;

    var elemNodeCount = 0;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType == 1) {
        elemNodeCount++;
      }
    }

    // Check if only element node is hamburger
    if ( elemNodeCount == 1 ) {
      // Remove hamburger
      document.getElementById("hamburger").remove();

      // Modify attributs for inner-left-flex-container
      const lcNode = document.getElementsByClassName("inner-left-flex-container")[0];
      lcNode.setAttribute("style", "width:340px;");

      // Append child nodes back in
      document.getElementsByClassName("inner-left-flex-container")[0].appendChild(logo);
      document.getElementsByClassName("inner-left-flex-container")[0].appendChild(about);
      document.getElementsByClassName("inner-left-flex-container")[0].appendChild(services);
      document.getElementsByClassName("inner-left-flex-container")[0].appendChild(contactUs);

    } else if (elemNodeCount == 4) {
      
      // if first child node is hamburger
      const lcFirstElemChild = document.getElementsByClassName("inner-left-flex-container")[0].firstElementChild;
      if (lcFirstElemChild.tagName == "IMG") {

        // Replace hamburger with logo
        const lcElemNode = document.getElementsByClassName("inner-left-flex-container")[0];
        lcElemNode.replaceChild(logo, lcFirstElemChild);

        // modify some CSS properties of left-constainer
        lcElemNode.setAttribute("style", "width:340px;flex-direction:row;");

        // menu needs to start out as closed
        menuIsClosed = true;

      }
    }
  }
}

function dropDownMenu() {
  console.log("Menu clicked.");

  if ( menuIsClosed ) {

    //
    // Menu is closed so open it
    //

    // setup flex box
    const lcElemNode = document.getElementsByClassName("inner-left-flex-container")[0];
    lcElemNode.setAttribute("style", "flex-direction:column;width:auto;height:200px;align-items:baseline;position:relative;top:108px;");

    // Append child nodes back in
    document.getElementsByClassName("inner-left-flex-container")[0].appendChild(about);
    document.getElementsByClassName("inner-left-flex-container")[0].appendChild(services);
    document.getElementsByClassName("inner-left-flex-container")[0].appendChild(contactUs);

    // Flip menu control
    menuIsClosed = false;

  } else {

    //
    // Menu is open so close it
    //

    // Remove child nodes
    document.getElementById("about").remove();
    document.getElementById("services").remove();
    document.getElementById("contact-us").remove();

    // setup flex box
    const lcElemNode = document.getElementsByClassName("inner-left-flex-container")[0];
    lcElemNode.setAttribute("style", "flex-direction:row;width:auto;justify-content:flex-start;align-items:center;position:relative;top:50%;transform:translateY(-50%);");

    // Flip menu control
    menuIsClosed = true;
  }
}

// Create variables
var menuIsClosed = true;
var logo = document.getElementById("logo");
var about = document.getElementById("about");
var services = document.getElementById("services");
var contactUs = document.getElementById("contact-us");

// Create a MediaQueryList object
var mediaQueryListObject = window.matchMedia("(max-width: 750px)")

// Call listener function at run time
removeMenuItems(mediaQueryListObject);

// Attach listener function on state changes
mediaQueryListObject.addEventListener("change", function () {
  removeMenuItems(mediaQueryListObject);
});

