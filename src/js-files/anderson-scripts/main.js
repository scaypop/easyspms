(function () {
  let accessibilityTootipBox = document.getElementById(
    "accessibilityTootipBox"
  );

  function _showTootip() {
    accessibilityTootipBox.style.display = "block";
    accessibilityTootipBox.style.color = "white";
  }

  function _hideTootip() {
    accessibilityTootipBox.style.display = "none";
    accessibilityTootipBox.style.color = "transparent";
  }

  /**
   *
   * @param {CSSStyleDeclaration} styles
   */
  function _setCustomStyleTootip(styles) {
    for (const key in styles) {
      accessibilityTootipBox.style[key] = styles[key];
    }
  }

  function _setTootipText(text) {
    accessibilityTootipBox.innerHTML = text;
  }

  function _onMouseMoveForTootip(event) {
    _showTootip()
    if (event.x <= window.innerWidth / 2) {
      accessibilityTootipBox.style.left = `${event.x + 20}px`;
      accessibilityTootipBox.style.right = "auto";
    } else {
      accessibilityTootipBox.style.right = `${window.innerWidth - event.x + 20
        }px`;
      accessibilityTootipBox.style.left = "auto";
    }
  }

  /**
   *******************************
   * ADICIONA A CLASSE "hasText" PARA USO DO DICIONÁRIO
   *******************************
   */

  //Adiciona classe "hasText" em todos os elementos da pagina que contem texto
  let nodes = document.evaluate(
    ".//*[normalize-space(text())]",
    document,
    null,
    XPathResult.ANY_TYPE,
    null
  );

  let textElements = [];

  let nextNode = nodes.iterateNext();

  while (!!nextNode) {
    textElements.push(nextNode);
    nextNode = nodes.iterateNext();
  }

  for (let element of textElements) {
    element.classList.add("hasText");
  }

  textElements.forEach((textElement) => {
    let childWithSameClass = textElement.querySelectorAll(".hasText");

    if (!!childWithSameClass.length) {
      textElement.childNodes.forEach((childElem, index) => {
        if (
          childElem.nodeType === 3 &&
          !!childElem.data.replace(/\r?\n|\r/, "").trim()
        ) {
          let span = document.createElement("span");

          span.classList.add("hasText");

          span.innerHTML = childElem.data;

          textElement.insertBefore(span, textElement.childNodes[index]);

          childElem.remove();
        }
      });

      textElement.classList.remove("hasText");
    }
  });

  /**
   *******************************
   * FIM ADICIONA "hasText"
   *******************************
   */

  /**
   *******************************
   * COMEÇA DICIONÁRIO
   *******************************
   */

  let btnDicio = document.getElementById("btnDicio");

  //Recupera todos os elementos com a classe "hasText" para o dicionário encontrar as palavras
  let allTexts = document.querySelectorAll(".hasText");

  /**
   * Adiciona separa frase em palavras, e adiciona o a tag "diciotext", após isso escuta eventos de "mouseenter" e "mouseleve" nas palavras
   * @param {MouseEvent} event
   */
  function _diciohandleMouseEnter(event) {
    event.target.innerHTML = event.target.innerText.replace(
      /([a-zA-Zà-úÀ-Ú]+)/g,
      "<diciotext class='dicioTooltip'>$1</diciotext>"
    );

    let words = event.target.getElementsByTagName("diciotext");

    let fetchMeaningTimeOut = null;

    let onMouseMoveWord = (wordEvent) => {
      _onMouseMoveForTootip(wordEvent);
      _setCustomStyleTootip({
        top: `${wordEvent.y - wordEvent.target.offsetHeight * 2}px`,
      });
    };

    let onMouseEnterWord = (wordEvent) => {
      wordEvent.target.style.backgroundColor = "red";

      _setTootipText("Procurando siginificado...");

      fetchMeaningTimeOut = setTimeout(() => {
        _fetchMeaning(wordEvent.target.innerText);
      }, 1000);
    };

    for (const word of words) {
      word.addEventListener("mouseenter", onMouseEnterWord);

      word.addEventListener("mousemove", onMouseMoveWord);

      word.addEventListener("mouseout", (wordEvent) => {
        _hideTootip();
        if (!!fetchMeaningTimeOut) {
          clearTimeout(fetchMeaningTimeOut);
        }
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
  function _fetchMeaning(wordText) {
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
            let meanings = jsonResponse[0].meanings.join("<br>");
            _setTootipText(meanings);
            let currentTopValue = parseInt(accessibilityTootipBox.style.top);

            _setCustomStyleTootip({
              top: `${currentTopValue - (accessibilityTootipBox.offsetHeight - 50)
                }px`,
            });
          } else {
            _setTootipText("Siginificado não foi localizado.");
          }
        })
        .catch(() => {
          _setTootipText("Siginificado não foi localizado.");
        });
    });
  }

  /**
   * Retorna frase ao seu ponto inicial.
   * @param {MouseEvent} event
   */
  function _dicioHandleMouseLeave(event) {
    // let words = event.target.getElementsByTagName("diciotext");
    // for (const word of words) {
    //   word.addEventListener("mouseout", (wordEvent) => {
    //     accessibilityTootipBox.style.display = "none";
    //     accessibilityTootipBox.style.color = "transparent";
    //     word.removeEventListener("mousemove", onMouseMoveWord);
    //     word.removeEventListener("mouseenter", onMouseEnterWord);
    //     console.log("saiu");
    //     wordEvent.target.style.backgroundColor = "";
    //   });
    // }

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
      text.removeEventListener("mouseleave", _dicioHandleMouseLeave);
    }
  }

  /**
   * Função para ativar ou desativar o dicionário.
   * @param {MouseEvent} btnElem
   */
  function _toogleDicio(e) {
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
  btnDicio.addEventListener("click", _toogleDicio);

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

  let comboBoxLanguages = document.getElementById("comboBoxLanguages");

  let resetTranslate = document.getElementById("resetTranslate");

  function _handleRestoreLanguage() {
    restoreLanguage();
    resetTranslate.style.display = "none";
    comboBoxLanguages.value = "";
  }
  //Escuta evento do combobox do tradutor
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

  /**
   ******************************
   * REPRODUTOR DE IMAGENS
   ******************************
   */

  let btnSpeaker = document.getElementById("btnSpeaker");
  let allImages = document.getElementsByTagName("img");
  let speaker = new SpeechSynthesisUtterance();

  /**
   * Reproduz "alt" ao clicar na imagem
   * @param {MouseEvent} event
   */
  function _imageOnClick(event) {
    let image = event.target;
    speaker.lang = "pt-BR";
    speaker.text = "Imagem sem descrição";

    if (!!image.alt) {
      speaker.text = image.alt;
    }
    speechSynthesis.speak(speaker);
  }

  function _imageMouseMove(imageEvent) {
    _onMouseMoveForTootip(imageEvent);
    _setCustomStyleTootip({
      top: `${imageEvent.y}px`,
    });
  }

  function _imageMouseEnter(imageEvent) {
    _setTootipText(imageEvent.target.alt || "Imagem sem descrição");
  }

  function _imageMouseOut() {
    _hideTootip();
  }

  /**
   * Ativa evento para reproduzir
   */
  function _enableImageSpeaker() {
    for (const image of allImages) {
      image.addEventListener("click", _imageOnClick);
      image.addEventListener("mouseenter", _imageMouseEnter);
      image.addEventListener("mousemove", _imageMouseMove);
      image.addEventListener("mouseout", _imageMouseOut);
    }
  }

  /**
   * Desativa evento do reprodutor
   */
  function _disableImageSpeaker() {
    for (const image of allImages) {
      image.removeEventListener("click", _imageOnClick);
      image.removeEventListener("mousemove", _imageMouseMove);
      image.removeEventListener("mouseenter", _imageMouseEnter);
      image.removeEventListener("mouseout", _imageMouseOut);
    }
  }

  /**
   * Alterna entre Ativado/Desativado o reprodutor da imagem
   * @param {MouseEvent} e
   */
  function _toogleImageSpeaker(e) {
    e.preventDefault();

    if (btnSpeaker.classList.contains("btn-outline-primary")) {
      _enableImageSpeaker();
      btnSpeaker.classList.remove("btn-outline-primary");
      btnSpeaker.classList.add("btn-primary");
      btnSpeaker.innerText = "Desativar reprodutor de imagem";
    } else {
      _disableImageSpeaker();
      btnSpeaker.classList.remove("btn-primary");
      btnSpeaker.classList.add("btn-outline-primary");
      btnSpeaker.innerText = "Ativar reprodutor de imagem";
    }

    btnSpeaker.blur();
  }

  btnSpeaker.addEventListener("click", _toogleImageSpeaker);

  /**
   ******************************
   * FINALIZA REPRODUTOR DE IMAGENS
   ******************************
   */
})();