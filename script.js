
// Verificar se é a primeira vez que a extensão é aberta
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    // Exibir a mensagem de boas-vindas
    alert('Bem-vindo à minha extensão!');
  }
});



// ------------------------------------------ BACKGROUND ------------------------------------

// Gerar um background aleatorio ou deixar um estatico se o usuário preferir
function setRandomBackground() {
  // Definindo os backgrounds
  var backgrounds = [
    { cor:"branco", link: "/backgrounds/Cedric_Letsch.jpg", criador: "Cedric Letsch", linkCriador: "https://unsplash.com/pt-br/@cedricletsch" },
    { cor:"preto", link: "/backgrounds/Hunter_Reilly.jpg", criador: "Hunter Reilly", linkCriador: "https://unsplash.com/pt-br/@hunterrei" },
    { cor:"preto", link: "/backgrounds/Hunter_Reilly2.jpg", criador: "Hunter Reilly", linkCriador: "https://unsplash.com/pt-br/@hunterrei" },
    { cor:"preto", link: "/backgrounds/Clay_Banks.jpg", criador: "Clay Banks", linkCriador: "https://unsplash.com/pt-br/@claybanks" }
  ];

  // Verificar o estado da checkbox no localStorage
  var checkboxState = localStorage.getItem("backgroundCheckboxState");

  // Selecionar aleatoriamente ou definir um background estático
  var backgroundSelecionado;
  if (checkboxState === "true") {
    var indiceAleatorio = Math.floor(Math.random() * backgrounds.length);
    backgroundSelecionado = backgrounds[indiceAleatorio];
  } else {
    backgroundSelecionado = { link: "/backgrounds/Marek_Piwnicki.jpg", criador: "Marek Piwnicki", linkCriador: "https://unsplash.com/pt-br/@marekpiwnicki" };
  }

  // Definir o background estatico
  document.body.style.backgroundImage = "url('" + backgroundSelecionado.link + "')";

  // Adicionar o link dos donos das imagens ao elemento <a>
  var linkCriador = document.getElementById("author");
  linkCriador.href = backgroundSelecionado.linkCriador;
  linkCriador.textContent = "Foto de: " + backgroundSelecionado.criador;
}

// Função para atualizar o estado da checkbox
function updateBackgroundCheckboxState(checkbox) {
  localStorage.setItem("backgroundCheckboxState", checkbox.checked);
}

// Verificar o estado da checkbox no localStorage ao carregar a página
window.addEventListener("load", function () {
  var checkboxState = localStorage.getItem("backgroundCheckboxState");
  var checkbox = document.getElementById("backgroundCheckbox");
  checkbox.checked = checkboxState === "true";

  // Adicionar evento de mudança da checkbox
  checkbox.addEventListener("change", function () {
    updateBackgroundCheckboxState(checkbox);
    setRandomBackground();
  });

  // Definir o background inicial
  setRandomBackground();
});

// ------------------------------- BOTÃO CONFIGURAR ------------------------------------


var asideVisible = false;
var imgConfig = document.getElementById("img-config");

function alternarAside() {
  var aside = document.getElementById("meuAside");

  if (asideVisible) {
    aside.style.right = "-17vw";
  } else {
    aside.style.right = "0";
  }

  asideVisible = !asideVisible;
}

imgConfig.addEventListener("click", alternarAside);





// ------------------------------------------ HORARIO ------------------------------------

function mostrarData() {
  // Fornece Hora, Dia da Semana, Minuto e formata eles para ficar (00:00)
  var mesAtual = new Date();
  var diaSemanaIndex = mesAtual.getDay();
  var diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  var diaSemana = diasSemana[diaSemanaIndex];
  var numeroSemana = mesAtual.toLocaleDateString('pt-BR', { week: 'numeric' }).substr(0, 2);
  var mes = mesAtual.toLocaleDateString('pt-BR', { month: 'long' }).charAt(0).toUpperCase() + mesAtual.toLocaleDateString('pt-BR', { month: 'long' }).slice(1);
  var hora = mesAtual.getHours().toString().padStart(2, '0');
  var minutos = mesAtual.getMinutes().toString().padStart(2, '0');
  
  // pegar elementos do html
  var exibirHora = document.getElementById("horarioAtual");
  var data = document.getElementById("diaSemana");

  // Alterando so elementos do html
  data.innerHTML = diaSemana + " " + numeroSemana + " de " + mes;
  exibirHora.innerHTML = hora + ":" + minutos;

  saudacaoHora(localStorage.getItem("userName"), parseInt(hora, 10));

}

// chamando a função de mostrar hora e atualizando ela todo minuto
mostrarData();
setInterval(mostrarData, 60000);


// ------------------------------------------ SAUDAÇÃO ------------------------------------

// Função que pega o localstorage e o var hora para fazer a saudação ao usuário conforme o horário
function saudacaoHora(name) {
  var saudacao = document.getElementById("saudacao");
  var tempo = document.getElementById("tempo");

  hora = 20;

  // Verificar se o valor da hora está dentro do intervalo de 0 a 24
  if (hora >= 0 && hora < 24) {
    // Definindo a saudação com base na hora e nome, se for null, só aparecerá somente a saudação
    if (hora >= 12 && hora < 18) {
      saudacao.innerHTML = name ? `Boa Tarde, ${name}!` : "Boa Tarde!";
      tempo.src = "/tempo/dia.png";
    } else if (hora >= 18 || hora < 6) {
      saudacao.innerHTML = name ? `Boa Noite, ${name}!` : "Boa Noite!";
      tempo.src = "/tempo/noite2.png";
    } else if (hora >= 6 && hora < 12) {
      saudacao.innerHTML = name ? `Bom Dia, ${name}!` : "Bom Dia!";
      tempo.src = "/tempo/dia.png";
    }
  } else {
    saudacao.innerHTML = name ? `Bem Vindo, ${name}!` : "Bem Vindo!";
  }
}

// Definir ouvinte para salvar o
document.addEventListener("DOMContentLoaded", function() {
  const nameInput = document.getElementById("name");
  nameInput.addEventListener("input", function() {
    const name = nameInput.value;
    saudacaoHora(name);
    localStorage.setItem("userName", name); // Atualiza o valor no localStorage
  });

  const savedName = localStorage.getItem("userName");
  if (savedName) {
    nameInput.value = savedName;
    saudacaoHora(savedName);
  }
});


// --------------------- SELECIONAR EMAIL -----------------------

window.addEventListener('DOMContentLoaded', function() {
  var emailSelect = document.getElementById('emailSelect');
  var emailLink = document.getElementById('emailLink');
  
  // Verifica se há uma opção selecionada no localStorage
  if (localStorage.getItem('selectedEmail')) {
    var selectedEmail = localStorage.getItem('selectedEmail');
    emailSelect.value = selectedEmail;
    emailLink.href = selectedEmail;
    emailLink.textContent = emailSelect.options[emailSelect.selectedIndex].text;
  }
  
  // Atualiza o link, o texto e o localStorage quando uma nova opção for selecionada
  emailSelect.addEventListener('change', function() {
    var selectedEmail = emailSelect.value;
    emailLink.href = selectedEmail;
    emailLink.textContent = emailSelect.options[emailSelect.selectedIndex].text;
    localStorage.setItem('selectedEmail', selectedEmail);
  });
});





