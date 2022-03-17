function vai_buscar_uma_data(a) {
  /* VANILLA JS PURO */
  try {
    const dia = document.querySelectorAll(".vai_buscar_uma_data_dia"),
      mes = document.querySelectorAll(".vai_buscar_uma_data_mes"),
      ano = document.querySelectorAll(".vai_buscar_uma_data_ano"),
      hora = document.querySelectorAll(".vai_buscar_uma_data_hora"),
      semana = document.querySelectorAll(".vai_buscar_uma_data_semana"),
      dateToday = new Date(),
      months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    let i = 0;

    if (a === "dia") {
      let day = dateToday.getDate();
      for (i; i < dia.length; i++) {
        dia[i].innerHTML = day;
      }
      console.log(day);
      return day;
    }

    if (a === "mes") {
      let month = months[dateToday.getMonth()];
      for (i; i < mes.length; i++) {
        mes[i].innerHTML = month;
      }
      console.log(month);
      return month;
    }

    if (a === "vai_buscar_uma_data_ano") {
      let year = dateToday.getFullYear();
      for (i; i < ano.length; i++) {
        ano[i].innerHTML = year;
      }
      console.log(year);
      return year;
    }

    if (a === "semana") {
      let week = daysOfWeek[dateToday.getDay()];
      for (i; i < semana.length; i++) {
        semana[i].innerHTML = week;
      }
      console.log(week);
      return week;
    }

    if (a === "hora") {
      let h = dateToday.getHours(),
        m = dateToday.getMinutes(),
        s = dateToday.getSeconds(),
        time = h + "h:" + m + "m:" + s + "s";

      for (i; i < hora.length; i++) {
        hora[i].innerHTML = time;
      }
      console.log(time);
      return time;
    }
  } catch (e) {
    console.log(e);
    console.log(" // error");
  }
}
vai_buscar_uma_data("vai_buscar_uma_data_dia"); //number
vai_buscar_uma_data("vai_buscar_uma_data_mes"); //string
vai_buscar_uma_data("vai_buscar_uma_data_ano"); //number
vai_buscar_uma_data("vai_buscar_uma_data_hora"); //string
vai_buscar_uma_data("vai_buscar_uma_data_semana"); //string
