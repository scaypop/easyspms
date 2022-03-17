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

  // **************************
  //Fim da função que receber a leitura do teclado
  // **************************

  // **************************
  //Início função que evidencia os links
  // **************************
  $("#botao").click(function (e) {
    /*
    if ($("#mudarLink").hasClass("ComEfeito")) {
      $("#mudarLink").removeClass("ComEfeito");
    } else {
      $("#mudarLink").addClass("ComEfeito");
    }*/

    if ($("body").hasClass("ComEfeito")) {
      $("body").removeClass("ComEfeito");
    } else {
      $("body").addClass("ComEfeito");
    }
  });

  // **************************
  //Fim função que evidencia os links
  // **************************

  // **************************
  //Início função da lupa de todo o site
  // **************************

  $("#lupa").click(function (e) {
    if ($("body").hasClass("Lupa")) {
      $("body").removeClass("Lupa");
    } else {
      $("body").addClass("Lupa");
    }
  });

  // **************************
  //Fim função da lupa de todo o site
  // **************************

  // **************************
  //Início função da lupa apenas onde o cursos passa
  // **************************

  $("#lupaTexto").click(function (e) {
    if ($("body").hasClass("LupaTexto")) {
      $("body").removeClass("LupaTexto");
    } else {
      $("body").addClass("LupaTexto");
    }
  });
  /* ------------------------------------------
   Fim função da lupa apenas onde o cursos passa
   ------------------------------------------- */

  /* ------------------------------------------
   Início função para reinicializar alterações
   ------------------------------------------- */
  $("#desligaAlteracoes").click(function (e) {
    $("body").removeClass();
    $("body").addClass("p-4"); // colocar a class original (neste caso p-4)
  });

  /* ------------------------------------------
   Fim função para reinicializar alterações
   ------------------------------------------- */
})();
