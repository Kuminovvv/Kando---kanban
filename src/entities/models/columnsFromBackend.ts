
import { TColumn } from "./TColumn";


export interface IColumnsFromBackend {
    firstColumn: TColumn;
    secondColumn: TColumn;
    thirdColumn: TColumn;
}

export class ColumnsFromBackend implements IColumnsFromBackend {
    firstColumn: TColumn;
    secondColumn: TColumn;
    thirdColumn: TColumn;

    constructor(obj: IColumnsFromBackend) {
        this.firstColumn = new TColumn(obj.firstColumn)
        this.secondColumn = new TColumn(obj.secondColumn)
        this.thirdColumn = new TColumn(obj.thirdColumn)
    }
}
