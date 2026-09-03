import { renderizarQuadro } from './renderizacao.js';

export function renderizarEstado(estado, dados = null) {
  const regiaoStatus = document.getElementById('regiao-status');
  const quadroContainer = document.querySelector('section[aria-labelledby="quadro-titulo"]');

  if (estado === 'carregando') {
    const mensagem = 'Carregando tarefas...';
    regiaoStatus.textContent = mensagem;
    quadroContainer.innerHTML = `<p>${mensagem}</p>`;
  } 
  else if (estado === 'sucesso') {
    const total = dados ? dados.length : 0;
    regiaoStatus.textContent = `Tarefas carregadas com sucesso. Total: ${total} tarefas.`;
    renderizarQuadro(dados);
  } 
  else if (estado === 'vazio') {
    const mensagem = 'Nenhuma tarefa encontrada.';
    regiaoStatus.textContent = mensagem;
    quadroContainer.innerHTML = `<p>${mensagem}</p>`;
  } 
  else if (estado === 'erro') {
    regiaoStatus.textContent = `Erro: ${dados}`;
    quadroContainer.innerHTML = `<p role="alert">${dados}</p>`;
  }
}