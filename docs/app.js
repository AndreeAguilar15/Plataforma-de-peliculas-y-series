document.addEventListener("DOMContentLoaded", () => {
  const sections=document.querySelectorAll("main section");
  const navLinks=document.querySelectorAll("nav .nav-link");

  function showSection(id) {
    sections.forEach(sec => sec.style.display = "none");
    document.querySelector(id).style.display = "block";
  }

  showSection("#tablas");
  navLinks.forEach(link => {
    link.addEventListener("click",e=>{
      e.preventDefault();
      showSection(link.getAttribute("href"));
    });
  });

  const formPelicula=document.querySelector("#form-pelicula form");
  const tbodyPeliculas=document.querySelector("#tablas .table:nth-of-type(1) tbody");

  const formSerie=document.querySelector("#form-serie form");
  const tbodySeries=document.querySelector("#tablas .table:nth-of-type(2) tbody");

  formPelicula.addEventListener("submit", e => {
    e.preventDefault();

    const data=new FormData(formPelicula);
    const titulo=data.get("titulo") || formPelicula.querySelector("input[type=text]").value;
    const genero=data.get("genero") || formPelicula.querySelector("select").value;
    const fecha=formPelicula.querySelector("input[type=date]").value;
    const calificacion=parseInt(formPelicula.querySelector("input[type=number]").value);
    const comentario=formPelicula.querySelector("textarea").value;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${titulo}</td>
      <td>${genero}</td>
      <td>${fecha}</td>
      <td>${calificacion}</td>
      <td>${comentario}</td>
    `;

    tbodyPeliculas.appendChild(tr);
    formPelicula.reset();
    showSection("#tablas");
  });

  formSerie.addEventListener("submit", e => {
    e.preventDefault();

    const titulo=formSerie.querySelector("input[type=text]").value;
    const temporadas=formSerie.querySelector("input[type=number]").value;
    const genero=formSerie.querySelector("select").value;
    const calificacion=parseInt(formSerie.querySelectorAll("input[type=number]")[1].value);
    const comentario=formSerie.querySelector("textarea").value;

    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${titulo}</td>
      <td>${temporadas}</td>
      <td>${genero}</td>
      <td>${calificacion}</td>
      <td>${comentario}</td>
    `;

    tbodySeries.appendChild(tr);
    formSerie.reset();
    showSection("#tablas");
  });
});

