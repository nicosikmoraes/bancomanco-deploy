export default class Cliente {
    public id!: string;
    public nome!: string;
    public cpf!: string;
    public dataNascimento!: number;
    public email!: string;
    public senha!: string;
    public saldo: number = 0.00;
}
