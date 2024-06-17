import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HelpRequestItem from "@/components/HelpRequestItem";
import { getOpenHelpRequests } from "@/services/Web3Services";
import { HelpRequest } from "@/types";

export default function Home() {

  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);

  useEffect(() => {
    loadRequests(0);
  }, []);

  async function loadRequests(lastId: number) {
    try {
      const result = await getOpenHelpRequests(lastId);
      if (lastId === 0)
        setHelpRequests(result);
      else {
        const allHelpRequests = helpRequests;
        allHelpRequests.push(...result);
        setHelpRequests(allHelpRequests);
      }
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    }
  };

  return (
    <main>
      <Header />

      <div className="container">
        <div className="row ps-5">
          <p className="lead m-4">Ajude as vítimas de enchentes e demais desastres naturais do Brasil.</p>
        </div>
        
        <div className="p-4 mx-5">
          {
            helpRequests && helpRequests.length
            ? helpRequests.map((request) => <HelpRequestItem key={ request.id } data={ request } />)
            : <span>Conecte sua carteira Metamask no botão "Entrar" para ajudar ou pedir ajuda.</span>
          }
        </div>
      
        <Footer />
      </div>
    </main>
  );
}
