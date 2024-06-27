import { TextFieldPropValue } from "@consta/uikit/TextField";



export interface IItem {
    id: string;
    name: string | TextFieldPropValue;
    description: string | TextFieldPropValue;
    date: Date | TextFieldPropValue;
    color: string;

}

export class Item implements IItem {
    id: string;
    name: string | TextFieldPropValue;
    description: string | TextFieldPropValue;
    date: Date | TextFieldPropValue;
    color: string;
   

    constructor(obj: IItem) {
        this.id = obj.id
        this.name = obj.name
        this.description = obj.description
        this.date = obj.date
        this.color = obj.color

    }
}
