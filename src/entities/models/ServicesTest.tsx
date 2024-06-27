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
    ['secondColumn']: {
        title: 'Сервисы',
        items: [
            {
                id: 'distdocs',
                name: 'Электронная подача документов в вуз',
                description: 'Возможность подать документы онлайн',
                date:'12.02.2024',
                color: 'red'

            },
            {
                id: 'omsu',
                name: 'Официальный сайт ОмГУ',
                description: 'Основной сайт Омского государственного университета',
                date:'12.02.2024',
                color: 'red'
            },

        ]
    },
    ['thirdColumn']: {
        title: 'Сервисы',
        items: [
            {
                id: 'positionege',
                name: 'Калькулятор ЕГЭ',
                description: 'Инструмент для расчета баллов ЕГЭ',
                date:'12.02.2024',
                color: 'red'
            },
        ]
    },
};