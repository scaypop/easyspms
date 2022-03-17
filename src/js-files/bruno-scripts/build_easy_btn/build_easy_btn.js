const construtor_easy_btn = {
  elements: {
    main: null,
    icon: null,
    link: null,
    svg: null,
    path: null,
  },

  inicio() {
    const d =
      "M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM256 80c22.09 0 40 17.91 40 40S278.1 160 256 160S216 142.1 216 120S233.9 80 256 80zM374.6 215.1L315.3 232C311.6 233.1 307.8 233.6 304 234.4v62.32l30.64 87.34c4.391 12.5-2.188 26.19-14.69 30.59C317.3 415.6 314.6 416 312 416c-9.906 0-19.19-6.188-22.64-16.06l-25.85-70.65c-2.562-7.002-12.46-7.002-15.03 0l-25.85 70.65C219.2 409.8 209.9 416 200 416c-2.641 0-5.312-.4375-7.953-1.344c-12.5-4.406-19.08-18.09-14.69-30.59L208 296.7V234.4C204.2 233.6 200.4 233.1 196.7 232L137.4 215.1C124.7 211.4 117.3 198.2 120.9 185.4S137.9 165.2 150.6 168.9l59.25 16.94c30.17 8.623 62.15 8.623 92.31 0l59.25-16.94c12.7-3.781 26.02 3.719 29.67 16.47C394.7 198.2 387.3 211.4 374.6 215.1z";
    // Cria elementos principais
    this.elements.main = document.createElement("div");
    this.elements.icon = document.createElement("div");
    this.elements.link = document.createElement("a");
    this.elements.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.elements.path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    // Configura sub elementos
    this.elements.main.setAttribute("id", "botao_do_easy");
    this.elements.main.classList.add("row", "d-flex", "align-items-center", "position-fixed", "bg-info", "cantos_redondos", "botao_do_easy");
    this.elements.icon.setAttribute("id", "icone_do_easy");
    this.elements.icon.classList.add("icone_do_easy", "col-12", "d-flex", "align-self-center", "pl-3", "pr-3", "pb-1", "pt-1");
    this.elements.link.href = "#";
    this.elements.svg.setAttribute("id", "svgpath");
    this.elements.svg.classList.add("imagem_svg_easy", "float-left", "my-2");
    //this.elements.svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.elements.svg.setAttribute("viewBox", "0 0 512 512");
    this.elements.path.setAttribute("d", d);

    // Adiciona ao DOM
    this.elements.svg.appendChild(this.elements.path);
    this.elements.link.appendChild(this.elements.svg);
    this.elements.icon.appendChild(this.elements.link);
    this.elements.main.appendChild(this.elements.icon);
    document.body.appendChild(this.elements.main);
  },
};
