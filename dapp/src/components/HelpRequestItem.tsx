import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import { HelpRequest } from "@/types";
import { closeHelpRequest, donate } from "@/services/Web3Services";
import Web3 from "web3";

interface HelpRequestItemProps {
  data: HelpRequest;
}

export default function HelpRequestItem({ data }: HelpRequestItemProps) {

  function handleCloseBtnClick() {
    if (!confirm("Tem certeza que deseja fechar este pedido?")) return;

    closeHelpRequest(data.id)
      .then(_result => {
        alert("Pedido fechado com sucesso. Em alguns minutos deixará de ser visto no site.");
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert(err.message);
      });
  };

  function handleHelpBtnClick() {
    const donationInBnb = prompt("O quanto deseja doar (em BNB)?", '0');

    if (!donationInBnb) return;

    const donationInBnbToNumber = parseFloat(donationInBnb);

    donate(data.id, donationInBnbToNumber)
      .then(_result => {
        alert("Doação efetuada com sucesso. Em alguns minutos será processada.");
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert(err.message);
      });
  };
  return (
    <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
      <img
        src={ generateAvatarURL(data.author) }
        width="32"
        height="32"
        className="rouded-circle"
      />
      <div className="d-flex gap-2 w-100 justify-content-between">
        <div className="w-100">

          <div className="row">
            <div className="col">
              <h6 className="mb-0">{ data.title } &rsaquo;&rsaquo; Contato: { data.contact }</h6>
            </div>
            <div className="col">
              <div className="text-end">
                {
                  localStorage.getItem('wallet') === data.author.toLowerCase()
                  ? <button type="button" className="btn btn-danger btn-sm" onClick={ handleCloseBtnClick }>Fechar</button>
                  : <button type="button" className="btn btn-success btn-sm" onClick={ handleHelpBtnClick }>&#36; Ajudar</button>
                }
              </div>
            </div>
          </div>

          <p className="opacity-75 pe-5 mb-0 me-5">{ data.description }</p>

          <div className="row">
            <div className="col">
              <span className="me-1 opacity-75">Meta:</span>
              <span className="opacity-50">
                {
                  data.balance
                    ? `BNB ${Web3.utils.fromWei(data.balance, "ether")} obtidos de ${Web3.utils.fromWei(data.goal, "ether")}`
                    : `BNB ${Web3.utils.fromWei(data.goal, "ether")}`
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
