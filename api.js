export class ErroProtocolo extends Error {
  constructor(status) {
    super(`A requisição falhou com status ${status}`);
    this.name = "ErroProtocolo";
    this.status = status;
  }
}

export async function carregarTarefas() {
  const resposta = await fetch("dados.json");

  if (!resposta.ok) {
    throw new ErroProtocolo(resposta.status);
  }

  const dados = await resposta.json();

  if (!dados || !Array.isArray(dados.tarefas)) {
    throw new SyntaxError(
      'O JSON recebido não tem o formato esperado (faltando a chave "tarefas").',
    );
  }

  return dados.tarefas;
}
