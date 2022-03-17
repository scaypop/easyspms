/* ------------------------------------------
   Início função para reinicializar alterações
   ------------------------------------------- */
$("#btn_resetall").click(function (e) {
  $("body").removeClass();
  $("body").addClass("p-4"); // colocar a class original (neste caso p-4)
  $("#realcaLinkCheck").hide();
  $("#keyboardNavCheck").hide();
  $("#keyboardNavMenu").hide();
});

/* ------------------------------------------
   Fim função para reinicializar alterações
   ------------------------------------------- */
