export default function parseKeys(self, arr) {
  return self.options.hotkeys.enabled
    ? self.options.hotkeys.helpTitles
      ? "Hotkey: " +
        arr
          .map(function (val) {
            return Number.isInteger(val)
              ? String.fromCharCode(val).toLowerCase()
              : val.replace("Key", "");
          })
          .join("+")
      : ""
    : "";
}
