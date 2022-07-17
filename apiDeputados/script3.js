$(function() {
var id = window.location.search.split("=")[1];

var totalDespesa = document.getElementById("totalDespesa");
let nome = document.getElementById("title is-4");
let fotoDep = document.getElementById("image is-96x96");
let partEstado = document.getElementById("subtitle is-6");
var teste;
buscarDespesasDeputado(id);
buscarDep(id);

async function buscarDep(id) {
    let request = await fetch(
      `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`
    );
    let dep = await request.json();
  
    dep = dep.dados;

    nome.innerHTML = `<p class="title is-4"><b>${dep.nomeCivil}</b></p>`;
    fotoDep.innerHTML = `<a href="index2.html?id=${id}"><img src="${dep.ultimoStatus.urlFoto}"/></a>`;
    partEstado.innerHTML = `${dep.ultimoStatus.siglaPartido} | ${dep.ultimoStatus.siglaUf}`;
}

async function buscarDespesasDeputado(id) {
  let aux = 1;
  let dep;
  let top = [];
  do {
    let request = await fetch(
      `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas?ordem=ASC&ordenarPor=ano&pagina=${aux}&itens=100`
    );
    dep = await request.json();
    top = dep.dados.concat(dep.dados);
      
    aux++;
  } while (
    dep.links[2].href !=
    `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas?ordem=ASC&ordenarPor=ano&pagina=${aux-1}&itens=100`
  );
  teste = top;
  dep = top.map((dados) => {
    return {
      ano: dados.ano,
      cnpjCpfFornecedor: dados.cnpjCpfFornecedor,
      codDocumento: dados.codDocumento,
      codLote: dados.codLote,
      codTipoDocumento: dados.codTipoDocumento,
      dataDocumento: dados.dataDocumento,
      mes: dados.mes,
      nomeFornecedor: dados.nomeFornecedor,
      numDocumento: dados.numDocumento,
      numRessarcimento: dados.numRessarcimento,
      parcela: dados.parcela,
      tipoDespesa: dados.tipoDespesa,
      tipoDocumento: dados.tipoDocumento,
      urlDocumento: dados.urlDocumento,
      valorDocumento: dados.valorDocumento,
      valorGlosa: dados.valorGlosa,
      valorLiquido: dados.valorLiquido,
    };
  });
  const sum = top.map(data => data.valorLiquido);
  console.log(sum);

    const initialValue = 0;
    const sumWithInitial = sum.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );
    totalDespesa.innerHTML = `<b>Total Despesas: </b>R$ ${sumWithInitial.toFixed(2)}`;

var state= {
  'querySet': teste,

  'page': 1,
  'rows': 15,

}

buildTable()

function pagination(querySet, page, rows){
  var trimStart = (page - 1) * rows;
  var trimEnd = trimStart + rows;

  var trimmedData = querySet.slice(trimStart, trimEnd);

  var pages = Math.ceil(querySet.length / rows);

  return {
    'querySet': trimmedData,
    'pages': pages
  }
}

function pageButton(pages){
  var wrapper = document.getElementById('pagination-wrapper');
  wrapper.innerHTML = '';

  for (let page = 1; page <= pages; page++) {
    wrapper.innerHTML += `<button value="${page}" class="page button is-normal is-responsive">${page}</button> `; 
  }

  $('.page').on('click', function(){
    $('#table-body').empty();
    $('.actual-page').html("<b>Pagina Atual: "+$(this).val()+"</b>");

  
    state.page = $(this).val();

    buildTable();

    });
   
    
}

function buildTable(){
  var TBL = $('#table-body');

  var data = pagination(state.querySet, state.page, state.rows);
  
  myList = data.querySet;

  var k = 1;
  for (k in myList) {
    TBL.append(`<tr>
                  <td>${myList[k].ano}</td>
                  <td>${myList[k].tipoDocumento}</td>
                  <td>R$ ${myList[k].valorLiquido}</td>
                  <td><a href="${myList[k].urlDocumento}" target="_blank">Documento</a></td>`);
  }
  pageButton(data.pages);
  }
}
})