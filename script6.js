var id =  window.location.search.split("=")[1];

let partido = document.getElementById("partido");
let liderPartido = document.getElementById("lider-partido");


buscarPart(id);


async function buscarPart(id) {
    let request = await fetch(`https://dadosabertos.camara.leg.br/api/v2/partidos/${id}`);
    let part = await request.json();
    console.log(part.dados);
    part = part.dados;
    let profissao = await buscarLiderPart(part.status.lider.uri);
    console.log(profissao);
    
    liderPartido.innerHTML += `        <div class="card">
                                            <div class="card-content">
                                                <div class="media">
                                                    <div class="media-left">
                                                    <figure class="image is-48x48">
                                                        <img src="${part.status.lider.urlFoto}" alt="Placeholder image">
                                                    </figure>
                                                    </div>
                                                    <div class="media-content">
                                                    <p class="title is-4"><b>${part.status.lider.nome}</b></p>
                                                    <p>
                                                        <b>Profissão: ${profissao}</b> <br/>
                                                        <b>Nome do partido: </b>${part.nome}<br/>
                                                        <!-- <b>Número Eleitoral: </b>${part.numeroEleitoral}<br/> -->
                                                        <b>Sigla: ${part.sigla}</b> <br/>
                                                        
                                                        <b>Situação: ${part.status.situacao}</b> <br/>
                                                        <b>Total de membros: ${part.status.totalMembros}</b> <br/>
                                                        <b>Total de membros com Posse: ${part.status.totalPosse}</b> <br/>
                                                        <img src="${part.urlLogo}" class="image is-48x48"/> <br/>
                                                    </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  `;

    
}

async function buscarLiderPart(url) {
    let request = await fetch(url + '/profissoes');
    let part = await request.json();
    console.log(part.dados);
    part = part.dados;
    let profissoes = '';

    for (let i = 0; i < part.length; i++) {
        if(i == part.length - 1){
            profissoes += (`${part[i].titulo} `);
        }else {
            profissoes += (`${part[i].titulo} - `);
        }
    }
    
    return profissoes;
    
}
//https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/profissoes

//<a href="${part.status.uriMembros}" target="_blank">Página partido: <i class="fa-solidfa-arow-up-right-from-square"></i></a><br/>
// id: 37906
// nome: "Partido Liberal"
// numeroEleitoral: null
// sigla: "PL"
// status:
    // data: "2022-02-15T18:30"
    // idLegislatura: "56"
    // situacao: "Ativo"
    // totalMembros: "78"
    // totalPosse: "33"
    // uriMembros: "https://dadosabertos.camara.leg.br/api/v2/deputados?idLegislatura=56&siglaPartido=PL"
        // lider:
            // idLegislatura: 56
            // nome: "Altineu Côrtes"
            // siglaPartido: "PL"
            // uf: "RJ"
            // uri: "https://dadosabertos.camara.leg.br/api/v2/deputados/178937"
            // uriPartido: "https://dadosabertos.camara.leg.br/api/v2/partidos/37906"
            // urlFoto: "http://www.camara.gov.br/internet/deputado/bandep/178937.jpg"
            // [[Prototype]]: Object
// [[Prototype]]: Object
// uri: "https://dadosabertos.camara.leg.br/api/v2/partidos/37906"
// urlFacebook: null
// urlLogo: "http://www.camara.leg.br/internet/Deputado/img/partidos/PL.gif"
// urlWebSite: null