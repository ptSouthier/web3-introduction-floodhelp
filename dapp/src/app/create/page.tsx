'use client';

import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { openHelpRequest } from "@/services/Web3Services";
import { PartialHelpRequest } from "@/types";

export default function Create() {

  const [request, setRequest] = useState<PartialHelpRequest>({
    title: "",
    description: "",
    contact: "",
    goal: 0
  });

  function onInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setRequest(prevState => ({
      ...prevState,
      [event.target.id]: event.target.value
    }));
  };

  function handleSubmit() {
    alert("Iniciando processo de salvamento...");
    openHelpRequest(request)
      .then(_result => {
        alert("Pedido enviado com sucesso. Em alguns minutos estará disponível na página inicial.");
        window.location.href = "/";
      })
      .catch(err => {
        console.error(err);
        alert(err.message);
      });
  };

  return (
    <main>
      <Header />

      <div className="container">

        <form className="ps-5">
          <div className="row my-3">
            <p className="lead">Preencha todos os campos abaixo para nos dizer o que precisa.</p>
          </div>

          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                id="title"
                className="form-control"
                maxLength={ 150 }
                value={ request.title }
                onChange={ onInputChange }
              />
              <label htmlFor="title">Resumo do que precisa:</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-floating mb-3">
              <textarea
                id="description"
                className="form-control"
                style={{ height: 100 }}
                value={ request.description }
                onChange={ onInputChange }
              ></textarea>
              <label htmlFor="description">Descreva em detalhes o que precisa e onde você está (para entregas presenciais):</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                id="contact"
                className="form-control"
                maxLength={ 150 }
                value={ request.contact }
                onChange={ onInputChange }
              />
              <label htmlFor="contact">Contato (telefone ou e-mail):</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="number"
                id="goal"
                className="form-control"
                value={ request.goal }
                onChange={ onInputChange }
              />
              <label htmlFor="goal">Meta em BNB (deixe em branco caso não deseje receber doação em cripto):</label>
            </div>
          </div>

          <div className="row">
            <div className="col-1 mb-3">
              <a href="/" className="btn btn-outline-dark col-12 p-3">Voltar</a>
            </div>

            <div className="col-5 mb-3 p-0">
              <button type="button" className="btn btn-dark col-12 p-3" onClick={ handleSubmit }>Enviar Pedido</button>
            </div>
          </div>
        </form>

        <Footer />
      </div>
    </main>
  );
}