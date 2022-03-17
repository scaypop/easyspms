const construtor_covid_link = {
  elements: {
    main: null,
    image: null,
    link: null,
  },

  inicio() {
    // Cria os elementos principais OTF
    this.elements.main = document.createElement("div");
    this.elements.link = document.createElement("a");
    this.elements.image = document.createElement("img");

    // Configura os sub elementos OTF
    this.elements.main.classList.add("covid_link");
    this.elements.image.classList.add("img-fluid");
    this.elements.link.title = "Covid19 - saiba mais";
    this.elements.link.href = "https://covid19.min-saude.pt/";
    this.elements.image.alt = "Covid19 - saibe mais";
    this.elements.image.src = "https://portaisars.azurewebsites.net/lvt/wp-content/plugins/covid/images/botao_COVID19_desktop.svg";

    // Constrói classe .covid_link OTF
    this.elements.main.style.right = "-1px";
    this.elements.main.style.position = "fixed";
    this.elements.main.style.zIndex = "999";
    this.elements.main.style.top = "calc(25%)";
    this.elements.main.style.width = "100px";

    // Adiciona ao DOM
    this.elements.main.appendChild(this.elements.link);
    this.elements.link.appendChild(this.elements.image);
    document.body.appendChild(this.elements.main);
  },
};
