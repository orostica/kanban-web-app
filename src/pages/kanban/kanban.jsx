/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import api from "../../adapters/api";
import Modal from "react-modal";
import { deleteRequest } from "../../adapters/kanbanAdapter";

const Kanban = () => {
  const [tarefas, setTarefas] = useState([]);
  const [nomeTarefa, setNomeTarefa] = useState("");

  const [nomeCard, setNomeCard] = useState("");

  const [modalTarefa, setModalTarefa] = useState(false);
  const [modalCard, setModalCard] = useState(false);

  const [tarefaSelecionada, setTarefaSelecionada] = useState({});

  const getTarefas = async () => {
    try {
      const response = await api.get("Tarefa");

      const data = response.data;

      setTarefas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTarefas();
  }, []);

  const abrirModalTarefa = () => {
    setModalTarefa(true);
  };

  const fecharModalTarefa = () => {
    setModalTarefa(false);
    setNomeTarefa("");
  };

  const abrirModalCard = (tarefa) => {
    setTarefaSelecionada(tarefa);
    setModalCard(true);
  };

  const fecharModalCard = () => {
    setModalCard(false);
    setNomeCard("");
    setTarefaSelecionada({});
  };

  const handleSaveTarefa = async () => {
    try {
      const novaTarefa = {
        nome: nomeTarefa,
      };
      const response = await api.post("Tarefa", novaTarefa);

      console.log(response);

      getTarefas();
      fecharModalTarefa();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveCard = async () => {
    try {
      const novoCard = {
        nome: nomeCard,
        posicao: tarefaSelecionada.cards.length + 1,
        cor: "#FFFFFF",
        tarefaId: tarefaSelecionada.id,
      };
      const response = await api.post("Card", novoCard);

      console.log(response);

      getTarefas();
      fecharModalCard();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTarefa = async (id) => {
    try {
      const response = await deleteRequest("Tarefa", id);

      console.log(response);

      getTarefas();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      const response = await deleteRequest("Card", id);

      console.log(response);

      getTarefas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalTarefa}
        onRequestClose={fecharModalTarefa}
        contentLabel="Modal de exemplo"
        style={{
          content: {
            justifyItems: "space-between",
            top: "20%",
            left: "20%",
            bottom: "auto",
            right: "20%",
          },
        }}
      >
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Nova Tarefa
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={nomeTarefa}
                  onChange={(e) => setNomeTarefa(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            onClick={() => handleSaveTarefa()}
          >
            Salvar
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => fecharModalTarefa()}
          >
            Cancelar
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={modalCard}
        onRequestClose={fecharModalCard}
        contentLabel="Modal de exemplo"
        style={{
          content: {
            justifyItems: "space-between",
            top: "20%",
            left: "20%",
            bottom: "auto",
            right: "20%",
          },
        }}
      >
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Novo Card
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Descrição
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={nomeCard}
                  onChange={(e) => setNomeCard(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            onClick={() => handleSaveCard()}
          >
            Salvar
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => fecharModalCard()}
          >
            Cancelar
          </button>
        </div>
      </Modal>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Kanban
          </h1>
        </div>
      </header>

      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          className="inline-flex w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
          onClick={abrirModalTarefa}
        >
          Nova Tarefa
        </button>
      </div>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div style={{ display: "flex" }}>
          <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 ">
            <div className="flex flex-grow mt-4 space-x-6 overflow-auto ">
              {tarefas.length == 0 && (
                <h2>
                  Nao existem tarefas cadastradas. Adicione em Nova Tarefa.
                </h2>
              )}
              {tarefas.map((tarefa) => (
                <div
                  key={tarefa.id}
                  className="flex flex-col flex-shrink-0 w-72 p-2 bg-gray-200"
                >
                  <div className="flex items-center flex-shrink-0 h-10 px-2">
                    <span className="block text-sm font-semibold">
                      {tarefa.nome}
                    </span>
                    <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                      {tarefa.cards.length}
                    </span>

                    <button
                      onClick={() => abrirModalCard(tarefa)}
                      className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col pb-2 overflow-auto">
                    {tarefa.cards.map((card) => (
                      <div
                        key={card.id}
                        className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
                        draggable="true"
                      >
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fill-rule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </button>
                        <h4 className="text-sm font-medium">{card.nome}</h4>
                      </div>
                    ))}
                    <div className="mt-10 hidden sm:flex sm:flex-col sm:items-end">
                      <a
                        onClick={() => handleDeleteTarefa(tarefa.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Excluir Tarefa
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kanban;
