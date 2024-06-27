import { AutoComplete } from '@consta/uikit/AutoComplete';
import { Button } from '@consta/uikit/Button'
import { Modal } from '@consta/uikit/Modal';
import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts';
import { ColumnsFromBackend } from '../../../entities/models/columnsFromBackend';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { TextField } from '@consta/uikit/__internal__/src/components/TextField';
import { IconAdd } from '@consta/icons/IconAdd';


export const LayoutModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState<string>('');
    const [columns, setColumns] = useLocalStorage<ColumnsFromBackend>('drop-and-drag', {} as ColumnsFromBackend);
    const [cardTitle, setCardTitle] = useState<string>('');
    const handleChange = (value: string) => setCardTitle(value);
    const columnTitles = Object.values(columns).map(column => {
        return {
            label: column.title,
            value: column.title
        }
    });
    console.log(cardTitle)
    const addColumn = () => {
        setColumns({ ...columns, [value]: { title: value, items: [{ name: cardTitle, id: cardTitle }]}})
        setValue('')
        setCardTitle('')
        setIsModalOpen(false)
    }
    return (
        <div className='layout-modal'>
            <Button
                size="m"
                view="primary"
                label="Добавить"
                width="default"
                iconLeft={IconAdd}
                onClick={() => setIsModalOpen(true)}
            />
            <Modal
                className={cnMixSpace({ p: 'm' })}
                isOpen={isModalOpen}
                hasOverlay
                onClickOutside={() => setIsModalOpen(false)}
                onEsc={() => setIsModalOpen(false)}
            >
                <div className='layout-modal__container'>
                    <AutoComplete
                        type="text"
                        placeholder="Название колонки"
                        value={value}
                        items={columnTitles}
                        onChange={(value) => setValue(value)}
                        getItemKey={(item: { label: string; value: string }) => item.value}
                    />
                    <TextField
                        onChange={(value) => handleChange(value)}
                        value={cardTitle}
                        type="text"
                        placeholder="Одна строчка"
                    />
                    <Button
                        size="m"
                        view="primary"
                        label="Открыть модальное окно"
                        width="default"
                        onClick={addColumn}
                    />
                </div>
            </Modal>
        </div>
    )
}
