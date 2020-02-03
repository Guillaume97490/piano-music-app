window.addEventListener("load", () => {
  const sounds = document.querySelectorAll(".sound");
  const pads = document.querySelectorAll(".pads div");
  const visual = document.querySelector(".visual");
  const colors = [
    "#60d394",
    "#d36060",
    "#c060d3",
    "#d3d160",
    "#606bd3",
    "#60c2d3"
  ];

  pads.forEach((pad, index) => {
    pad.addEventListener("click", function() {
      sounds[index].currentTime = 0;
      sounds[index].play();
      createBubble(index);
    });
  });

  const createBubble = index => {
    //Create bubbles
    const bubble = document.createElement("div");
    visual.appendChild(bubble);
    bubble.style.backgroundColor = colors[index];
    bubble.style.animation = `jump 3s ease`;
    bubble.addEventListener("animationend", function() {
      visual.removeChild(this);
    });
  };

  var liste = [];
  var is_record = false;
  document.querySelector("#record").onclick = () => {
    is_record = true;
    document.querySelectorAll(".pads div").forEach((pad, index) => {
      pad.addEventListener(
        "click",
        function() {
          // console.log(pad)

          if (is_record) {
            var temps = Date.now();
            liste.push({
              son: sounds[index],
              temps: temps,
              pad: document.querySelector(`.pad${index + 1}`)
            });
          }
        },
        false
      );
    });
  };


  document.querySelector("#stop").onclick = () => {
    is_record = false;
    //  console.log(liste)
  };

  
  document.querySelector("#play").onclick = () => {
    console.log(liste);

    for (let i = 0; i < liste.length; i++) {
      const item = liste[i];
      if (i == 0 ){
        delai = 0;
      }else {
        delai = liste[i].temps - liste[i-1].temps;
      }
      setTimeout(() => {
        item.pad.click();
      }, delai);

    }

  };
});

function songPlay(son){
  son.play();
}

function wait(ms) {
  var start = Date.now(),
      now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}