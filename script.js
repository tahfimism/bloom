
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.remove("not-loaded");
    
    // After 8.5 seconds (blooming complete), move right and start typing
    setTimeout(() => {
      document.body.classList.add("move-right");
      startTypewriter();
    }, 8500);
  }, 500);
});

function startTypewriter() {
  const textElement = document.getElementById("typewriter-text");
  const message = "Sup. \nWhere's my treat? \n\n";
  let index = 0;

  function type() {
    if (index < message.length) {
      textElement.textContent += message.charAt(index);
      index++;
      setTimeout(type, 70); // Adjust typing speed here
    }
  }

  type();
}

