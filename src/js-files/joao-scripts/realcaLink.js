// sempre que a div com o id = btn_realcalink é clicado executa esta função
$("#btn_realcalink").click(function (e) {
  //var element = document.getElementById("check");

  //Se o <body> tem a função RealcaLink ativa, remove a classe (não mostra os links realçados)
  //Se não tiver ativa, então adiciona a class "realcaLink" para mostrar os links realçados
  if ($("body").hasClass("RealcaLink")) {
    $("body").removeClass("RealcaLink");
    $("#realcaLinkCheck").removeClass("Ativa");
    $("#realcaLinkCheck").hide();
  } else {
    $("body").addClass("RealcaLink");
    $("#realcaLinkCheck").addClass("Ativa");
    $("#realcaLinkCheck").show();
  }
});
