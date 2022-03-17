// **************************
//Início função da lupa de todo o site
// **************************

$("#lupaTotal").click(function (e) {
  if ($("body").hasClass("LupaTotal")) {
    $("body").removeClass("LupaTotal");
  } else {
    $("body").addClass("LupaTotal");
  }
});
