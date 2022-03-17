/* MODO MONOCROMÁTICO */
/* FUNÇÃO MODO MONOCROMÁTICO COM ANIMAÇÃO - JQUERY*/
$("#botao_modo_monocromatico").click(function () {
  $(".container-fluid, container, main, header, nav, footer, div:not(.covid_link, #botao_do_easy, #icone_do_easy, .link_do_rodape_do_menu) ").toggleClass("modo_monocromatico");
  $("#icone_do_easy").toggleClass("preenchimento_do_easy");
  event.stopPropagation();
  return false;
});
