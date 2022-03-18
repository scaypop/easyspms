export default function invoke(self, action) {
  if (typeof self.menuInterface[action] === "function")
    self.menuInterface[action]();
}
