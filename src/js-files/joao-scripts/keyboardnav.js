// sempre que a div com o id = btn_keyboardnav é clicado executa esta função
$("#btn_keyboardnav").click(function (e) {
  //Se o <body> tem a função RealcaLink ativa, remove a classe (não mostra os links realçados)
  //Se não tiver ativa, então adiciona a class "realcaLink" para mostrar os links realçados
  if ($("body").hasClass("KeyboardNavigation")) {
    $("body").removeClass("KeyboardNavigation");
    $("#keyboardNavCheck").removeClass("Ativa");
    $("#keyboardNavCheck").hide();
    $("#keyboardNavMenu").hide();
  } else {
    $("body").addClass("KeyboardNavigation");
    $("#keyboardNavCheck").addClass("Ativa");
    $("#keyboardNavCheck").show();
    $("#keyboardNavMenu").show();

    document.body.onkeyup = function (e) {
      if (e.keyCode == 32) {
        window.location.hash = "keyboardNavMenu";
      }
    };
  }

  //document.getElementById("youridhere").scrollIntoView();
});
