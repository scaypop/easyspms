"use strict";

export default function resetLineHeight(self) {
  self.resetIfDefined(
    self.initialValues.body.lineHeight,
    self.body.style,
    "lineHeight"
  );
  let all = document.querySelectorAll("[data-init-line-height]");

  for (let i = 0; i < all.length; i++) {
    all[i].style.lineHeight = all[i].getAttribute("data-init-line-height");
    all[i].removeAttribute("data-init-line-height");
  }

  self.sessionState.lineHeight = 0;
  self.onChange(true);
}
