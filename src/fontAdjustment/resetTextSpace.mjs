"use strict";

export default function resetTextSpace(self) {
  self.resetIfDefined(
    self.initialValues.body.wordSpacing,
    self.body.style,
    "wordSpacing"
  );
  self.resetIfDefined(
    self.initialValues.body.letterSpacing,
    self.body.style,
    "letterSpacing"
  );
  let all = document.querySelectorAll("[data-init-word-spacing]");
  let all2 = document.querySelectorAll("[data-init-letter-spacing]");

  for (let i = 0; i < all.length; i++) {
    all[i].style.wordSpacing = all[i].getAttribute("data-init-word-spacing");
    all[i].removeAttribute("data-init-word-spacing");
  }
  for (let i = 0; i < all2.length; i++) {
    all[i].style.letterSpacing = all[i].getAttribute(
      "data-init-letter-spacing"
    );
    all[i].removeAttribute("data-init-letter-spacing");
  }

  self.sessionState.textSpace = 0;
  self.onChange(true);
}
