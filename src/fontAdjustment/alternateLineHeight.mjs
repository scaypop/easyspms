//Change Text size
export default function alterLineHeight(self, isIncrease) {
  self.sessionState.lineHeight += isIncrease ? 1 : -1;
  self.onChange(true);
  let factor = 3;
  if (!isIncrease) factor *= -1;
  if (self.options.textPixelMode || self.options.textEmlMode) {
    let all = document.querySelectorAll("*:not(._access)");
    for (let i = 0; i < all.length; i++) {
      let lineHeightSize = getComputedStyle(all[i]).lineHeight;
      if (lineHeightSize && lineHeightSize.indexOf("px") > -1) {
        if (!all[i].getAttribute("data-init-line-height"))
          all[i].setAttribute("data-init-line-height", lineHeightSize);
        lineHeightSize = lineHeightSize.replace("px", "") * 1 + factor;
        all[i].style.lineHeight = lineHeightSize + "px";
      }
    }
    let fp = self.html.style.lineHeight;
    if (fp.indexOf("%")) {
      fp = fp.replace("%", "") * 1;
      self.html.style.lineHeight = fp + factor + "%";
    } else {
      common.warn("Accessibility.textEmlMode, html element is not set in %.");
    }
  } else {
    let fSize = common.getFormattedDimentions(
      getComputedStyle(self.body).lineHeight
    );
    if (typeof self.initialValues.body.lineHeight === "undefined")
      self.initialValues.body.lineHeight = fSize.size + fSize.sufix;
    if (fSize && fSize.sufix && !isNaN(fSize.size * 1)) {
      self.body.style.lineHeight = fSize.size * 1 + factor + fSize.sufix;
    }
  }
}
