// Column.tsx
import { Droppable } from "react-beautiful-dnd";
import { DraggableItem } from "../DraggableItem/DraggableItem";
import { TColumn } from "../../../../entities/models/TColumn";
import { Button } from "@consta/uikit/Button";
import { IconEdit } from '@consta/icons/IconEdit';
import { IconTrash } from '@consta/icons/IconTrash';
import { IconAdd } from '@consta/icons/IconAdd';
import { useState } from "react";
import { TextField, TextFieldPropValue } from "@consta/uikit/TextField";
// Column.tsx

interface ColumnProps {
    columnId: string;
    column: TColumn;
    updateColumnTitle: (columnId: string, newTitle: TextFieldPropValue) => void;
    deleteColumn: (columnId: string) => void;
    addCard: (columnId: string) => void; // Добавляем новый пропс
}

export const Column = ({ columnId, column, updateColumnTitle, deleteColumn, addCard }: ColumnProps) => {
    const [title, setTitle] = useState<TextFieldPropValue>(column.title);
    const [isEdit, setIsEdit] = useState(false);

    const handleChange = (value: TextFieldPropValue) => setTitle(value);
    const handleEdit = () => {
        if (isEdit && title !== column.title) {
            updateColumnTitle(columnId, title);
        }
        setIsEdit(prev => !prev);
    };
    const handleDelete = () => {
        deleteColumn(columnId);
    };
    const handleAddCard = () => {
        addCard(columnId); // Добавление карточки с предопределённым содержанием
    };

    return (
        <div className="drop-and-drag__column" key={columnId}>
            <div className="drop-and-drag__column-title">
                <h2>
                    <TextField
                        onChange={(value) => handleChange(value)}
                        value={title}
                        type="text"
                        placeholder="Одна строчка"
                        disabled={!isEdit}
                    />
                </h2>
                <Button label="Редактировать" view="clear" iconRight={IconEdit} onlyIcon onClick={handleEdit} />
                <Button label="Удалить" view="clear" iconRight={IconTrash} onlyIcon onClick={handleDelete} />
                <Button label="Добавить карточку" view="clear" iconRight={IconAdd} onlyIcon onClick={handleAddCard} />
            </div>
            <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="drop-and-drag__column-inner"
                        style={{
                            background: snapshot.isDraggingOver ? "lightblue" : "",
                        }}
                    >
                        {column.items.map((item, index) => (
                            <DraggableItem columnId={columnId} key={item.id} item={item} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
