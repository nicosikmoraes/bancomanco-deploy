import Cliente from "../model/cliente";
import { v4 as uuid, v4 } from 'uuid'

export default class ClienteController {
    static newCliente(){
        const cliente = new Cliente();
        cliente.id = uuid()

        return cliente;
    }
}