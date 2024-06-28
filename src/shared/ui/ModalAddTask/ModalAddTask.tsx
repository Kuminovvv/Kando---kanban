import { AutoComplete } from '@consta/uikit/AutoComplete';
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { TextField } from '@consta/uikit/__internal__/src/components/TextField';
import { IconAdd } from '@consta/icons/IconAdd';
import './ModalAddTask.scss';
import { v4 as uuidv4 } from 'uuid';
import { IColumnsFromBackend } from '../../../entities/models/columnsFromBackend';
import { SnackBar } from '@consta/uikit/SnackBar';

export const ModalAddTask = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [columnValue, setColumnValue] = useState<string>('');
    const [columns, setColumns] = useLocalStorage<IColumnsFromBackend>('drop-and-drag', {} as IColumnsFromBackend);
    const [cardTitle, setCardTitle] = useState<string>('');
    const [snackBarItems, setSnackBarItems] = useState([]);

    const handleChange = (value: string) => setCardTitle(value);
    const columnTitles = Object.values(columns).map(column => {
        return {
            label: column.title,
            value: column.title
        };
    });

    const addColumn = () => {
        if (!columnValue) {
            setSnackBarItems([{ key: 1, text: 'Название колонки отсутствует' }]);
            return;
        }

        const columnKey = Object.keys(columns).find(key => columns[key].title === columnValue);
        const newCard = {
            id: uuidv4(),
            name: cardTitle,
            color: 'red',
            description: ''
        };

        if (columnKey) {
            // Добавление карточки в уже существующую колонку
            const updatedColumn = {
                ...columns[columnKey],
                items: [...columns[columnKey].items, newCard]
            };
            setColumns({
                ...columns,
                [columnKey]: updatedColumn
            });
        } else {
            // Создание новой колонки
            const newColumnKey = uuidv4();
            const newColumn = {
                title: columnValue,
                items: cardTitle ? [newCard] : []
            };
            setColumns({
                ...columns,
                [newColumnKey]: newColumn
            });
        }

        setColumnValue('');
        setCardTitle('');
        setIsModalOpen(false);
    };

    return (
        <div className='modal-add-task'>
            <Button
                size="m"
                view="primary"
                label="Добавить задачу"
                width="default"
                iconLeft={IconAdd}
                onClick={() => setIsModalOpen(true)}
            />
            <Modal
                className={cnMixSpace({ p: 'l' })}
                isOpen={isModalOpen}
                hasOverlay
                onClickOutside={() => setIsModalOpen(false)}
                onEsc={() => setIsModalOpen(false)}
            >
                <div className='modal-add-task__container'>
                    <SnackBar onItemClose={() => setSnackBarItems([])} items={snackBarItems} getItemMessage={(item) => item.text} getItemAutoClose={() => 5} />
                    <AutoComplete
                        type="text"
                        placeholder="Название колонки"
                        value={columnValue}
                        maxLength={255}
                        items={columnTitles}
                        onChange={(value) => setColumnValue(value)}
                        getItemKey={(item: { label: string; value: string }) => item.value}
                    />
                    <TextField
                        maxLength={255}
                        onChange={(value) => handleChange(value)}
                        value={cardTitle}
                        type="text"
                        placeholder="Название карточки"
                    />
                    <Button
                        size="m"
                        view="primary"
                        label="Добавить"
                        width="default"
                        onClick={addColumn}
                    />
                </div>
            </Modal>
        </div>
    );
};
