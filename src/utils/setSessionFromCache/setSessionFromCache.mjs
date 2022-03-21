import storage from "../storage.js";
import alterLineHeight from "../../fontAdjustment/alternateLineHeight.mjs";
import alterTextSpace from "../../fontAdjustment/alternateTextSpace.mjs";
import alterTextSize from "../../fontAdjustment/alternateTextSize.mjs";

export default function setSessionFromCache(self) {
  let sessionState = storage.get("_accessState");
  if (sessionState) {
    if (sessionState.textSize) {
      let textSize = sessionState.textSize;
      if (textSize > 0) {
        while (textSize--) {
          alterTextSize(self, true);
        }
      } else {
        while (textSize++) {
          alterTextSize(self, false);
        }
      }
    }
    if (sessionState.textSpace) {
      let textSpace = sessionState.textSpace;
      if (textSpace > 0) {
        while (textSpace--) {
          alterTextSpace(self, true);
        }
      } else {
        while (textSpace++) {
          alterTextSpace(self, false);
        }
      }
    }
    if (sessionState.lineHeight) {
      let lineHeight = sessionState.lineHeight;
      if (lineHeight > 0) {
        while (lineHeight--) {
          alterLineHeight(self, true);
        }
      } else {
        while (lineHeight++) {
          alterLineHeight(self, false);
        }
      }
    }
    if (sessionState.invertColors) self.menuInterface.invertColors();
    if (sessionState.grayHues) self.menuInterface.grayHues();
    if (sessionState.linkHighlight) self.menuInterface.linkHighlight();
    if (sessionState.bigCursor) self.menuInterface.bigCursor();
    if (sessionState.readingGuide) self.menuInterface.readingGuide();
    self.sessionState = sessionState;
  }
}
