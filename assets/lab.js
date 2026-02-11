document.addEventListener("DOMContentLoaded", () => {
    const reveal = document.getElementById("reveal");
    const cover = document.getElementById("cover");
  
    if(reveal && cover){
      reveal.addEventListener("click", () => {
        cover.style.display = "none";
      });
    }
  });