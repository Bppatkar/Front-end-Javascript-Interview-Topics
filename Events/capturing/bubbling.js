//Bubbling and Capturing
// by default useCapture callback is false which means bubbling event is occured
//but true will make the capturing  occur


//false is default
//true ==capturing
//false ==bubbling
//capturing if true is present (top to bottom)
//bubling if false is present (bottom to top)

document.querySelector("#grandparent").addEventListener(
  "click",
  () => {
    console.log("grandparent");
  },
  { capture: false }
);
document.querySelector("#parent").addEventListener(
  "click",
  (e) => {
    console.log("parent");
    // e.stopPropagation(); //event.stopPropagation() stops the move upwards, but on the current
    //element all other handlers will run.

    //To stop the bubbling and prevent handlers on the current element from running,
    //there’s a method event.stopImmediatePropagation(). After it no other handlers execute.
  },
  { capture: false }
);
document.querySelector("#child").addEventListener(
  "click",
  () => {
    console.log("child");
  },
  { capture: false }  //shorthand false and passed as callback
);

//function currying

// <script></script>
//In this case the html code parses then script is
// executed and the html waits for the script to fisnish
//then html parsing continues

// <script async></script>
// In Async html parsing and js code executes simultaneously

// <script defer></script>
// In Defer html parsing and js code executes simultaneously but
// when the HTML parsing is completed then only js code is executed
