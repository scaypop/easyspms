"use strict";

export default function fontFallback(self) {
  self.options.icon.useEmojis = true;
  self.options.icon.fontFamily = null;
  self.options.icon.img = "♿";
  self.options.icon.fontClass = "";
}
