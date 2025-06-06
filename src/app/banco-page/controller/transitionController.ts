import Transition from "../model/transition";


export default class ClienteController {
    static newTransition(id: string){
        const transition = new Transition();
        transition.id = id

        return transition;
    }
}