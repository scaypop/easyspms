import invoke from "./invoke.mjs";

export default function addListeners(self) {
  let lis = document.querySelectorAll("._access-menu ul li");

  for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener(
      "click",
      (e) => {
        let evt = e || window.event;
        invoke(self, evt.target.getAttribute("data-access-action"));
      },
      false
    );
  }
}
