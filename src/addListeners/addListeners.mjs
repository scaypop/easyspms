import invoke from "./invoke.mjs";

export default function addListeners(self) {
  let functionalidades = document.querySelectorAll("._access-menu ul li");

  for (let i = 0; i < functionalidades.length; i++) {
    functionalidades[i].addEventListener(
      "click",
      (e) => {
        let event = e || window.event;
        invoke(self, event.target.getAttribute("data-access-action"));
      },
      false
    );
    functionalidades[i].addEventListener(
      "keypress",
      (e) => {
        let event = e || window.event;
        invoke(self, event.target.getAttribute("data-access-action"));
      },
      false
    );
  }
}
