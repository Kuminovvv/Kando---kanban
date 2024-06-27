import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLocalStorage } from "usehooks-ts";
import './DropAndDrag.scss';
import { Column } from "./Column/Column";
import { ColumnsFromBackend } from "../../../entities/models/columnsFromBackend";
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/icons/IconAdd';
import { TextFieldPropValue } from '@consta/uikit/TextField';
import { onDragEnd } from "../../../entities/helper";


export const DropAndDrag = () => {
    const [columns, setColumns] = useLocalStorage<ColumnsFromBackend>('drop-and-drag', {} as ColumnsFromBackend);


    const updateColumnTitle = (columnId: string, newTitle: TextFieldPropValue) => {
        const updatedColumns = {
            ...columns,
            [columnId]: {
                ...columns[columnId],
                title: newTitle,
            },
        };
        setColumns(updatedColumns);
    };

    const deleteColumn = (columnId: string) => {
        const updatedColumns = { ...columns };
        delete updatedColumns[columnId];
        setColumns(updatedColumns);
    };

    const addCard = (columnId: string) => {
        const updatedColumns = {
            ...columns,
            [columnId]: {
                ...columns[columnId],
                items: [
                    ...columns[columnId].items,
                    {
                        id: Date.now().toString(),
                        name: 'Новая карточка',
                        color: "red",
                        date: new Date(),
                        description: "",
                    }
                ],
            },
        };
        setColumns(updatedColumns);
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
                onClick={() => {
                    setColumns({ ...columns, [Date.now().toString()]: { title: 'Новая колонка', items: [] } });
                }}
                iconLeft={IconAdd}
            />
        </div>
    );
}
