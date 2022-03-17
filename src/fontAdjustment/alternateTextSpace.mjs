//Pavlo
import common from "../utils/common.js";

//Change space between letters
export default function alterTextSpace(self, isIncrease) {
  self.sessionState.textSpace += isIncrease ? 1 : -1;
  self.onChange(true);
  let factor = 3;
  if (!isIncrease) factor *= -1;
  if (self.options.textPixelMode) {
    let all = document.querySelectorAll("*:not(._access)");
    let exclude = Array.prototype.slice.call(
      document.querySelectorAll("._access-menu *")
    );
    for (let i = 0; i < all.length; i++) {
      if (exclude.includes(all[i])) {
        continue;
      }
      // wordSpacing
      //let fSpacing = getComputedStyle(all[i]).wordSpacing;
      let fSpacing = all[i].style.wordSpacing;
      if (fSpacing && fSpacing.indexOf("px") > -1) {
        if (!all[i].getAttribute("data-init-word-spacing"))
          all[i].setAttribute("data-init-word-spacing", fSpacing);
        fSpacing = fSpacing.replace("px", "") * 1 + factor;
        all[i].style.wordSpacing = fSpacing + "px";
      } else {
        all[i].setAttribute("data-init-word-spacing", fSpacing);
        all[i].style.wordSpacing = factor + "px";
      }

      // letterSpacing
      //let fSpacing2 = getComputedStyle(all[i]).letterSpacing;
      let fSpacing2 = all[i].style.letterSpacing;
      if (fSpacing2 && fSpacing2.indexOf("px") > -1) {
        if (!all[i].getAttribute("data-init-letter-spacing"))
          all[i].setAttribute("data-init-letter-spacing", fSpacing2);
        fSpacing2 = fSpacing2.replace("px", "") * 1 + factor;
        all[i].style.letterSpacing = fSpacing2 + "px";
      } else {
        all[i].setAttribute("data-init-letter-spacing", fSpacing2);
        all[i].style.letterSpacing = factor + "px";
      }
    }
  } else {
    // wordSpacing
    let fSpacing = common.getFormattedDimentions(
      getComputedStyle(self.body).wordSpacing
    );
    if (typeof self.initialValues.body.wordSpacing === "undefined")
      self.initialValues.body.wordSpacing = "";
    if (fSpacing && fSpacing.sufix && !isNaN(fSpacing.size * 1)) {
      self.body.style.wordSpacing = fSpacing.size * 1 + factor + fSpacing.sufix;
    }
    // letterSpacing
    let fSpacing2 = common.getFormattedDimentions(
      getComputedStyle(self.body).letterSpacing
    );
    if (typeof self.initialValues.body.letterSpacing === "undefined")
      self.initialValues.body.letterSpacing = "";
    if (fSpacing2 && fSpacing2.sufix && !isNaN(fSpacing2.size * 1)) {
      self.body.style.letterSpacing =
        fSpacing2.size * 1 + factor + fSpacing2.sufix;
    }
  }
}
