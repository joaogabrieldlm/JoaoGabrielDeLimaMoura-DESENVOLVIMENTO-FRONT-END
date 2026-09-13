// js/estados.js
//
// Responsabilidade única: dado o estado inteiro da aplicação e a lista
// já derivada (busca + filtros + ordenação aplicados), decidir qual
// mensagem/tela mostrar e anunciar isso na região viva para quem usa
// leitor de tela. Nenhuma requisição e nenhuma regra de filtro aqui —
// isso é papel de api.js e derivacao.js, respectivamente.

import { renderizarTarefas } from "./renderizacao.js";

const regiaoStatus = document.getElementById("status-tarefas");

const mensagensErro = {
  rede: "Não foi possível conectar à rede. Verifique sua conexão e tente novamente.",
  protocolo: "O servidor não conseguiu entregar as tarefas.",
  formato: "Os dados recebidos vieram em um formato inválido.",
  desconhecido: "Ocorreu um erro inesperado ao carregar as tarefas.",
};

export function renderizarEstado(estado, visiveis) {
  if (estado.carregamento) {
    limparColunas();
    regiaoStatus.textContent = "Carregando tarefas...";
    return;
  }

  if (estado.erro) {
    limparColunas();
    regiaoStatus.textContent = montarMensagemErro(estado.erro);
    return;
  }

  if (estado.tarefas.length === 0) {
    limparColunas();
    regiaoStatus.textContent = "Nenhuma tarefa encontrada no momento.";
    return;
  }

  renderizarTarefas(visiveis);

  if (visiveis.length === 0) {
    regiaoStatus.textContent =
      "Nenhuma tarefa corresponde aos filtros aplicados. Tente ajustar a busca ou os filtros.";
  } else {
    regiaoStatus.textContent = `${visiveis.length} de ${estado.tarefas.length} tarefas.`;
  }
}

function montarMensagemErro(detalhe) {
  const tipo = detalhe?.tipo ?? "desconhecido";
  const base = mensagensErro[tipo] ?? mensagensErro.desconhecido;

  if (tipo === "protocolo" && detalhe?.mensagem) {
    return `${base} (${detalhe.mensagem})`;
  }

  return base;
}

function limparColunas() {
  document.querySelectorAll("#colunas-tarefas ul").forEach((ul) => {
    ul.textContent = "";
  });
}
