import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLocalStorage } from "usehooks-ts";
import './DropAndDrag.scss';
import { Column } from "./Column/Column";
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/icons/IconAdd';
import { TextFieldPropValue } from '@consta/uikit/TextField';
import { onDragEnd } from "../../../entities/helper";
import { v4 as uuidv4 } from 'uuid';
import { IColumnsFromBackend } from "../../../entities/models/columnsFromBackend";

export const DropAndDrag = () => {
    const [columns, setColumns] = useLocalStorage<IColumnsFromBackend>('drop-and-drag', {} as IColumnsFromBackend);

    const updateColumnTitle = (columnId: string, newTitle: TextFieldPropValue) => {
        setColumns(prevColumns => ({
            ...prevColumns,
            [columnId]: {
                ...prevColumns[columnId],
                title: newTitle,
            },
        }));
    };

    const deleteColumn = (columnId: string) => {
        setColumns(prevColumns => {
            const updatedColumns = { ...prevColumns };
            delete updatedColumns[columnId];
            return updatedColumns;
        });
    };

    const addCard = (columnId: string) => {
        const newCard = {
            id: Date.now().toString(),
            name: 'Новая карточка',
            color: "red",
            description: "",
            isClosed: false,
        };
        setColumns((prevColumns: IColumnsFromBackend) => ({
            ...prevColumns,
            [columnId]: {
                ...prevColumns[columnId],
                items: [...prevColumns[columnId].items, newCard],
            },
        }));
    };

    const addColumn = () => {
        const newColumnId = uuidv4();
        const newColumn = { title: 'Новая колонка', items: [] };
        setColumns(prevColumns => ({
            ...prevColumns,
            [newColumnId]: newColumn,
        }));
    };

    return (
        <div className="drop-and-drag">
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {provided => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="drop-and-drag__column-container"
                        >
                            {Object.entries(columns).map(([columnId, column], index) => (
                                <Draggable key={columnId} draggableId={columnId} index={index}>
                                    {provided => (
                                        <div
                                            className="drop-and-drag__column-wrapper"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Column
                                                columnId={columnId}
                                                column={column}
                                                updateColumnTitle={updateColumnTitle}
                                                deleteColumn={deleteColumn}
                                                addCard={addCard}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Button
                label="Добавить новую колонку"
                view="clear"
                onClick={addColumn}
                iconLeft={IconAdd}
            />
        </div>
    );
};
