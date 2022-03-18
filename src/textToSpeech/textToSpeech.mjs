"use strict";
import common from "../utils/common.js";
import read from "./read.mjs";

export default function textToSpeech(self, destroy) {
  self.sessionState.textToSpeech =
    typeof destroy === "undefined" ? true : false;
  self.onChange(false);
  let className = "_access-text-to-speech";
  let remove = () => {
    let style = document.querySelector("." + className);
    if (style) {
      style.parentElement.removeChild(style);
      document.removeEventListener("click", read, false);
      common.deployedObjects.remove("." + className);
    }
  };

  if (destroy) {
    document
      .querySelector('._access-menu [data-access-action="textToSpeech"]')
      .classList.remove("active");
    self.initialValues.textToSpeech = false;
    return remove();
  }

  document
    .querySelector('._access-menu [data-access-action="textToSpeech"]')
    .classList.toggle("active");

  self.initialValues.textToSpeech = !self.initialValues.textToSpeech;
  if (self.initialValues.textToSpeech) {
    let css = `
                        *:hover {
                            box-shadow: 2px 2px 2px rgba(180,180,180,0.7);
                        }
                    `;
    common.injectStyle(css, { className: className });
    common.deployedObjects.set("." + className, true);
    document.addEventListener("click", read, false);
  } else {
    remove();
  }
}
