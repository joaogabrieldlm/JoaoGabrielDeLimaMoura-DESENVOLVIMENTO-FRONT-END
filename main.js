import { carregarTarefas } from './api.js';
import { renderizarEstado } from './estados.js';

async function inicializar() {
  // 1. Estado de carregamento acionado ANTES da busca assíncrona
  renderizarEstado('carregando');

  try {
    const tarefas = await carregarTarefas();

    // 2. Estado de vazio tratado pelo tamanho da lista, não no catch
    if (tarefas.length === 0) {
      renderizarEstado('vazio');
    } else {
      renderizarEstado('sucesso', tarefas);
    }
  } catch (erro) {
    let mensagemErro = 'Ocorreu um erro inesperado ao carregar os dados.';

    // 3. Tratamento e diferenciação dos tipos de erro por erro.name
    if (erro.name === 'TypeError') {
      mensagemErro = 'Falha de rede ou conexão indisponível. Verifique sua internet.';
    } else if (erro.name === 'SyntaxError') {
      mensagemErro = 'Erro no formato dos dados recebidos (JSON inválido).';
    } else if (erro.name === 'ProtocolError') {
      mensagemErro = `Servidor retornou uma resposta inválida (${erro.message}).`;
    }

    renderizarEstado('erro', mensagemErro);
  }
}

// Inicialização contida dentro de uma função (sem await de nível superior solto)
inicializar();