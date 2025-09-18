document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll("nav .nav-link");

  function showSection(id) {
    sections.forEach(sec => sec.style.display = "none");
    document.querySelector(id).style.display = "block";
  }

  showSection("#tablas");
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showSection(link.getAttribute("href"));
    });
  });

  const formPelicula = document.querySelector("#form-pelicula form");
  const tbodyPeliculas = document.querySelector("#tabla-peliculas tbody");

  const formSerie = document.querySelector("#form-serie form");
  const tbodySeries = document.querySelector("#tabla-series tbody");

  const tbodyRanking = document.querySelector("#tablas .table-bordered tbody");

let ranking = [
  { titulo: "The Walking Dead", tipo: "Serie", calificacion: 9 },
  { titulo: "La sociedad de la nieve", tipo: "Película", calificacion: 9 }
];

  function actualizarRanking() {
    ranking.sort((a, b) => b.calificacion-a.calificacion);
    tbodyRanking.innerHTML = "";
    ranking.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.titulo}</td>
        <td>${item.tipo}</td>
        <td>${item.calificacion}</td>
      `;
      tbodyRanking.appendChild(tr);
    });
  }

  formPelicula.addEventListener("submit", e => {
    e.preventDefault();

    const titulo = formPelicula.querySelector("input[type=text]").value;
    const genero = formPelicula.querySelector("select").value;
    const fecha = formPelicula.querySelector("input[type=date]").value;
    const calificacion = parseInt(formPelicula.querySelector("input[type=number]").value);
    const comentario = formPelicula.querySelector("textarea").value;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${titulo}</td>
      <td>${genero}</td>
      <td>${fecha}</td>
      <td>${calificacion}</td>
      <td>${comentario}</td>
    `;
    tbodyPeliculas.appendChild(tr);

    ranking.push({ titulo, tipo: "Película", calificacion });
    actualizarRanking();

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

    ranking.push({ titulo, tipo: "Película", calificacion });
    actualizarRanking();
    
    formSerie.reset();
    showSection("#tablas");
    
  });
});

