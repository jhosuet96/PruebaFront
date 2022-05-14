import { cliente } from "./cliente";

export interface TelefonoCliente{
  id?:number;
  numero:string;
  clienteId:number;
  cliente: cliente
}
