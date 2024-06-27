import { TextFieldPropValue } from "@consta/uikit/TextField";
import { Item } from "./item";


export interface IColumn {
    items: Item[];
    title: string | TextFieldPropValue;
}

export class TColumn implements IColumn {
    items: Item[];
    title: string | TextFieldPropValue;

    constructor(obj: IColumn) {
        this.items = obj.items ? obj.items.map((e) => new Item(e)) : []
        this.title = obj.title;
    }
}
