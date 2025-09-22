// Conexão com o front-end
function conectBack(){
    fetch('http://localhost:5000/tarefas')
      .then(response => response.json())
      .then(data => {
        const lista = document.getElementById('lista-tarefas');
        data.forEach(tarefa => {
          const li = document.createElement('li');
          li.textContent = `${tarefa.titulo} - ${tarefa.status}`;
          lista.appendChild(li);
        });
      })
      .catch(error => console.error('Erro ao buscar tarefas:', error)
    )
};

conectBack();