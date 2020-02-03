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
    bubble.style.animation = `jump 10s linear`;
    bubble.addEventListener("animationend", function() {
      visual.removeChild(this);
    });
  };


  let liste = [];
  let is_record = false;
  document.querySelector("#record").onclick = () => {
    liste = [];
    document.querySelector('#record').classList.add('d-none');
    document.querySelector('#play').classList.add('d-none');
    document.querySelector('#stop').classList.remove('d-none');

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
    document.querySelector('#stop').classList.add('d-none');
    document.querySelector('#play').classList.remove('d-none');
    document.querySelector('#record').classList.remove('d-none');

    is_record = false;
    //  console.log(liste)
  };

  
  document.querySelector("#play").onclick = () => {

    // console.log(liste);

    for (let i = 0; i < liste.length; i++) {
      const item = liste[i];
      // console.log(i)
      if (i == 0 ){
        delay = 0;
      }else {
        delay += liste[i].temps - liste[i-1].temps ;
      }
      // console.log(delay);

      setTimeout(() => {
        item.pad.classList.add("active");
        item.pad.click();

        setTimeout(() => item.pad.classList.remove("active"), 100);

      }, delay);
    }

  };
});


document.onkeyup = function(e) {
  shortcuts = ["a","z","e","r","t","y"];

  shortcuts.forEach((shortcut,i) => {
    if (e.key == shortcut) {
      document.querySelector(`.pad${i+1}`).click();
    }
  });

}
