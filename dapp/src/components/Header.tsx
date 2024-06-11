'use client';

import { useState, useEffect } from "react";
import { doLogin } from "@/services/Web3Services";

export default function Header() {

  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState('');

  useEffect(() => {
    const localStorageWallet = localStorage.getItem('wallet') || '';
    setWallet(localStorageWallet);
    setLoading(false);
  }, []);

  function handleLogin() {
    doLogin()
      .then(wallet => {
        alert(`Endereço "${wallet}" logado com sucesso!`)
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert(err.message);
      });
  };

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          <a href="/" className="justify-content-start" style={{ textDecoration: "none" }}>
            <h1 className="font-bold text-light">FloodHelp</h1>
          </a>

          <div className="text-end col-9">
            { loading
              ? <button className="btn btn-outline-light" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="ms-1">Carregando...</span>
                </button>
              : wallet
                ? <a href="/create" className="btn btn-warning">Pedir Ajuda</a>
                : <button type="button" className="btn btn-outline-light me-2" onClick={ handleLogin }>
                    <img src="/metamask.svg" width="24" className="me-3" />
                    Entrar
                  </button>
            }
          </div>
        </div>
      </div>
    </header>
  );
}
