import Modal from "react-modal";
import { useState, useEffect } from "react";
import api from "../../adapters/api";

Modal.setAppElement("#root");

const Colaboradores = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [cargoId, setCargoId] = useState("");

  const getColaboradores = async () => {
    try {
      const response = await api.get("Colaborador");

      const data = response.data;

      setColaboradores(data);
    } catch (error) {
      console.log(error);
    }
  };

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
    getColaboradores();
    getCargos();
  }, []);

  function abrirModal() {
    setIsOpen(true);
  }

  function fecharModal() {
    setIsOpen(false);
  }

  const handleSaveColaborador = async () => {
    try {
      const novoColaborador = {
        nome: nome,
        linkedin: linkedin,
        cargoId: cargoId,
      };
      const response = await api.post("Colaborador", novoColaborador);

      console.log(response);

      getColaboradores();
      fecharModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
            Novo Colaborador
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
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Linkedin
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cargo
              </label>
              <div className="mt-2">
                <select
                  id="cargo"
                  name="cargo"
                  className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => setCargoId(e.target.value)}
                >
                  <option value={0}>Selecione</option>
                  {cargos.map((cargo) => (
                    <option key={cargo.id} value={cargo.id}>
                      {cargo.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            onClick={() => handleSaveColaborador()}
          >
            Salvar
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Colaboradores
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
                Novo colaborador
              </button>
            </div>

            <ul role="list" className="divide-y divide-gray-100">
              {colaboradores.map((colaborador) => (
                <li
                  key={colaborador.id}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {colaborador.nome || "Nao informado"}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {colaborador.linkedin || "Nao informado"}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {colaborador.cargo.nome}
                    </p>
                    <a onClick={()=>console.log(colaborador.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
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

export default Colaboradores;
