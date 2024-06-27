import { Button } from "@consta/uikit/Button";
import { Sidebar } from '@consta/uikit/Sidebar';
import { useState } from "react";
import { Item } from "../../../entities/models/item";
import './CardSidebar.scss';
import { TextField, TextFieldPropValue } from "@consta/uikit/TextField";
import { IconEdit } from "@consta/icons/IconEdit";
import { IconCheck } from "@consta/icons/IconCheck";
import { DatePicker, DatePickerPropValue } from '@consta/uikit/DatePicker';
import { HexColorPicker } from "react-colorful";
import { useLocalStorage } from "usehooks-ts";
import { ColumnsFromBackend } from "../../../entities/models/columnsFromBackend";
import { IconTrash } from "@consta/icons/IconTrash";

interface CardSidebarProps {
    item: Item;
    columnId: string;
}

export const CardSidebar = ({ item, columnId }: CardSidebarProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [date, setDate] = useState<DatePickerPropValue<"date">>(new Date(item.date));
    const [name, setName] = useState<TextFieldPropValue | string>(item.name);
    const [description, setDescription] = useState<TextFieldPropValue | string>(item.description);
    const [color, setColor] = useState<string>(item.color);
    const [columns, setColumns] = useLocalStorage<ColumnsFromBackend>('drop-and-drag', {} as ColumnsFromBackend);

    const [editableFields, setEditableFields] = useState<{
        name: boolean;
        description: boolean;
    }>({
        name: false,
        description: false,
    });

    const handleChangeName = (value: TextFieldPropValue | string) => {
        setName(value);
        saveChanges({ ...item, name: value });
    };

    const handleChangeDescription = (value: TextFieldPropValue) => {
        setDescription(value);
        saveChanges({ ...item, description: value });
    };

    const handleChangeDate = (value: DatePickerPropValue<"date">) => {
        setDate(value);
        saveChanges({ ...item, date: value });
    };

    const handleChangeColor = (value: string) => {
        setColor(value);
        saveChanges({ ...item, color: value });
    };

    const saveChanges = (updatedItem: Item) => {
        const updatedColumns = {
            ...columns,
            [columnId]: {
                ...columns[columnId],
                items: columns[columnId].items.map(i => i.id === updatedItem.id ? updatedItem : i),
            },
        };
        setColumns(updatedColumns);
    };

    const deleteItem = () => {
        const updatedColumns = {
            ...columns,
            [columnId]: {
                ...columns[columnId],
                items: columns[columnId].items.filter(i => i.id !== item.id),
            },
        };
        setColumns(updatedColumns);
        setIsSidebarOpen(false);
    };

    const toggleEditField = (field: string) => () => {
        setEditableFields(prevEditableFields => ({
            ...prevEditableFields,
            [field]: !prevEditableFields[field],
        }));
    };

    const renderEditButton = (field: string) => {
        return editableFields[field] ? (
            <Button label="Сохранить" view="clear" iconRight={IconCheck} onlyIcon onClick={toggleEditField(field)} />
        ) : (
            <Button label="Редактировать" view="clear" iconRight={IconEdit} onlyIcon onClick={toggleEditField(field)} />
        );
    };

    const onClickOutside = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <Button
                size="m"
                view="clear"
                label={name}
                width="default"
                onClick={() => setIsSidebarOpen(true)}
            />
            <Sidebar
                hasOverlay={false}
                size='1/3'
                isOpen={isSidebarOpen}
                onClickOutside={onClickOutside}
                onEsc={onClickOutside}
            >
                <Sidebar.Content className="card-sidebar__content">
                    <Button
                        label="Удалить карточку"
                        view="ghost"
                        iconLeft={IconTrash}
                        onClick={deleteItem}
                    />
                    <div className="card-sidebar__input">
                        <TextField
                            onChange={handleChangeName}
                            value={name}
                            type="text"
                            placeholder="Одна строчка"
                            disabled={!editableFields.name}
                        />
                        {renderEditButton('name')}
                    </div>
                    <div className="card-sidebar__input" >
                        <TextField
                            onChange={handleChangeDescription}
                            value={description}
                            type="textarea"
                            cols={200}
                            rows={5}
                            placeholder="Описание"
                            onClick={() => console.log('click')}
                            disabled={!editableFields.description}
                        />
                        {renderEditButton('description')}
                    </div>
                    <DatePicker label="Дата завершения" value={date} onChange={handleChangeDate} />
                    <div className="card-sidebar__color">
                        <TextField label="Цвет" value={color} onChange={handleChangeColor} />
                        <br />
                        <br />
                        <HexColorPicker color={color} onChange={handleChangeColor} />
                    </div>
                </Sidebar.Content>
            </Sidebar>
        </>
    );
};
