// const synth = new Tone.FMSynth().toMaster();
let attack = 0.01;
let decay = 1.6;
let sustain = 0;
let release = 1.6;

let synth = new Tone.Synth(
  {
    "oscillator": {
      "type": "fatcustom",
      "partials": [0.2, 1, 0, 0.5, 0.1],
      "spread": 40,
      "count": 3
    },
    "envelope": {
      "attack": attack,
      "decay": decay,
      "sustain": sustain,
      "release": release
    }
  }
).toDestination();

window.addEventListener("load", () => {
  const sounds = document.querySelectorAll(".sound");
  const pads = document.querySelectorAll(".pads div");
  const piano = document.querySelectorAll(".piano .white")
  const visual = document.querySelector(".visual");
  const colors = [
    "#60d394",
    "#d36060",
    "#c060d3",
    "#d3d160",
    "#606bd3",
    "#60c2d3"
  ];

  $("#attack-input").change(function () {
    attack = Number($("#attack-input").val());
    synth.envelope.attack = attack;
  });

  $("#decay-input").change(function () {
    decay = Number($("#decay-input").val());
    synth.envelope.decay = decay;
  });

  $("#sustain-input").change(function () {
    sustain = Number($("#sustain-input").val());
    synth.envelope.sustain = sustain;
  });

  $("#release-input").change(function () {
    release = Number($("#release-input").val());
    synth.envelope.release = release;
  });



  piano.forEach((key, index) => {
    key.addEventListener("click", function () {
      gamme = ["C", "D", "E", "F", "G", "A", "B"];
      synth.triggerAttackRelease(gamme[index] + '4', 0.5)

      this.classList.add('active');
      setTimeout(() => {
        this.classList.remove('active');
      }, 200);

      createBubble(index);
    })
  })

  pads.forEach((pad, index) => {
    // $('.piano').is(':visible') ? elements = piano : elements = pads
    // elements.forEach((pad, index) => {
    pad.addEventListener("click", function () {
      // sounds[index].currentTime = 0;
      gamme = ["C", "D", "E", "F", "G", "A", "B"];
      synth.triggerAttackRelease(gamme[index] + '4', 0.5)
      // sounds[index].play();
      createBubble(index);
    });
  });

  const createBubble = index => {
    //Create bubbles
    const bubble = document.createElement("div");
    visual.appendChild(bubble);
    bubble.style.backgroundColor = colors[index];
    bubble.style.animation = `jump 10s linear`;
    bubble.addEventListener("animationend", function () {
      visual.removeChild(this);
    });
  };


  let liste = [];
  let is_record = false;
  let gammes = ["C", "D", "E", "F", "G", "A", "B"];
  document.querySelector("#record").onclick = () => {
    liste = [];
    document.querySelector('#record').classList.add('d-none');
    document.querySelector('#play').classList.add('d-none');
    document.querySelector('#stop').classList.remove('d-none');

    is_record = true;
    $('.piano').is(':visible') ? elements = piano : elements = pads
    // piano.forEach((pad, index) => {
    elements.forEach((pad, index) => {
      pad.addEventListener(
        "click",
        function () {
          // console.log(pad)

          if (is_record) {
            var temps = Date.now();
            liste.push({
              son: sounds[index],
              temps: temps,
              pad: document.querySelector(`.pad${index + 1}`),
              pad2: document.querySelector(`.${gammes[index + 1]}`),
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
      if (i == 0) {
        delay = 0;
      } else {
        delay += liste[i].temps - liste[i - 1].temps;
      }
      // console.log(delay);

      setTimeout(() => {
        item.pad.classList.add("active");
        item.pad2.classList.add('active');

        item.pad.click();

        setTimeout(() => {
          item.pad.classList.remove("active")
          item.pad2.classList.remove('active');
        },100);

        
        

      }, delay);
    }

  };
});


document.onkeypress = function (e) {
  shortcuts = ["a", "z", "e", "r", "t", "y", "u"];
  gammes = ["C", "D", "E", "F", "G", "A", "B"];

  shortcuts.forEach((shortcut, i) => {
    if (e.key == shortcut) {
      // document.querySelector(`.pad${i+1}`).click();
      document.querySelector(`.white.${gammes[i]}`).click();
    }
  });

}
