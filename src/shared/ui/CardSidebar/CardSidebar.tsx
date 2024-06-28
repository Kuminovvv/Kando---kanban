import { Button } from "@consta/uikit/Button";
import { Sidebar } from '@consta/uikit/Sidebar';
import { useState, useEffect, useCallback } from "react";
import { Item } from "../../../entities/models/item";
import './CardSidebar.scss';
import { TextField, TextFieldPropValue } from "@consta/uikit/TextField";
import { IconEdit } from "@consta/icons/IconEdit";
import { IconCheck } from "@consta/icons/IconCheck";
import { DatePicker, DatePickerPropValue } from '@consta/uikit/DatePicker';
import { HexColorPicker } from "react-colorful";
import { useLocalStorage } from "usehooks-ts";
import { IconTrash } from "@consta/icons/IconTrash";
import { Checkbox } from "@consta/uikit/Checkbox";
import { IColumnsFromBackend } from "../../../entities/models/columnsFromBackend";

interface CardSidebarProps {
    item: Item;
    columnId: string;
    isSidebarOpen: boolean;
    onClickOutside: () => void;
}

export const CardSidebar = ({ item, columnId, isSidebarOpen, onClickOutside }: CardSidebarProps) => {
    const [checked, setChecked] = useState<boolean>(item.isClosed);
    const [date, setDate] = useState<DatePickerPropValue<"date">>(new Date(item.date ?? new Date()));
    const [name, setName] = useState<TextFieldPropValue | string>(item.name);
    const [description, setDescription] = useState<TextFieldPropValue | string>(item.description);
    const [color, setColor] = useState<string>(item.color);
    const [columns, setColumns] = useLocalStorage<IColumnsFromBackend>('drop-and-drag', {} as IColumnsFromBackend);

    const [editableFields, setEditableFields] = useState<{ name: boolean; description: boolean }>({
        name: false,
        description: false,
    });

    useEffect(() => {
        if (item.date) {
            setChecked(new Date(item.date) < new Date());
        }else{
            setChecked(item.isClosed);
        }
    }, [item.date, item.isClosed]);

    const saveChanges = useCallback(
        (updatedItem: Item) => {
            const updatedColumns = {
                ...columns,
                [columnId]: {
                    ...columns[columnId],
                    items: columns[columnId].items.map(i => (i.id === updatedItem.id ? updatedItem : i)),
                },
            };
            setColumns(updatedColumns);
        },
        [columns, columnId, setColumns]
    );

    const handleChange = useCallback(
        (field: keyof Item, value: any) => {
            if (field === 'color' && (!value || value === "")) {
                value = "green";
            }
            const updatedItem = { ...item, [field]: value };
            switch (field) {
                case 'name':
                    setName(value);
                    break;
                case 'description':
                    setDescription(value);
                    break;
                case 'isClosed':
                    setChecked(value);
                    break;
                case 'date':
                    setDate(value);
                    break;
                case 'color':
                    setColor(value);
                    break;
                default:
                    break;
            }
            saveChanges(updatedItem);
        },
        [item, saveChanges]
    );

    const deleteItem = () => {
        const updatedColumns = {
            ...columns,
            [columnId]: {
                ...columns[columnId],
                items: columns[columnId].items.filter(i => i.id !== item.id),
            },
        };
        setColumns(updatedColumns);
        onClickOutside();
    };

    const toggleEditField = useCallback(
        (field: keyof typeof editableFields) => () => {
            setEditableFields(prevEditableFields => ({
                ...prevEditableFields,
                [field]: !prevEditableFields[field],
            }));
        },
        []
    );

    const renderEditButton = (field: keyof typeof editableFields) => (
        <Button
            label={editableFields[field] ? "Сохранить" : "Редактировать"}
            view="clear"
            iconRight={editableFields[field] ? IconCheck : IconEdit}
            onlyIcon
            onClick={toggleEditField(field)}
        />
    );

    return (
        <>
            <span style={{ textDecoration: checked ? 'line-through' : 'none' }}>{name}</span>
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
                            onChange={(value) => handleChange('name', value)}
                            value={name}
                            type="text"
                            placeholder="Одна строчка"
                            disabled={!editableFields.name}
                        />
                        {renderEditButton('name')}
                    </div>
                    <Checkbox
                        label="Чекбокс"
                        size="m"
                        view="primary"
                        checked={checked}
                        align="center"
                        disabled={false}
                        onChange={(checked ) => handleChange('isClosed', checked.target.checked)}
                    />
                    <div className="card-sidebar__input">
                        <TextField
                            onChange={(value) => handleChange('description', value)}
                            value={description}
                            type="textarea"
                            cols={200}
                            rows={5}
                            placeholder="Описание"
                            disabled={!editableFields.description}
                        />
                        {renderEditButton('description')}
                    </div>
                    <DatePicker
                        label="Дата завершения"
                        value={date}
                        onChange={(value) => handleChange('date', value)}
                    />
                    <div className="card-sidebar__color">
                        <Button label="Зеленый" style={{ backgroundColor: '#55C776' }} onClick={() => handleChange('color', '#55C776')}/>
                        <Button label="Желтый" style={{ backgroundColor: '#F9D229' }} onClick={() => handleChange('color', '#F9D229')}/>
                        <Button label="Красный" style={{ backgroundColor: '#E62520' }} onClick={() => handleChange('color', '#E62520')}/>
                        <HexColorPicker
                            color={color}
                            onChange={(value) => handleChange('color', value)}
                        />
                    </div>
                </Sidebar.Content>
            </Sidebar>
        </>
    );
};
