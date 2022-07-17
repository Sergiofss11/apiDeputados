const url =
  "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome";

let deputados = document.getElementById("deputados");
let buscar = document.getElementById("botaoEstado");
let Estado = document.getElementById("estado");
var todosDeputados;
buscarTodosDeputados();

async function buscarTodosDeputados() {
  let request = await fetch(url);
  let dep = await request.json();
  console.log(dep);
  todosDeputados = dep.dados.map((data) => {
    return {
      nome: data.nome,
      partido: data.siglaPartido,
      foto: data.urlFoto,
      id: data.id,
      estado: data.siglaUf,
      idPartido: data.uriPartido.split('/')[6],
    };
  });
}

buscar.addEventListener("click", filtrarDeputadosEstado);

async function filtrarDeputadosEstado() {
  let dep = todosDeputados;

  dep = dep.filter((dados) => dados.estado == Estado.value);

  deputados.innerHTML = "";

  for (let i = 0; i < dep.length; i++) {
    let paginaDeputado = (href = "index2.html?id=" + dep[i].id);
    let despesasDeputado = (href = "index3.html?id=" + dep[i].id);
    let partidoDeputado = (href = "index6.html?id=" + dep[i].idPartido);
    deputados.innerHTML += `<div class="card">
        <div class="card-image">
        <figure class="image is-1by1">
          <img src="${dep[i].foto}" alt="Placeholder image">
        </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="https://www.camara.leg.br/internet/Deputado/img/partidos/${dep[i].partido}.gif" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4"><a href="${paginaDeputado}">${dep[i].nome}</a></p>
              <p class="subtitle is-6">${dep[i].partido} | ${dep[i].estado}</p>
            </div>
          </div>
      
          <div class="content">
          <a href="${partidoDeputado}">${dep[i].partido}</a>
          <a>${dep[i].estado}</a>
          </div>
        </div>
        <footer class="card-footer" valign="bottom">
            <a href="${paginaDeputado}" class="card-footer-item"><i class="fa-solid fa-eye" style="margin-right: 5px;"></i>Visualizar</a>
            <a href="${despesasDeputado}" class="card-footer-item"><i class="fa-solid fa-sack-dollar" style="margin-right: 5px;"></i>Despesas</a>
            <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>                           
                                `;
  }
}

// for (let i = 0; i < dep.length; i++) {
//     let paginaDeputado = (href = "index2.html?id=" + dep[i].id);

//     deputados.innerHTML += `<p class="depNome">Nome: <a href="${paginaDeputado}" target="_blank"> ${dep[i].nome}</a></p>
//                             <p class="depPartido"> Partido: ${dep[i].partido}            </p>

//                             `;

// }

{
  /* <p> Foto: <img class="depFoto" src="${dep[i].foto}"> </p><br/> */
}

{
  /* <button onclick="buscarDespesasDeputado(${dep[i].id})"> Despesas </button> */
}
