import Modal from "react-modal";
import { useState, useEffect } from "react";
import api from "../../adapters/api";
import { deleteRequest } from "../../adapters/kanbanAdapter";

Modal.setAppElement("#root");

const Cargos = () => {
  const [cargos, setCargos] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const [cargoSelecionado, setCargoSelecionado] = useState({});

  const getCargos = async () => {
    try {
      const response = await api.get("Cargo");

      const data = response.data;

      setCargos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCargos();
  }, []);

  const abrirModal = () => {
    setIsOpen(true);
  };

  const fecharModal = () => {
    setIsOpen(false);
    setNome("");
    setDescricao("");
  };

  const abrirModalEditar = (cargo) => {
    setCargoSelecionado(cargo);
    setModalEditar(true);
  };

  const fecharModalEditar = () => {
    setCargoSelecionado({});
    setModalEditar(false);
  };

  const handleSaveCargo = async () => {
    try {
      const novoCargo = {
        nome: nome,
        descricao: descricao,
      };
      const response = await api.post("Cargo", novoCargo);

      console.log(response);

      getCargos();
      fecharModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCargo = async () => {
    try {
      const response = await api.put("Cargo", cargoSelecionado);

      console.log(response);

      getCargos();
      fecharModalEditar();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCargo = async (id) => {
    try {
      const response = await deleteRequest("Cargo", id);

      console.log(response);

      getCargos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalEditar}
        onRequestClose={fecharModalEditar}
        contentLabel="Modal"
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
            Editar Cargo
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
                  value={cargoSelecionado.nome}
                  onChange={(e) =>
                    setCargoSelecionado({
                      ...cargoSelecionado,
                      nome: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Descricao
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="descricao"
                  id="descricao"
                  className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={cargoSelecionado.descricao}
                  onChange={(e) =>
                    setCargoSelecionado({
                      ...cargoSelecionado,
                      descricao: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            onClick={() => handleEditCargo()}
          >
            Salvar
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => fecharModalEditar()}
          >
            Cancelar
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
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
            Novo Cargo
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
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Descricao
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="descricao"
                  id="descricao"
                  className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            onClick={() => handleSaveCargo()}
          >
            Salvar
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => fecharModal()}
          >
            Cancelar
          </button>
        </div>
      </Modal>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Cargos
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                className="inline-flex w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
                onClick={abrirModal}
              >
                Novo cargo
              </button>
            </div>

            {cargos.length == 0 && (
              <h2>Nao existem cargos cadastrados. Adicione em Novo cargo.</h2>
            )}

            <ul role="list" className="divide-y divide-gray-100">
              {cargos.map((cargo) => (
                <li
                  key={cargo.id}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {cargo.nome}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {cargo.descricao}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <a
                      onClick={() => abrirModalEditar(cargo)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Editar
                    </a>
                    <a
                      onClick={() => handleDeleteCargo(cargo.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Excluir
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Cargos;
