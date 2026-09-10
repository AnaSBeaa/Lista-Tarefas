import { useState, useEffect } from "react";
import { Home, Check, Trash2 } from "lucide-react";
import "../css/style.css";

const Tarefas = () => {

  // HOOK: useState é utilizado para criar e controlar os estados da aplicação.
  const [tarefas, setTarefas] = useState(() => {

    const tarefasSalvas = localStorage.getItem("lista-tarefas");

    return tarefasSalvas
      ? JSON.parse(tarefasSalvas)
      : [];
  });

  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Média");
  const [filtro, setFiltro] = useState("todas");


    // HOOK: useEffect é utilizado para salvar as tarefas automaticamente no localStorage 
    // sempre que o estado tarefas é alterado.
  useEffect(() => {

    localStorage.setItem(
      "lista-tarefas",
      JSON.stringify(tarefas)
    );

  }, [tarefas]);

  // CALLBACK: esta função é executada quando o formulário é enviado.
  const adicionarTarefa = (e) => {

    e.preventDefault();

    if (!nome.trim()) {
      alert("Digite o nome da tarefa.");
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      nome: nome,
      data: data,
      descricao: descricao,
      prioridade: prioridade,
      concluida: false
    };

    setTarefas([...tarefas, novaTarefa]);

    setNome("");
    setData("");
    setDescricao("");
    setPrioridade("Média");
  };


  // MÉTODO filter(): cria uma nova lista contendo apenas
  // as tarefas cujo id é diferente do id informado.
  // CALLBACK: a função dentro do filter é executada para cada tarefa.
  const removerTarefa = (id) => {

    const tarefasAtualizadas = tarefas.filter(
      (tarefa) => tarefa.id !== id
    );

    setTarefas(tarefasAtualizadas);
  };

  // MÉTODO map(): percorre todas as tarefas e cria uma nova lista.
  // CALLBACK: a função dentro do map é executada para cada tarefa.
  const alternarConcluida = (id) => {

    const tarefasAtualizadas = tarefas.map(
      (tarefa) => {

        if (tarefa.id === id) {
          return {
            ...tarefa,
            concluida: !tarefa.concluida
          };

        }

        return tarefa;
      }
    );

    setTarefas(tarefasAtualizadas);
  };


  // MÉTODO filter(): utilizado novamente para criar a lista
  // de tarefas de acordo com o filtro selecionado.
  const tarefasFiltradas = tarefas.filter(
    (tarefa) => {

      if (filtro === "pendentes") {
        return !tarefa.concluida;
      }

      if (filtro === "concluidas") {
        return tarefa.concluida;
      }

      return true;
    }
  );


  return (

    <div className="container-tarefas">

      <header className="cabecalho">
        <h1>
          <Home size={32} />
          Minha Lista de Tarefas
        </h1>
      </header>

      <form
        // CALLBACK: adicionaTarefa é chamada quando o formulário
        // é enviado pelo usuário.
        onSubmit={adicionarTarefa}
        className="formulario"
      >
        <h2>Nova tarefa</h2>
        <div className="campo">
          <label>Nome da tarefa</label>
          <input
            type="text"
            value={nome}
            // CALLBACK: executada sempre que o usuário altera
            // o conteúdo do campo de nome.
            onChange={(e) =>
              setNome(e.target.value)
            }
            placeholder="Ex: Fazer trabalho de React"
          />
        </div>

        <div className="campo">
          <label>Data</label>
          <input
            type="date"
            value={data}
            // CALLBACK: atualiza o estado da data quando
            // o usuário altera o campo.
            onChange={(e) =>
              setData(e.target.value)
            }
          />
        </div>


        <div className="campo">
          <label>Descrição</label>
          <textarea
            value={descricao}
            // CALLBACK: atualiza o estado da descrição.
            onChange={(e) =>
              setDescricao(e.target.value)
            }
            placeholder="Digite uma descrição para a tarefa..."
            rows="4"
          />
        </div>


        <div className="campo">
          <label>Nível de prioridade</label>
          <select
            value={prioridade}
            // CALLBACK: atualiza o estado da prioridade
            // quando o usuário seleciona uma opção.
            onChange={(e) =>
              setPrioridade(e.target.value)
            }
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>


        <button
          type="submit"
          className="botao-adicionar"
        >Adicionar tarefa
        </button>
      </form>


      <div className="filtros">

        <button
          // CALLBACK: altera o filtro para "todas"
          // quando o botão é clicado.
          onClick={() => setFiltro("todas")}
          className={
            filtro === "todas"
              ? "filtro ativo"
              : "filtro"
          }
        >Todas
          <span>{tarefas.length}</span>
        </button>


        <button
        // CALLBACK: altera o filtro para "pendentes".
          onClick={() => setFiltro("pendentes")}
          className={
            filtro === "pendentes"
              ? "filtro ativo"
              : "filtro"
          }
        >Pendentes
          <span>
            {
              // MÉTODO filter(): conta somente as tarefas
              // que ainda não foram concluídas.
              tarefas.filter(
                (tarefa) => !tarefa.concluida
              ).length
            }
          </span>
        </button>


        <button
        // CALLBACK: altera o filtro para "concluidas".
          onClick={() => setFiltro("concluidas")}
          className={
            filtro === "concluidas"
              ? "filtro ativo"
              : "filtro"
          }
        >Concluídas
          <span>
            {
              // MÉTODO filter(): conta somente as tarefas
              // que já foram concluídas.
              tarefas.filter(
                (tarefa) => tarefa.concluida
              ).length
            }
          </span>
        </button>

      </div>


      <div className="lista-tarefas">

        {/* // MÉTODO map(): percorre a lista de tarefas filtradas
          // e cria um elemento visual para cada tarefa. */}
        {tarefasFiltradas.map(
          (tarefa) => (

            <div
              key={tarefa.id}
              className={
                tarefa.concluida
                  ? "card-tarefa concluida"
                  : "card-tarefa"
              }
            >

              <div className="card-topo">
                <div>
                  <h3>{tarefa.nome}</h3>

                  <span
                    className={
                      tarefa.prioridade === "Alta"
                        ? "prioridade alta"
                        : tarefa.prioridade === "Média"
                        ? "prioridade media"
                        : "prioridade baixa"
                    }
                  >
                    Prioridade: {tarefa.prioridade}
                  </span>
                </div>

                <span
                  className={
                    tarefa.concluida
                      ? "status concluida"
                      : "status pendente"
                  }
                >
                  {tarefa.concluida
                    ? "Concluída"
                    : "Pendente"}
                </span>

              </div>


              {tarefa.data && (

                <p className="data-tarefa">

                  Data:
                  {" "}
                  {new Date(
                    tarefa.data + "T00:00:00"
                  ).toLocaleDateString("pt-BR")}

                </p>

              )}


              {tarefa.descricao && (

                <p className="descricao-tarefa">{tarefa.descricao}</p>

              )}


              <div className="acoes">
                <button
                // CALLBACK: executa a função alternarConcluida
                // quando o usuário clica no botão.
                  onClick={() =>
                    alternarConcluida(tarefa.id)
                  }
                  className="botao-concluir"
                >
                  <Check size={18} />
                  {tarefa.concluida
                    ? "Reabrir"
                    : "Concluir"}

                </button>


                <button
                // CALLBACK: executa a função removerTarefa
                // passando o id da tarefa selecionada.
                  onClick={() =>
                    removerTarefa(tarefa.id)
                  }
                  className="botao-excluir"
                >
                  <Trash2 size={18} />
                  Excluir
                </button>
              </div>
            </div>

          )
        )}

      </div>

      {tarefasFiltradas.length === 0 && (

        <div className="nenhuma-tarefa">
          <p>Nenhuma tarefa encontrada.</p>
          <span>Adicione uma nova tarefa para começar.</span>
        </div>

      )}

    </div>
  );
};

export default Tarefas;
