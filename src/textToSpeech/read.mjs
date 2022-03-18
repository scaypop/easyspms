export default function read(e) {
  try {
    e = window.event || e || arguments[0];
    if (e && e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
  } catch (error) {
    console.log(error);
  }

  let text = window.event.target.innerText;
  console.log(text);
  if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) return;
  let msg = new window.SpeechSynthesisUtterance(text);
  msg.lang = "pt-PT";
  let voices = window.speechSynthesis.getVoices();
  let isLngSupported = false;
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].lang === msg.lang) {
      msg.voice = voices[i];
      isLngSupported = true;
      break;
    }
  }
  if (!isLngSupported) {
    common.warn("text to speech language not supported!");
    // let msg = 'text to speech language not supported!';
    // if (console.warn)
    //     console.warn(msg);
    // else
    //     console.log(msg);
  }
  window.speechSynthesis.speak(msg);
}
