/**
 * Shadow DOM allows hidden DOM trees to be attached to 
 * elements in the regular DOM tree — this shadow DOM tree 
 * starts with a shadow root, underneath which you can attach 
 * any element, in the same way as the normal DOM.
 */
const hostElement = document.getElementById("host-element");

// Create a shadow root and attach it to the host element
const shadowRoot = hostElement.attachShadow({ mode: "open" });

// Create an element inside the shadow root
const shadowElement = document.createElement("div");
shadowElement.setAttribute("class", "random");  //added this class and css attached to it, but that css wont work.
shadowElement.textContent = "This is inside the Shadow DOM!";

// Append the shadow element to the shadow root
shadowRoot.appendChild(shadowElement);
