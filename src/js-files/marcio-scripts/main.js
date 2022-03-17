(function () {
  // selecionando os links de contraste
  var linksContraste = document.querySelectorAll("nav a[data-contraste]");

  linksContraste.forEach((linkContraste) =>
    linkContraste.addEventListener("click", function () {
      var dataContraste = this.dataset.contraste;
      contraste(dataContraste);
    })
  );

  function contraste(dataContraste) {
    var setId;

    switch (dataContraste) {
      case "1":
        setId = "contrasteClaro";
        break;

      case "2":
        setId = "contrasteEscuro";
        break;

      case "3":
        setId = "altoContraste";
        break;

      default:
        setId = "";
    }
    console.log(dataContraste);
    console.log(setId);
    document.querySelector("body").setAttribute("id", setId);
  }
})();
