(function () {
  var list = document.querySelector("ul");
  console.log(list);
  var items = list.querySelectorAll("button");
  var codes = { 38: -5, 40: 5, 39: 1, 37: -1 };

  for (var i = 0; i < items.length; i++) {
    items[i].count = i;
  }

  //função que receber a leitura do teclado

  function handlekeys(ev) {
    //console.log(ev);

    //tecla seta esquerda carregada
    if (ev.keyCode == "37") {
      console.log("Carreguei na tecla da esquerda");
      document.getElementsByTagName("a").style.textDecoration =
        "underline overline";
    }

    //tecla seta cima carregada
    if (ev.keyCode == "38") {
      console.log("Carreguei na tecla de cima");
    }

    //tecla seta direita carregada
    if (ev.keyCode == "39") {
      console.log("Carreguei na tecla da direita");
    }

    //tecla seta baixo carregada
    if (ev.keyCode == "40") {
      console.log("Carreguei na tecla de baixo");
    }
  }
  list.addEventListener("keyup", handlekeys);
})();
