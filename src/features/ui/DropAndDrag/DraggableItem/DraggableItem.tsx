import { Draggable } from "react-beautiful-dnd";
import { Item } from "../../../../entities/models/item";
import { CardSidebar } from "../../../../shared/ui/CardSidebar/CardSidebar";
import { IconDraggable } from '@consta/icons/IconDraggable';
import { IconAlignLeft } from '@consta/icons/IconAlignLeft';

interface DraggableItemProps {
    item: Item;
    index: number;
    columnId: string;
    
}

export const DraggableItem = ({ item, index, columnId }: DraggableItemProps) => (
    <Draggable draggableId={item.id.toString()} index={index}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="drop-and-drag__item"
                style={{
                    ...provided.draggableProps.style
                }}
            >
                <div className="drop-and-drag__item-inner">
                    <div style={{ maxWidth: '90%', display: 'grid' }}>
                        <CardSidebar columnId={columnId} item={item} />
                        <div className="drop-and-drag__info">
                            {item.description ? <IconAlignLeft size="s" /> : null}
                            {item.date ? <div className="drop-and-drag__info-date" style={{ backgroundColor: item.color}}>{new Date(item.date).toLocaleDateString()}</div> : null}
                        </div>
                    </div>
                    <IconDraggable />
                </div>
            </div>
        )}
    </Draggable>
);
