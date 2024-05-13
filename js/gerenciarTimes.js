function pesquisarTime() {
  const inputPesquisa = document.getElementById("inputPesquisa");
  const valorInput = inputPesquisa.value.toLowerCase();
  let times = document.getElementsByClassName("meuTime");
  let semTimes = true;

  for (let i = 0; i < times.length; i++) {
    let nomeTime = times[i]
      .getElementsByClassName("nomeTime")[0]
      .innerHTML.toLowerCase();

    if (nomeTime.includes(valorInput)) {
      times[i].style.display = "flex";
      semTimes = false;
    } else {
      times[i].style.display = "none";
    }
  }
  if (semTimes === true) {
    ConteinerTimes = document.getElementById("meusTimes");
    ConteinerTimes.innerHTML = `<div id="MsgSemMaratonas"> <p>Nenhum time com o nome "${valorInput}" foi encontrado </p>
    <span class="bi bi-exclamation-triangle-fill"></span>
     </div>`;
  }
}

function sairInfoTime() {
  let gerenciarTimes = document.getElementById("gerenciarTimes");
  let informacoesTime = document.getElementById("informacoesTime");
  gerenciarTimes.removeChild(informacoesTime);
}

function retornaPagGerenciarTimes() {
  let global = document.getElementById("global");

  // Fazendo uma requisição AJAX para obter os dados dos times
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const times = JSON.parse(xhr.responseText);
        let newHtml = `
          <div id="gerenciarTimes">
            <div id="homeEPesquisa">
              <button class="home bi bi-house-door-fill" onclick="retornaPagPrincipal()">home</button>
              <div id="pesquisa">
                <input type="text" id="inputPesquisa" placeholder="pesquisa" />
                <button class="bi bi-search" onclick="pesquisarTime()"></button>
              </div>
              <button class="bi bi-arrow-counterclockwise" id="refazer" onclick="retornaPagGerenciarTimes()"></button>
            </div>
            <div id="meusTimes">
        `;
        times.forEach(time => {
          newHtml += `
            <div class="meuTime" onclick="retornaInformacoesTime()">
              <div>
                <img src="${time.escudo}" alt="" />
                <p class="nomeTime">${time.nome}</p>
              </div>
              <p>${time.participantes.length}</p>
            </div>
          `;
        });
        newHtml += `
            </div>
          </div>
        `;
        global.innerHTML = newHtml;
      } else {
        console.error('Ocorreu um erro ao obter os times. Status:', xhr.status);
      }
    }
  };

  xhr.open('GET', 'http://localhost/projeto/assets/php/requisicao_times.php');
  xhr.send();
}


function retornaPagGerenciarTimes() {
  let global = document.getElementById("global");
  let newHtml = ` <div id="gerenciarTimes">
  <div id="homeEPesquisa">
    <button
      class="home bi bi-house-door-fill"
      onclick="retornaPagPrincipal()"
    >
      home
    </button>
    <div id="pesquisa">
      <input type="text" id="inputPesquisa" placeholder="pesquisa" />
      <button class="bi bi-search" onclick="pesquisarTime()"></button>
    </div>
    <button
      class="bi bi-arrow-counterclockwise"
      id="refazer"
      onclick="retornaPagGerenciarTimes()"
    ></button>
  </div>
  <div id="meusTimes">
    <div class="meuTime" onclick="retornaInformacoesTime()">
      <div>
        <img src="img/OIG1.jpeg" alt="" />
        <p class="nomeTime">time aleatorio</p>
      </div>
      <p>3</p>
    </div>
    <div class="meuTime" onclick="retornaInformacoesTime()">
      <div>
        <img src="img/OIG1.jpeg" alt="" />
        <p class="nomeTime">time teste</p>
      </div>
      <p>5</p>
    </div>
    <div class="meuTime" onclick="retornaInformacoesTime()">
      <div>
        <img src="img/OIG1.jpeg" alt="" />
        <p class="nomeTime">time SOS</p>
      </div>
      <p>3</p>
    </div>
    <div class="meuTime" onclick="retornaInformacoesTime()">
      <div>
        <img src="img/OIG1.jpeg" alt="" />
        <p class="nomeTime">testando</p>
      </div>
      <p>4</p>
    </div>
    <div class="meuTime" onclick="retornaInformacoesTime()">
      <div>
        <img src="img/OIG1.jpeg" alt="" />
        <p class="nomeTime">temblarios</p>
      </div>
      <p>5</p>
    </div>
  </div>
</div>`;

  global.innerHTML = newHtml;
}

