import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";
import { derivarTarefasVisiveis } from "./derivacao.js";

const estado = {
  tarefas: [],
  busca: "",
  status: "todos",
  prioridade: "todas",
  ordenacao: "nenhuma",
  carregamento: true,
  erro: null,
};

const estadoInicial = { ...estado };

const formulario = document.getElementById("form-filtros");
const campoBusca = document.getElementById("busca-titulo");
const camposStatus = document.querySelectorAll('input[name="filtro-status"]');
const camposPrioridade = document.querySelectorAll(
  'input[name="filtro-prioridade"]',
);
const campoOrdenacao = document.getElementById("ordenar-prazo");
const botaoLimpar = document.getElementById("btn-limpar-filtros");

function atualizarTela() {
  const visiveis = derivarTarefasVisiveis(estado);
  renderizarEstado(estado, visiveis);
}

// Nenhum dos controles deve efetivamente submeter o formulário.
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
});

campoBusca.addEventListener("input", (evento) => {
  estado.busca = evento.target.value;
  atualizarTela();
});

camposStatus.forEach((campo) => {
  campo.addEventListener("change", (evento) => {
    estado.status = evento.target.value;
    atualizarTela();
  });
});

camposPrioridade.forEach((campo) => {
  campo.addEventListener("change", (evento) => {
    estado.prioridade = evento.target.value;
    atualizarTela();
  });
});

campoOrdenacao.addEventListener("change", (evento) => {
  estado.ordenacao = evento.target.value;
  atualizarTela();
});

botaoLimpar.addEventListener("click", () => {
  estado.busca = estadoInicial.busca;
  estado.status = estadoInicial.status;
  estado.prioridade = estadoInicial.prioridade;
  estado.ordenacao = estadoInicial.ordenacao;

  campoBusca.value = "";
  document.getElementById("filtro-status-todos").checked = true;
  document.getElementById("filtro-prioridade-todas").checked = true;
  campoOrdenacao.value = "nenhuma";

  atualizarTela();
});

async function iniciar() {
  estado.carregamento = true;
  atualizarTela();

  try {
    const tarefas = await carregarTarefas();
    estado.tarefas = tarefas;
    estado.carregamento = false;
    atualizarTela();
  } catch (erro) {
    let tipo = "desconhecido";

    if (erro.name === "TypeError") {
      tipo = "rede";
    } else if (erro.name === "SyntaxError") {
      tipo = "formato";
    } else if (erro.name === "ErroProtocolo") {
      tipo = "protocolo";
    }

    estado.carregamento = false;
    estado.erro = { tipo, mensagem: erro.message };
    atualizarTela();
  }
}

iniciar();
