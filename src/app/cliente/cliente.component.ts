import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { cliente } from '../model/cliente';
import { TelefonoCliente } from '../model/TelefonoCliente';
import { ServiceService } from '../services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  form!: FormGroup;
  dataCliente: cliente[] = [];
  data!: cliente;
  dataTelefono: TelefonoCliente[] = [];
  _addtelefono!: number;
  telephonesToTable: string[] = [];
  telObj!: TelefonoCliente;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  _cliente!: cliente[];

  @ViewChild('telefono') input: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private serviceCliente: ServiceService<cliente>,
    private serviceTelefono: ServiceService<TelefonoCliente>,
    private modal: NgbModal,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.getAll();
    this.formValidator();
    //this.refreshClients();
  }

  //get f() { return this.form.controls; }

  formValidator() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  refreshClients() {
    this._cliente = this.dataCliente
      .map((cliente, i) => ({ id: i + 1, ...cliente }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  getAll() {
    this.serviceCliente
      .getAll('Cliente', 'GetAll')
      .subscribe((cliente: cliente[]) => {
        this.dataCliente = cliente;
        this.refreshClients();
        this.collectionSize = this.dataCliente.length;
        console.log(this.dataCliente.length);
      });
  }

  clientDetails(content: any, clienteId: any) {
    this.serviceTelefono
      .getByIDPhone('Cliente', `GetClientDetails?clienteId=${clienteId}`)
      .subscribe((telefono: TelefonoCliente[]) => {
        this.dataTelefono = telefono;
        this._addtelefono = clienteId;
        this.modal.open(content);
        console.log(this.dataTelefono, 'idCliente:' + this._addtelefono);
      });
  }

  addPhoneToTable(phone: string) {
    this.telephonesToTable.push(phone);
  }

  deletePhone(index: any) {
    this.telephonesToTable.splice(index, 1);
    console.log(this.telephonesToTable);
  }

  openCliente(content: any) {
    this.modal.open(content, { size: 'xl' });
  }

  saveCliente(form: FormGroup) {
    var arr: TelefonoCliente[] = [];

    for (let index = 0; index < this.telephonesToTable.length; index++) {
      const element = this.telephonesToTable[index];

      var p = { clienteId: 0, numero: element };
      arr.push(p as TelefonoCliente);
    }

    let obj: cliente = {
      nombre: form.value.nombre,
      direccion: form.value.direccion,
      telefonosClientes: arr,
    };
    console.log(form.value);
    this.serviceCliente
      .Create('Cliente', 'AddCliente', obj)
      .subscribe((res) => {
        alert('Registro insertado');
        this.ngOnInit();
        this.modal.dismissAll();
      });
  }

  openTelefono(content: any) {
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  addPhone(telefono: any, IdCliente: any) {
    var Obj = {
      clienteId: IdCliente,
      numero: telefono,
    };
    this.serviceTelefono
      .Create('Telefono', 'AddTelefono', Obj)
      .subscribe((res) => {
        alert('Registro insertado');
        this.modal.dismissAll();
      });
  }
}
