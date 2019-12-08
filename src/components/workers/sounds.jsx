import ding from "../../public/ding_01.mp3";

export function playSound(volume) {
  function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.volume = volume;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
      this.sound.play();
    };
    this.stop = function() {
      this.sound.pause();
    };
  }

  const dingSound = new Sound(ding);

  dingSound.play();
}

export default {
  playSound
};
