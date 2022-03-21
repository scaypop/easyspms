export default function runHotkey(self, name) {
  switch (name) {
    case "toggleMenu":
      self.toggleMenu();
      break;
    default:
      if (self.menuInterface.hasOwnProperty(name)) {
        if (self.options.modules[name]) {
          self.menuInterface[name](false);
        }
      }
      break;
  }
}
