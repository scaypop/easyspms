//Joao
import common from "../utils/common.js";

export default function linkHighlight(self, destroy) {
  let className = "_access-underline";
  let remove = () => {
    let style = document.querySelector("." + className);
    if (style) {
      style.parentElement.removeChild(style);
      common.deployedObjects.remove("." + className);
    }
  };

  if (destroy) {
    self.initialValues.linkHighlight = false;
    self.sessionState.linkHighlight = self.initialValues.linkHighlight;
    self.onChange(true);
    document
      .querySelector('._access-menu [data-access-action="linkHighlight"]')
      .classList.remove("active");
    return remove();
  }

  document
    .querySelector('._access-menu [data-access-action="linkHighlight"]')
    .classList.toggle("active");
  self.initialValues.linkHighlight = !self.initialValues.linkHighlight;
  self.sessionState.linkHighlight = self.initialValues.linkHighlight;
  self.onChange(true);
  if (self.initialValues.linkHighlight) {
    let css = `
                    body a {
                        text-decoration: underline !important;
                        font-size: 24px;
                        border: 2px solid red;
                    }
                `;
    common.injectStyle(css, { className: className });
    common.deployedObjects.set("." + className, true);
  } else {
    remove();
  }
}
