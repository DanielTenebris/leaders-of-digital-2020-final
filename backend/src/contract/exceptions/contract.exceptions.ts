export class ContractNotFoundException extends Error {
    constructor(id: number) {
        const message = `Contract where id = ${id} is not exist`;
        super(message);
        this.name = 'ContractNotFoundException' 
    }
}
