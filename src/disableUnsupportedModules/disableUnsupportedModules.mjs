export default function disableUnsupportedModules(self) {
  for (let i in self.options.modules) {
    if (!self.options.modules[i]) {
      let moduleLi = document.querySelector(
        'li[data-access-action="' + i + '"]'
      );
      if (moduleLi) {
        moduleLi.classList.add("not-supported");
      }
    }
  }
}
