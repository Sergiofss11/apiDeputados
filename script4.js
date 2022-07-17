const urlPartidos =
  "https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla&itens=100";

let partidos = document.getElementById("partidos");
var todosPartidos;
buscarTodosPartidos();

async function buscarTodosPartidos() {
  let request = await fetch(urlPartidos);
  let part = await request.json();

  todosPartidos = part.dados.map((partido) => {
    return {
        id: partido.id,
      sigla: partido.sigla,
      nome: partido.nome,           
    };
  });

  for (let index = 0; index < todosPartidos.length; index++) {
    partidos.innerHTML += `<p>${todosPartidos[index].sigla}</p>
                            <p><a href="index6.html?id=${todosPartidos[index].id}">${todosPartidos[index].nome}</a></p>`;
  }
}
