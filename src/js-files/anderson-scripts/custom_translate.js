var selectGoogleTranslate = null;

/**
 * Incia google tradutor
 */
function translateInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "pt-PT",
      includedLanguages: "ar,bg,ca,cs,da,de,el,en,en-GB,en-CA,en-AU,en-ZA,es,es-MX,et,eu,fi,fr,gl,he,hr,hu,it,ja,ko,lt,lv,nb,nl,pl,pt,pt-PT,ro,ru,sk,sl,sv,tr,uk,zh,zh-CN",
      // layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
    },
    "google_translate_element"
  );
  selectGoogleTranslate = document
    .getElementById("google_translate_element")
    .querySelector(".goog-te-combo");
}

/**
 * Dispara evento para trocar o idioma
 * @param {Element} el 
 */
function changeTranslateEvent(el) {
  if (el.fireEvent) {
    el.fireEvent("onchange");
  } else {
    var evt = new Event("change", { bubbles: false, cancelable: true });
    el.dispatchEvent(evt);
  }
}

/**
 * Função que será chamada para realizar a troca de idioma
 * @param {String} sigla 
 */
function changeLanguage(sigla) {
  if (selectGoogleTranslate) {
    selectGoogleTranslate.value = sigla;
    changeTranslateEvent(selectGoogleTranslate); //Dispara a troca
  }
}

/**
 * Restora para a linguagem original
 */
function restoreLanguage() {
  var iframe = document.getElementsByClassName("goog-te-banner-frame")[0];
  if (!iframe) return;

  var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  var restore_el = innerDoc.getElementsByTagName("button");

  for (var i = 0; i < restore_el.length; i++) {
    if (restore_el[i].id.indexOf("restore") >= 0) {
      restore_el[i].click();
      var close_el = innerDoc.getElementsByClassName("goog-close-link");
      close_el[0].click();
      return;
    }
  }
}
