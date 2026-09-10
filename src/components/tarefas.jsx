import { useState, useEffect } from "react";
import { Home, Check, Trash2 } from "lucide-react";
import "../css/style.css";

const Tarefas = () => {
    const [tarefas, setTarefas] = useState([]);

const [nome, setNome] = useState("");
const [data, setData] = useState("");
const [descricao, setDescricao] = useState("");
const [prioridade, setPrioridade] = useState("Média");

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
    prioridade: prioridade
  };

  setTarefas([...tarefas, novaTarefa]);

  setNome("");
  setData("");
  setDescricao("");
  setPrioridade("Média");
};

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
)