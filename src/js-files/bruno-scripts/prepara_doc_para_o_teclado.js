function vai_buscar_todos_campos_texto() {
  // VAI BUSCAR TODOS OS CAMPOS DE TEXTO DA PÁGINA PARA DEPOIS CHAMAR O TECLADO
  textarea_total = document.getElementsByTagName("textarea").length;
  input_total = document.getElementsByTagName("textarea").length;
  textarea = document.getElementsByTagName("textarea");
  input = document.getElementsByTagName("input");
  for (let i = 0; i < textarea_total && i < textarea_total; i++) {
    textarea[i].classList.add("use-keyboard-input");
    input[i].classList.add("use-keyboard-input");
  }
}
