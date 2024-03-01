function removeMenuItems() {

  //
  // if width is less than 910px
  //
  if ( mediaQueryListObject910px.matches ) {

    // Remove element nodes first
    document.getElementById("logo").remove();
    document.getElementById("about").remove();
    document.getElementById("services").remove();
    document.getElementById("contact-us").remove();

    // Append element node
    const menuElem = document.createElement('img');
    menuElem.setAttribute("style", "width:44px;height:32px;margin:25px;");
    menuElem.setAttribute('src', "images/hamburger.png");
    menuElem.setAttribute("id", "hamburger");
    menuElem.addEventListener("click", dropDownMenu);

    // Modify attributes for inner-left-flex-container
    const lcElemNode = document.getElementsByClassName("inner-left-flex-container")[0];
    lcElemNode.setAttribute("style", "width:auto;");
    lcElemNode.appendChild(menuElem);

  //
  // if width is greater than 910px
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
      lcNode.setAttribute("style", "width:450px;");

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
        lcElemNode.setAttribute("style", "width:450px;flex-direction:row;");

        // menu needs to start out as closed
        menuIsClosed = true;

      }
    }
  }
}

function dropDownMenu() {

  if ( menuIsClosed ) {

    //
    // Menu is closed so open it
    //

    // setup flex box
    const ilfcElemNode = document.getElementsByClassName("inner-left-flex-container")[0];
    const ilfcFirstElemChild = ilfcElemNode.firstElementChild;
    const paddingElemNode = document.createElement("div");
    paddingElemNode.setAttribute("style", "width:44px;height:44px;background-color:orange;");
    ilfcFirstElemChild.insertAdjacentElement("beforebegin", paddingElemNode);
    ilfcElemNode.setAttribute("style", "flex-direction:column;width:130px;height:200px;align-items:baseline;");

    const irfcElemNode = document.getElementsByClassName("inner-right-flex-container")[0];

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
    lcElemNode.setAttribute("style", "flex-direction:row;width:auto;justify-content:flex-start;align-items:center;");

    // Flip menu control
    menuIsClosed = true;
  }
}

function manageRightULListItems() {
  const ulRightChildren = document.getElementsByClassName("ul-right")[0].children;

  //
  // if width is less than 990px
  //
  if ( mediaQueryListObject990px.matches ) {

    // Check that the second child is not already a <br>
    if ( ulRightChildren[1].nodeName == "LI") {

      // Second child is not a <br> yet, so we insert one
      ulRightChildren[0].insertAdjacentElement("afterend", document.createElement("br"));

    }

  }
  //
  // If width is greater than 990px
  //
  else {

    // check that second child is a <br> before removing it
    if ( ulRightChildren[1].nodeName == "BR") {
      const ulRight = document.getElementsByClassName("ul-right")[0];
      ulRight.removeChild(ulRightChildren[1]);
    }

  }
}

// Create variables
var menuIsClosed = true;
var logo = document.getElementById("logo");
var about = document.getElementById("about");
var services = document.getElementById("services");
var contactUs = document.getElementById("contact-us");

// Create a MediaQueryList object for 910px breakpoint
var mediaQueryListObject910px = window.matchMedia("(max-width: 910px)")

// Call listener function at run time
removeMenuItems(mediaQueryListObject910px);

// Attach listener function on state changes
mediaQueryListObject910px.addEventListener("change", function () {
  removeMenuItems(mediaQueryListObject910px);
});

// Create a MediaQueryList object for 990px breakpoint
var mediaQueryListObject990px = window.matchMedia("(max-width: 990px)")

// Call listener function at run time
removeMenuItems(mediaQueryListObject990px);

// Attach listener function on state changes
mediaQueryListObject990px.addEventListener("change", function () {
  manageRightULListItems(mediaQueryListObject990px);
});
