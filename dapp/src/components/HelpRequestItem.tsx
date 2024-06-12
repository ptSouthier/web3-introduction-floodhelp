import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import { HelpRequest } from "@/types";

interface HelpRequestItemProps {
  data: HelpRequest;
}

export default function HelpRequestItem({ data }: HelpRequestItemProps) {
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
                  ? <button type="button" className="btn btn-danger btn-sm">Fechar</button>
                  : <button type="button" className="btn btn-success btn-sm">&#36; Ajudar</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
