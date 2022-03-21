import common from "../common.js";

export default function disabledUnsupportedFeatures(self) {
  if (!("webkitSpeechRecognition" in window) || location.protocol != "https:") {
    common.warn(
      "speech to text isn't supported in your browser or in http protocol (https required)"
    );
    self.options.modules.speechToText = false;
  }
  if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
    common.warn("text to speech isn't supported in self browser");
    self.options.modules.textToSpeech = false;
  }
  if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
    common.warn("grayHues isn't supported in firefox");
    self.options.modules.grayHues = false;
  }
}
