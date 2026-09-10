import { useState, useEffect } from "react";
import { Home, Check, Trash2 } from "lucide-react";
import "../css/style.css";

const Tarefas = () => {
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

useEffect(() => {
  localStorage.setItem(
    "lista-tarefas",
    JSON.stringify(tarefas)
  );
}, [tarefas]);

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

  const removerTarefa = (id) => {

    const tarefasAtualizadas = tarefas.filter(
      (tarefa) => tarefa.id !== id
    );
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

return(
    <form onSubmit={adicionarTarefa} className="formulario">
        <h2>Nova tarefa</h2>

        <div className="campo">
        <label>Nome da tarefa</label>
        <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Fazer trabalho de React"
        />
        </div>

        <div className="campo">
        <label>Data</label>
        <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
        />
        </div>

        <div className="campo">
        <label>Descrição</label>
        <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite uma descrição para a tarefa..."
            rows="4"
        />
        </div>

        <div className="campo">
        <label>Nível de prioridade</label>
        <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
        >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
        </select>
        </div>

        <button type="submit" className="botao-adicionar">
        Adicionar tarefa
        </button>
    </form>

    <div className="filtros">

    <button
        onClick={() => setFiltro("todas")}
        className={
        filtro === "todas"
            ? "filtro ativo"
            : "filtro"
        }
    >
        Todas
        <span>{tarefas.length}</span>
    </button>

    <button
        onClick={() => setFiltro("pendentes")}
        className={
        filtro === "pendentes"
            ? "filtro ativo"
            : "filtro"
        }
    >
        Pendentes
        <span>
        {
            tarefas.filter(
            (tarefa) => !tarefa.concluida
            ).length
        }
        </span>
    </button>

    <button
        onClick={() => setFiltro("concluidas")}
        className={
        filtro === "concluidas"
            ? "filtro ativo"
            : "filtro"
        }
    >
        Concluídas
        <span>
        {
            tarefas.filter(
            (tarefa) => tarefa.concluida
            ).length
        }
        </span>
    </button>

    </div>

    <div className="lista-tarefas">
    {tarefasFiltradas.map((tarefa) => (
        <div
  key={tarefa.id}
  className={
    tarefa.concluida
      ? "card-tarefa concluida"
      : "card-tarefa"
  }
>
        <h3>{tarefa.nome}</h3>

        {tarefa.data && (
            <p>
            Data:{" "}
            {new Date(
                tarefa.data + "T00:00:00"
            ).toLocaleDateString("pt-BR")}
            </p>
        )}

        {tarefa.descricao && (
            <p>{tarefa.descricao}</p>
        )}

        <p>Prioridade: {tarefa.prioridade}</p>

        <p>
        Status:{" "}
        {tarefa.concluida
            ? "Concluída"
            : "Pendente"}
        </p>

        <button
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
            onClick={() => removerTarefa(tarefa.id)}
            className="botao-excluir"
        >
            Excluir
        </button>
        </div>
    ))}
    </div>
)