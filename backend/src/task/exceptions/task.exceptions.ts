export class TaskNotFoundException extends Error {
    constructor(id: number) {
        const message = `Task where id = ${id} is not exist`;
        super(message);
        this.name = 'TaskNotFoundException' 
    }
}
