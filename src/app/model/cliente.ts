import { TelefonoCliente } from "./TelefonoCliente";

export interface cliente{
  id?:number;
  nombre:String;
  direccion:String;
  telefonosClientes: TelefonoCliente[];
}
