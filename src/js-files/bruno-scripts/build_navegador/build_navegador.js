const construtor_navegador = {
  elements: {
    main: null,
    link_fechar: null,
    links_dentro: null,
    links: [
      { linkid: 1, name: "botao_modo_monocromatico", title: "Modo Monocromático" },
      { linkid: 2, name: "botao_do_teclado_virtual", title: "Teclado Virtual" },
      { linkid: 3, name: "botao_da_lupa", title: "Modo Lupa" },
      { linkid: 4, name: "botao_de_contraste", title: "Modo Alto Contraste" },
      { linkid: 5, name: "selecionar_idiomas", title: "Seleção de Idiomas" },
      { linkid: 6, name: "leitor_de_texto", title: "Modo Leitor de Texto" },
      { linkid: 7, name: "navegacao_por_teclado", title: "Navegação por Teclado" },
      { linkid: 8, name: "bloqueio_intermitencia_brilho", title: "Modo Bloqueio Int. Brilho" },
      { linkid: 9, name: "leitor_de_texto", title: "Leitor de Texto" },
      { linkid: 0, name: "teste1", title: "teste" },
      { linkid: 0, name: "teste2", title: "teste" },
      { linkid: 0, name: "teste3", title: "teste" },
      { linkid: 0, name: "teste4", title: "teste" },
      { linkid: 0, name: "teste1", title: "teste" },
      { linkid: 0, name: "teste2", title: "teste" },
      { linkid: 0, name: "teste3", title: "teste" },
      { linkid: 0, name: "teste4", title: "teste" },
    ],
    main_versao: null,
    main_versao_app: null,
    link_spms: null,
    spms: "//spms.min-saude.pt",
    ano: null,
  },

  inicio() {
    // Cria elementos principais
    this.elements.main = document.createElement("div");
    this.elements.main.setAttribute("id", "navegador_da_esquerda");
    this.elements.main.classList.add("navegador_da_esquerda", "fechado");

    // Cria link fechar X
    this.elements.link_fechar = document.createElement("a");
    this.elements.link_fechar.setAttribute("id", "botao_fechar_navegador_da_esquerda");
    this.elements.link_fechar.setAttribute("title", "Fechar Easy");
    this.elements.link_fechar.href = "#";
    this.elements.link_fechar.textContent = "x";

    // Cria barra rodapé com a versão
    this.elements.main_versao = document.createElement("div");
    this.elements.main_versao.classList.add("col-12", "fixed-bottom", "text-white", "vvvsmall", "d-flex", "justify-content-center", "link_do_rodape_do_menu", "position-absolute", "mb-2");
    this.elements.main_versao_app = document.createElement("span");
    this.elements.main_versao_app.setAttribute("id", "versao_da_aplicacao");
    this.elements.link_spms = document.createElement("a");
    this.elements.link_spms.setAttribute("title", "Serviços Partilhados do Ministério da Saúde (SPMS)");
    this.elements.link_spms.href = this.elements.spms;
    this.elements.link_spms.textContent = "SPMS";

    // Cria o ano
    this.elements.ano = document.createElement("span");
    this.elements.ano.setAttribute("id", "vai_buscar_uma_data_ano");

    // Cria as divs dos link dentro do navegador
    this.elements.links_dentro = document.createElement("div");
    this.elements.links_dentro.setAttribute("id", "links_do_navegador_da_esquerda");
    this.elements.links_lista_ul = document.createElement("ul");

    // Agrega tudo
    this.elements.main.appendChild(this.elements.link_fechar);
    this.elements.links_dentro.appendChild(this.elements.links_lista_ul);
    this.elements.main.appendChild(this.elements.links_dentro);

    // Cria os links propriamente dito com base no links.arrJSON
    for (i = 0; i < this.elements.links.length; i++) {
      if (this.elements.links[i].linkid > 0) {
        this.elements.links_lista_li = document.createElement("li");
        this.elements.links_lista_li_a = document.createElement("a");
        this.elements.links_lista_li_a.setAttribute("id", this.elements.links[i].name);
        this.elements.links_lista_li_a.setAttribute("title", this.elements.links[i].title);
        this.elements.links_lista_li_a.href = "#";
        this.elements.links_lista_li_a.textContent = this.elements.links[i].title;
        this.elements.links_lista_ul.appendChild(this.elements.links_lista_li);
        this.elements.links_lista_li.appendChild(this.elements.links_lista_li_a);
      }
    }

    this.elements.main_versao.appendChild(this.elements.main_versao_app);
    this.elements.main_versao.appendChild(this.elements.link_spms);
    this.elements.main_versao.appendChild(this.elements.ano);
    this.elements.main.appendChild(this.elements.main_versao);

    document.body.appendChild(this.elements.main);
  },
};
