import { ColumnsFromBackend } from "../../entities/models/columnsFromBackend";

export const columnsFromAbit: ColumnsFromBackend = {
    ['firstColumn']: {
        title: 'Сервисы',
        items: [
            {
                id: 'abit',
                name: 'Портал приемной комиссии',
                description: 'Информация о поступлении и подаче документов',
                date: '12.02.2024',
                color: 'red'
            },
            {
                id: 'sveden',
                name: 'Сведения о реализуемых образовательных программах',
                description: 'Детальная информация о программах обучения',
                date:'12.02.2024',
                color: 'red'

            },
        ]
    },
};