"use strict";
import common from "../common.js";

function initFontSize(self) {
  // store this values only once.
  if (!self.htmlInitFS) {
    let htmlInitFS = common.getFormattedDimentions(
      getComputedStyle(self.html).fontSize
    );
    let bodyInitFS = common.getFormattedDimentions(
      getComputedStyle(self.body).fontSize
    );
    self.html.style.fontSize = (htmlInitFS.size / 16) * 100 + "%";
    self.htmlOrgFontSize = self.html.style.fontSize;
    self.body.style.fontSize = bodyInitFS.size / htmlInitFS.size + "em";
  }
}

export default initFontSize;
