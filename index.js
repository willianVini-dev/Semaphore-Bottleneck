const Bottleneck = require("bottleneck");

// Configura o semáforo com Bottleneck
const limiter = new Bottleneck({
  maxConcurrent: 2, // Máximo de 2 tarefas simultâneas
});

// Função simulando uma tarefa assíncrona
const simulateTask = async (id) => {
  console.log(`Tarefa ${id} iniciou`);
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simula uma tarefa de 2 segundos
  console.log(`Tarefa ${id} finalizou`);
};

// Usando Bottleneck para gerenciar a execução
(async () => {
  const tasks = [1, 2, 3, 4, 5].map(id =>
    limiter.schedule(() => simulateTask(id)) // Adiciona as tarefas ao semáforo
  );

  await Promise.all(tasks); // Aguarda todas as tarefas terminarem
  console.log("Todas as tarefas foram concluídas");
})();