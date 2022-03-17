/* BASICS */
/* DATA DE ATUALIZAÇÃO */

/* DEBUG */
let DEBUG = true;
if (!DEBUG) {
  if (!window.console) window.console = {};
  let methods = ["log", "debug", "warn", "info"];
  for (let i = 0; i < methods.length; i++) {
    console[methods[i]] = function () {};
  }
}

console.log(" ************* Easy Starting ************* ");

window.addEventListener("DOMContentLoaded", function () {
  // INICIALIZA CONSTRUTORES
  construtor_navegador.inicio();
  construtor_easy_btn.inicio();
  construtor_covid_link.inicio();
  vai_buscar_todos_campos_texto();
  construtor_teclado_virtual._isMobile();

  // INSERE A VERSÃO DA APLICAÇÃO E O ANO NO RODAPÉ DO EASY
  versao_da_aplicacao = document.getElementById("versao_da_aplicacao");
  vai_buscar_uma_data_ano = document.getElementById("vai_buscar_uma_data_ano");
  versao_da_aplicacao.innerHTML = "ver 1.0&nbsp;";
  vai_buscar_uma_data_ano.innerHTML = "&nbsp;&copy;" + vai_buscar_uma_data("vai_buscar_uma_data_ano");

  /* FUNÇÃO FECHA MENU COM ANIMAÇÃO - JQUERY*/
  $("#botao_fechar_navegador_da_esquerda").click(function () {
    $("#navegador_da_esquerda").animate(
      {
        width: "0px",
      },
      400
    );
    $(".container-fluid").animate(
      {
        marginLeft: "0px",
      },
      1200
    );
    $("#botao_do_easy").animate(
      {
        marginLeft: "0px",
      },
      400
    );
    $("#icone_do_easy").addClass("ml-4");
    setTimeout(function () {
      $("#icone_do_easy").removeClass("ml-4");
    }, 700);
    event.stopPropagation();
    return false;
  });

  /* FUNÇÃO ABRE MENU COM ANIMAÇÃO - JQUERY*/
  $("#botao_do_easy").click(function () {
    $("#navegador_da_esquerda").animate(
      {
        width: "270px",
      },
      1
    );
    $(".container-fluid").animate(
      {
        marginLeft: "270px",
      },
      400
    );
    $("#botao_do_easy").animate(
      {
        marginLeft: "270px",
      },
      400
    );
    $("#links_do_navegador_da_esquerda").fadeIn();
    $(".link_do_rodape_do_menu").fadeIn();
    $("#icone_do_easy").addClass("mx-3").addClass("px-1");
    setTimeout(function () {
      $("#icone_do_easy").removeClass("mx-3").removeClass("px-1");
    }, 400);
    event.stopPropagation();
    return false;
  });

  /* FUNÇÃO MODO MONOCROMÁTICO COM ANIMAÇÃO - JQUERY*/
  $("#botao_modo_monocromatico").click(function () {
    $(".container-fluid, container, main, header, nav, footer, div:not(.covid_link, #botao_do_easy, #icone_do_easy, .link_do_rodape_do_menu) ").toggleClass("modo_monocromatico");
    $("#icone_do_easy").toggleClass("preenchimento_do_easy");
    event.stopPropagation();
    return false;
  });

  /* FUNÇÃO ABRE/FECHA TECLADO VIRTUAL COM ANIMAÇÃO - JQUERY*/
  $("#botao_do_teclado_virtual").click(function () {
    $(".keyboard").hasClass("keyboard--hidden") ? construtor_teclado_virtual.open() : construtor_teclado_virtual.close();
    event.stopPropagation();
    return false;
  });
});
