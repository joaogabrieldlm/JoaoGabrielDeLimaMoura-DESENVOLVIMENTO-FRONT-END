export async function carregarTarefas() {
  const resposta = await fetch('./dados.json');

  if (!resposta.ok) {
    const erro = new Error(`Erro ao buscar tarefas: ${resposta.status}`);
    erro.name = 'ProtocolError';
    throw erro;
  }

  const dados = await resposta.json();
  return dados.tarefas;
}