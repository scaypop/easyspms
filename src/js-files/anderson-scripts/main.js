(function () {
  //Adiciona classe "hasText" em todos os elementos da pagina que contem texto
  var nodes = document.evaluate(
    ".//*[normalize-space(text())]",
    document,
    null,
    XPathResult.ANY_TYPE,
    null
  );

  var textElements = [];

  var nextNode = nodes.iterateNext();
  var count = 0;
  while (!!nextNode) {
    textElements.push(nextNode);
    nextNode = nodes.iterateNext();
    count++;
  }

  for (var element of textElements) {
    element.classList.add("hasText");
  }

  /**
   *******************************
   * COMEÇA DICIONÁRIO
   *******************************
   */

  var btnDicio = document.getElementById("btnDicio");

  //Recupera todos os elementos com a classe "hasText" para o dicionário encontrar as palavras
  var allTexts = textElements;

  /**
   * Adiciona separa frase em palavras, e adiciona o a tag "diciotext", após isso escuta eventos de "mouseenter" e "mouseleve" nas palavras
   * @param {Event} event
   */
  function _diciohandleMouseEnter(event) {

    // event.target.childNodes.forEach((childElem, index) => {
    //   if (
    //     childElem.nodeType === 3 &&
    //     !!childElem.data.replace(/\r?\n|\r/, "").trim()
    //   ) {
    //     let span = document.createElement("span");

    //     span.classList.add("hasText");

    //     span.innerHTML = childElem.data;

    //     event.target.insertBefore(span, event.target.childNodes[index + 1]);

    //     childElem.remove();
    //   }
    // });

    event.target.innerHTML = event.target.innerText.replace(
      /([a-zA-Zà-úÀ-Ú]+)/g,
      "<diciotext class='dicioTooltip'>$1</diciotext>"
    );

    var words = event.target.getElementsByTagName("diciotext");
    var spanElement = document.createElement("span");

    for (const word of words) {
      word.addEventListener("mouseenter", (wordEvent) => {
        _fetchMeaning(
          wordEvent.target,
          wordEvent.target.innerText,
          spanElement
        );
        wordEvent.target.style.backgroundColor = "red";
      });
      word.addEventListener("mouseleave", (wordEvent) => {
        wordEvent.target.removeChild(spanElement);
        wordEvent.target.style.backgroundColor = "";
      });
    }
  }

  /**
   * Procura sigificado da palavra
   * @param {EventTarget} wordElement
   * @param {String} wordText
   * @param {HTMLElement} wordText
   */
  function _fetchMeaning(wordElement, wordText, spanElement) {
    spanElement.classList.add("dicioTooltipText");
    spanElement.innerHTML = "Procurando siginificado...";
    wordElement.appendChild(spanElement);
    fetch(
      `https://significado.herokuapp.com/meanings/${wordText
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()}`
    ).then((response) => {
      response
        .json()
        .then((jsonResponse) => {
          if (!!jsonResponse.length) {
            const meanings = jsonResponse[0].meanings.join("<br>");
            spanElement.innerHTML = meanings;
          } else {
            spanElement.innerHTML = "Siginificado não foi localizado.";
          }
        })
        .catch((err) => {
          console.log(err);
          spanElement.innerHTML = "Siginificado não foi localizado.";
        });
    });
  }

  /**
   * Retorna frase ao seu ponto inicial.
   * @param {Event} event
   */
  function _dicioHandleMouseLeave(event) {
    event.target.innerHTML = event.target.innerText;
  }

  /**
   * Habilita evento "mouseenter" ao ativar o dicionário.
   */
  function _dicioEnableOnHoverText() {
    for (const text of allTexts) {
      text.addEventListener("mouseenter", _diciohandleMouseEnter);
      text.addEventListener("mouseleave", _dicioHandleMouseLeave);
    }
  }

  /**
   * Desabilita evento "mouseenter" ao desativar o dicionário.
   */
  function _dicioDisableOnHoverText() {
    for (const text of allTexts) {
      text.removeEventListener("mouseenter", _diciohandleMouseEnter);
    }
  }

  /**
   * Função para ativar ou desativar o dicionário.
   * @param {MouseEvent} btnElem
   */
  function _handleDicio(e) {
    e.preventDefault();

    if (btnDicio.classList.contains("btn-outline-primary")) {
      _dicioEnableOnHoverText();
      btnDicio.classList.remove("btn-outline-primary");
      btnDicio.classList.add("btn-primary");
      btnDicio.innerText = "Desativar Dicionário";
    } else {
      _dicioDisableOnHoverText();
      btnDicio.classList.remove("btn-primary");
      btnDicio.classList.add("btn-outline-primary");
      btnDicio.innerText = "Ativar Dicionário";
    }

    btnDicio.blur();
  }

  /**
   * Escuta evento "click" para ativa ou desativar o dicionário
   */
  btnDicio.addEventListener("click", _handleDicio);

  /**
   ********************************
   * FINALIZA DICIONÁRIO
   ********************************
   */

  /**
   *******************************
   * COMEÇA TRADUTOR
   *******************************
   */

  //OBS: Tradutor é iniciado no arquivo "custom_translate.js";

  //Escuta evento do combobox do tradutor
  var comboBoxLanguages = document.getElementById("comboBoxLanguages");

  var resetTranslate = document.getElementById("resetTranslate");

  function _handleRestoreLanguage() {
    restoreLanguage();
    resetTranslate.style.display = "none";
    comboBoxLanguages.value = "";
  }

  comboBoxLanguages.addEventListener("change", (event) => {
    if (!!event.target.value) {
      changeLanguage(event.target.value);
      resetTranslate.style.display = "block";
    } else {
      _handleRestoreLanguage();
    }
  });

  resetTranslate.addEventListener("click", _handleRestoreLanguage);

  /**
   ******************************
   * FINALIZA TRADUTOR
   ******************************
   */
})();
