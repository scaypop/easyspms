"use strict";
import resetIfDefined from "../utils/resetIfDefined/resetIfDefined.mjs";

export default function resetTextSize(self) {
  resetIfDefined(self.initialValues.body.fontSize, self.body.style, "fontSize");
  if (typeof self.htmlOrgFontSize !== "undefined")
    self.html.style.fontSize = self.htmlOrgFontSize;
  let all = document.querySelectorAll("[data-init-font-size]");

  for (let i = 0; i < all.length; i++) {
    all[i].style.fontSize = all[i].getAttribute("data-init-font-size");
    all[i].removeAttribute("data-init-font-size");
  }

  self.sessionState.textSize = 0;
  self.onChange(true);
}
