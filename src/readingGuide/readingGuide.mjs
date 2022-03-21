export default function readingGuide(self, destroy) {
  function updateReadGuide(e) {
    // console.log(e);
    // event does not destroing. Check why and resolve
    let newPos = 0;
    if (e.type == "touchmove") {
      newPos = e.changedTouches[0].clientY;
    } else {
      newPos = e.y;
    }
    const guideLine = document.getElementById("access_read_guide_bar");

    if (guideLine) {
      guideLine.style.top =
        newPos - (parseInt(self.options.guide.height.replace("px")) + 5) + "px";
    }
  }

  if (destroy) {
    if (document.getElementById("access_read_guide_bar") != undefined) {
      document.getElementById("access_read_guide_bar").remove();
    }
    document
      .querySelector('._access-menu [data-access-action="readingGuide"]')
      .classList.remove("active");
    self.initialValues.readingGuide = false;
    self.sessionState.readingGuide = self.initialValues.readingGuide;
    self.onChange(true);
    document.body.removeEventListener("touchmove", updateReadGuide, false);
    document.body.removeEventListener("mousemove", updateReadGuide, false);
    return;
  }
  document
    .querySelector('._access-menu [data-access-action="readingGuide"]')
    .classList.toggle("active");
  self.initialValues.readingGuide = !self.initialValues.readingGuide;
  self.sessionState.readingGuide = self.initialValues.readingGuide;
  self.onChange(true);
  if (self.initialValues.readingGuide) {
    let read = document.createElement("div");
    read.id = "access_read_guide_bar";
    read.classList.add("access_read_guide_bar");
    document.body.append(read);
    document.body.addEventListener("touchmove", updateReadGuide, false);
    document.body.addEventListener("mousemove", updateReadGuide, false);
  } else {
    if (document.getElementById("access_read_guide_bar") != undefined) {
      document.getElementById("access_read_guide_bar").remove();
    }
    document.body.removeEventListener("touchmove", updateReadGuide, false);
    document.body.removeEventListener("mousemove", updateReadGuide, false);
  }
}
