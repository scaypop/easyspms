//Pavlo

//Change Text size
export default function alterTextSize(self, isIncrease) {
  self.sessionState.textSize += isIncrease ? 1 : -1;
  self.onChange(true);
  let factor = 2;
  if (!isIncrease) factor *= -1;
  if (self.options.textPixelMode) {
    let all = document.querySelectorAll("*:not(._access)");

    for (let i = 0; i < all.length; i++) {
      let fSize = getComputedStyle(all[i]).fontSize;
      if (fSize && fSize.indexOf("px") > -1) {
        if (!all[i].getAttribute("data-init-font-size"))
          all[i].setAttribute("data-init-font-size", fSize);
        fSize = fSize.replace("px", "") * 1 + factor;
        all[i].style.fontSize = fSize + "px";
      }
    }
  } else if (self.options.textEmlMode) {
    let fp = self.html.style.fontSize;
    if (fp.indexOf("%")) {
      fp = fp.replace("%", "") * 1;
      self.html.style.fontSize = fp + factor + "%";
    } else {
      common.warn("Accessibility.textEmlMode, html element is not set in %.");
    }
  } else {
    let fSize = common.getFormattedDimentions(
      getComputedStyle(self.body).fontSize
    );
    if (typeof self.initialValues.body.fontSize === "undefined")
      self.initialValues.body.fontSize = fSize.size + fSize.sufix;
    if (fSize && fSize.sufix && !isNaN(fSize.size * 1)) {
      self.body.style.fontSize = fSize.size * 1 + factor + fSize.sufix;
    }
  }
}
