"use strict";

//use in case if main font was not loaded. Have to be improved
export default function fontFallback(self) {
  self.options.icon.useEmojis = true;
  self.options.icon.fontFamily = null;
  self.options.icon.img = "♿";
  self.options.icon.fontClass = "";
}
