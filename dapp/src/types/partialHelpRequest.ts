import { HelpRequest } from "./interfaces/helpRequest";

export type PartialHelpRequest = Partial<HelpRequest> & {
  title: string;
  description: string;
  contact: string;
  goal: number;
};