function retornaPagEditaTime() {
  let informacoesTime = document.getElementById("informacoesTime");
  let newHtml = `<div id="editarTime">
  <div class="topoBotoes">
    <button
      class="buttonSair bi bi-x-lg"
      id="SairInforUsuario"
      onclick="sairEdicaoTime()"
    ></button>
  </div>
  <form action="">
    <div>
      <label for="NovoNomeTime">Novo nome:</label>
      <input type="text" name="NovoNomeTime" id="inputNovoNomeTime" />
    </div>
    <div>
      <label for="NovaAbreviacao">Nova abreviação:</label>
      <input type="text" name="NovaAbreviacao" id="inputNovaAbreviacao" />
    </div>
    <button onclick="verificaEdicao(event)" >Editar</button>
  </form>
</div>`;

  informacoesTime.innerHTML += newHtml;
}

function verificaEdicao(event) {
  event.preventDefault();
  let inputNovoNomeTime = document.getElementById("inputNovoNomeTime");
  let inputNovaAbreviacao = document.getElementById("inputNovaAbreviacao");

  if (inputNovoNomeTime.value === "" || inputNovaAbreviacao.value === "") {
    window.alert(
      "A edição apresenta campos vazios, por favor preencha todos os campos"
    );
  } else {
    let resposta = confirm(
      `Você realmente deseja editar o nome do time para '${inputNovoNomeTime.value}' e sua abreviação para ${inputNovaAbreviacao.value}?`
    );

    if (resposta) {
      alert(`Informações do time alteradas com sucesso`);
      retornaPagGerenciarTimes();
    }
  }
}
function sairEdicaoTime() {
  let informacoesTime = document.getElementById("informacoesTime");
  let editarTime = document.getElementById("editarTime");

  informacoesTime.removeChild(editarTime);
}

let idTrocaEscudo = "";

function retornaEditaEscudoTime() {
  let informacoesTime = document.getElementById("informacoesTime");
  let newHtml = `<div id="editaEscudoTime">
  <div class="topoBotoes">
    <button
      class="buttonSair bi bi-x-lg"
      id="SairInforUsuario"
      onclick="sairEdicaoEscudos()"
    ></button>
  </div>
  <div id="trocaEscudos">
    <img src="img/OIG1.jpeg" alt="" id="escudo01" class="opcaoEscudo" />
    <img src="img/OIG1.jpeg" alt="" id="escudo02" class="opcaoEscudo" />
    <img src="img/OIG1.jpeg" alt="" id="escudo03" class="opcaoEscudo" />
    <img src="img/OIG1.jpeg" alt="" id="escudo04" class="opcaoEscudo" />
    <img src="img/OIG1.jpeg" alt="" id="escudo05" class="opcaoEscudo" />
    <img src="img/OIG1.jpeg" alt="" id="escudo06" class="opcaoEscudo" />
    <img src="img/OIG1.jpeg" alt="" id="escudo07" class="opcaoEscudo" />
    <img src="img/OIG1.jpeg" alt="" id="escudo08" class="opcaoEscudo" />
    <img src="img/OIG1.jpeg" alt="" id="escudo09" class="opcaoEscudo" />
    <img src="img/OIG1.jpeg" alt="" id="escudo10" class="opcaoEscudo" />
  </div>

  <button onclick="editaEscudo()">Editar</button>
</div>`;
  informacoesTime.innerHTML += newHtml;

  const escudos = document.querySelectorAll(".opcaoEscudo");
  escudos.forEach((escudo) => {
    escudo.addEventListener("click", () => {
      if (escudo.classList.contains("selecionado")) {
        escudo.classList.remove("selecionado");
        idTrocaEscudo = "";
      } else {
        escudos.forEach((escudo) => {
          escudo.classList.remove("selecionado");
        });

        escudo.classList.add("selecionado");
        idTrocaEscudo = escudo.id;
      }
    });
  });
}

function editaEscudo() {
  if (idTrocaEscudo === "") {
    alert("nenhum escudo foi selecionado");
  } else {
    let resposta = confirm(
      "Voce vai trocar seu escudo para esse, você tem certeza?"
    );
    if (resposta) {
      retornaPagGerenciarTimes();
    }
  }
}
function sairEdicaoEscudos() {
  let informacoesTime = document.getElementById("informacoesTime");
  let editaEscudoTime = document.getElementById("editaEscudoTime");
  informacoesTime.removeChild(editaEscudoTime);
}
