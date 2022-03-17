(function () {
 
  // selecionando os links de contraste
  var linksContraste = document.querySelectorAll('nav a[data-contraste]');
  var linksSaturacao = document.querySelectorAll('nav a[data-saturacao]');

  linksContraste.forEach(linksContraste => 
    linksContraste.addEventListener('click', function() {
      var dataContraste = this.dataset.contraste;
      contraste(dataContraste);
    })
  );

  linksSaturacao.forEach(linksSaturacao =>
    linksSaturacao.addEventListener('click', function() {
      var dataSaturacao = this.dataset.saturacao;
      saturacao(dataSaturacao);
    })
  );

  function contraste(dataContraste) {
    var setId;

    switch (dataContraste) {
      case '1':
        setId = 'contrasteClaro';
        break;

      case '2':
        setId = 'contrasteEscuro';
        break;

      case '3':
        setId = 'altoContraste';
        break;

      default:
        setId = '';
    }
    
    document.querySelector('body').setAttribute('id', setId);
    document.cookie = 'contraste=' + setId + '';
  }

  function saturacao(value)
  {
    var rows = document.querySelectorAll('.row-collors');

    rows.forEach(row => {
      
      if ($(row).css('filter') == 'none') {
        $(row).css('filter', 'saturate(90%)');
      }

      var cssFilter = $(row).css('filter');
      var saturate  = parseFloat(cssFilter.match(/[\d\.]+/));

      if (value == 'less') {
        saturate = saturate - 0.1;
      } else {
        saturate = saturate + 0.1;
      }

      $(row).css('filter', 'saturate(' + saturate + ')');
    });
  }

  function getHSL(rgb)
  {
    rgb = rgb.replace(/^\s*#|\s*$/g, ''); // remove # da string de cor

    if(rgb.length == 3){
      rgb = rgb.replace(/(.)/g, '$1$1');
    }

    var r     = parseInt(rgb.substr(0, 2), 16) / 255,
        g     = parseInt(rgb.substr(2, 2), 16) / 255,
        b     = parseInt(rgb.substr(4, 2), 16) / 255,
        
        cMax  = Math.max(r, g, b),
        cMin  = Math.min(r, g, b),
        delta = cMax - cMin,
        
        l     = (cMax + cMin) / 2,
        h     = 0,
        s     = 0;

    if (delta == 0) {
        h = 0;
    } else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    } else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    } else {
      h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
      s = 0;
    } else {
      s = (delta/(1-Math.abs(2*l - 1)))
    }

    return {
      h: h,
      s: s,
      l: l
    }
  }

  // Verificando o cookie
  var cookieContrasteClaro  = document.cookie.indexOf('contrasteClaro');
  var cookieContrasteEscuro = document.cookie.indexOf('contrasteEscuro');
  var cookieAltoContraste   = document.cookie.indexOf('altoContraste');

  // Verificando o cookie setado anteriormente
  var cookieTrue = '';
  if (cookieContrasteClaro != -1) {
    cookieTrue = 1;
  } else if (cookieContrasteEscuro != -1) {
    cookieTrue = 2;
  } else if (cookieAltoContraste != -1) {
    cookieTrue = 3;
  } else {
    cookieTrue = '';
  }

  contraste(cookieTrue);
})();
