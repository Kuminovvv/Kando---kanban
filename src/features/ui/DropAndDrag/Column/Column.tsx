import { Droppable } from "react-beautiful-dnd";
import { DraggableItem } from "../DraggableItem/DraggableItem";
import { TColumn } from "../../../../entities/models/TColumn";
import { Button } from "@consta/uikit/Button";
import { IconEdit } from '@consta/icons/IconEdit';
import { IconTrash } from '@consta/icons/IconTrash';
import { IconAdd } from '@consta/icons/IconAdd';
import { IconCheck } from '@consta/icons/IconCheck';
import { useState } from "react";
import { TextField, TextFieldPropValue } from "@consta/uikit/TextField";

interface ColumnProps {
    columnId: string;
    column: TColumn;
    updateColumnTitle: (columnId: string, newTitle: TextFieldPropValue) => void;
    deleteColumn: (columnId: string) => void;
    addCard: (columnId: string) => void;
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

    return (
        <div className="drop-and-drag__column">
            <div className="drop-and-drag__column-header">
                <h2 className="drop-and-drag__column-title">
                    {isEdit ? (
                        <TextField
                            onChange={handleChange}
                            value={title}
                            type="text"
                            placeholder="Одна строчка"
                        />
                    ) : title}
                </h2>
                <div className="drop-and-drag__column-actions">
                    {
                        isEdit ? (
                            <Button label="Сохранить" view="clear" iconRight={IconCheck} onlyIcon onClick={handleEdit} />
                        ) : (
                            <Button label="Редактировать" view="clear" iconRight={IconEdit} onlyIcon onClick={handleEdit} />
                        )
                    }
                    <Button label="Удалить" view="clear" iconRight={IconTrash} onlyIcon onClick={() => deleteColumn(columnId)} />
                    <Button label="Добавить карточку" view="clear" iconRight={IconAdd} onlyIcon onClick={() => addCard(columnId)} />
                </div>
            </div>
            <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="drop-and-drag__column-content"
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
};
