var id = window.location.search.split("=")[1];

let deputado = document.getElementById("deputado");
let despesas = document.getElementById("despesas");

buscarDep(id);

async function buscarDep(id) {
  let request = await fetch(
    `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`
  );
  let dep = await request.json();

  dep = dep.dados;
  
  let twitter = false, youtube = false, facebook = false, instagram = false;
  for (let i = 0; i < dep.redeSocial.length; i++) {
    if(dep.redeSocial[i].indexOf('facebook') != -1){
        facebook = i;
    }
    if(dep.redeSocial[i].indexOf('youtube') != -1){
        youtube = i;
    }
    if(dep.redeSocial[i].indexOf('twitter') != -1){
        twitter = i;
    }
    if(dep.redeSocial[i].indexOf('instagram') != -1){
        instagram = i;
    }
  }
  console.log(dep);
  let idPartido = dep.ultimoStatus.uriPartido.split('/')[6];
  console.log(idPartido);

  deputado.innerHTML += `<div class="card">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-128x128">
                                            <img src="${dep.ultimoStatus.urlFoto}"
                                                alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <div class="title-bar">
                                            <p class="title is-4">${dep.ultimoStatus.nome}</p>
                                            <p class="title-bar-icons">
                                                <a href="${twitter !== false ? dep.redeSocial[twitter] : undefined}" target="_blank"><i class="fa-brands fa-twitter"></i></a>
                                                <a href="${youtube !== false ? dep.redeSocial[youtube] : undefined}" target="_blank"><i class="fa-brands fa-youtube"></i></a>
                                                <a href="${instagram !== false ? dep.redeSocial[instagram] : undefined}" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                                                <a href="${facebook !== false ? dep.redeSocial[facebook] : undefined}" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                                            </p>
                                        </div>
                                            <p>
                                                <b>Deputado</b><br/>
                                                <a href="https://www.camara.leg.br/deputados/${dep.id}" target="_blank">Página Parlamentar <i class="fa-solid fa-arrow-up-right-from-square"></i></a><br/>
                                                <b>Nome: </b>${dep.nomeCivil}<br/>
                                                <b>Partido: </b><a href="index6.html?id=${idPartido}">${dep.ultimoStatus.siglaPartido}</a><br/>
                                                <b>Legislatura:</b>${dep.ultimoStatus.idLegislatura}<br/>
                                                <b>E-mail: </b> <a href="mailto:${dep.ultimoStatus.email}">${dep.ultimoStatus.email} <i class="fa-solid fa-arrow-up-right-from-square"></i></a><br/>
                                                <b>CPF: </b>${dep.cpf}<br/>
                                                <b>Sexo: </b>${dep.sexo}<br/>
                                                <b>Data Nascimento: </b>${dep.dataNascimento}<br/>
                                                <b>Municipio Nascimento: </b>${dep.municipioNascimento} - ${dep.ufNascimento}<br/>
                                                <b>Escolaridade: </b>${dep.escolaridade}
                                            </p>
                                            <p>
                                                <b>Gabinete</b><br/>
                                                <b>Nome: </b>${dep.ultimoStatus.gabinete.nome}<br/>
                                                <b>Prédio: </b>${dep.ultimoStatus.gabinete.predio}<br/>
                                                <b>Sala: </b>${dep.ultimoStatus.gabinete.sala}<br/>
                                                <b>Andar: </b>${dep.ultimoStatus.gabinete.andar}<br/>
                                                <b>Telefone: </b> ${dep.ultimoStatus.gabinete.telefone}<br/>
                                                <!-- <b>E-mail: </b><a href="mailto:${dep.ultimoStatus.gabinete.email}">${dep.ultimoStatus.gabinete.email} <i class="fa-solid fa-arrow-up-right-from-square"></i></a> -->
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
}
