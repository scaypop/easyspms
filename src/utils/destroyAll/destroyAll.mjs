import common from "../common.js";

//Include if we gonna need to destroy all the Accessebility Elements
export default function destroyAll() {
  let allSelectors = common.deployedObjects.getAll();
  for (let i of allSelectors) {
    let elem = document.querySelector(i);
    if (elem) {
      elem.parentElement.removeChild(elem);
    }
  }
}
