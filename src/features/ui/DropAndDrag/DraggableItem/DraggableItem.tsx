import { Draggable } from "react-beautiful-dnd";
import { Item } from "../../../../entities/models/item";
import { CardSidebar } from "../../../../shared/ui/CardSidebar/CardSidebar";
import { IconDraggable } from '@consta/icons/IconDraggable';
import { IconAlignLeft } from '@consta/icons/IconAlignLeft';
import { useState } from "react";

interface DraggableItemProps {
    item: Item;
    index: number;
    columnId: string;
}

export const DraggableItem = ({ item, index, columnId }: DraggableItemProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const onClickOutside = () => {
        setIsSidebarOpen(false);
    };

    return (
        <Draggable draggableId={item.id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="drop-and-drag__item"
                    style={{ ...provided.draggableProps.style }}
                >
                    <div className="drop-and-drag__item-content" onClick={() => setIsSidebarOpen(true)}>
                        <div className="drop-and-drag__item-main">
                            <CardSidebar isSidebarOpen={isSidebarOpen} onClickOutside={onClickOutside} columnId={columnId} item={item} />
                            <div className="drop-and-drag__item-info">
                                {item.description && <IconAlignLeft size="s" />}
                                {item.date && (
                                    <div className="drop-and-drag__item-date" style={{ backgroundColor: item.color }}>
                                        {new Date(item.date).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        </div>
                        <IconDraggable />
                    </div>
                </div>
            )}
        </Draggable>
    );
};
