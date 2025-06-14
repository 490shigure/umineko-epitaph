import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDocTitle } from "@/hooks/useDocTitle";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

const Quadrillion: React.FC = () => {
    const { t } = useTranslation();
    useDocTitle(t("pages.quadrillion.title"));
    
    const [phase, setPhase] = useState<number>(0);
    const [quadState, setQuadState] = useState<string[]>(() => Array.from("Quadrillion"));
    const [draggable, setDraggable] = useState(false);

    // sortable sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // 避免点击误触拖拽
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        })
    );
    // sortable drag end handler
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = parseInt(active.id as string);
            const newIndex = parseInt(over?.id as string);
            setQuadState((items) => arrayMove(items, oldIndex, newIndex));
        }
    };
    // handle click event in per phase
    const handleClick = (index: number) => {
        if (phase === 0 || (phase >= 3 && phase <= 7)) {
            // remove the character at the index
            const newQuadState = [...quadState];
            newQuadState[index] = "·";
            setQuadState(newQuadState);
        }
    };
    // handle next phase
    const nextPhase = (currentPhase: number) => {
        if (currentPhase === 0) {
            const expectedState = ['·', 'u', '·', 'd', 'r', '·', '·', 'l', '·', 'o', '·'];
            if (quadState.every((char, index) => char === expectedState[index])) {
                setPhase(1);
                setDraggable(true);
            }
        } else if (currentPhase === 1) {
            const expectedState = ['·', 'u', '·', 'd', '·', 'r', '·', 'l', '·', 'o', '·'];
            if (quadState.every((char, index) => char === expectedState[index])) {
                setPhase(2);
            }
        } else if (currentPhase === 2) {
            const expectedState = ['·', 'l', '·', 'o', '·', 'r', '·', 'd', '·', 'u', '·'];
            if (quadState.every((char, index) => char === expectedState[index])) {
                setPhase(3);
                setDraggable(false);
            }
        } else if (currentPhase === 3) {
            const expectedState = ['·', '·', '·', 'o', '·', 'r', '·', 'd', '·', 'u', '·'];
            if (quadState.every((char, index) => char === expectedState[index])) {
                setPhase(4);
            }
        } else if (currentPhase === 4) {
            const expectedState = ['·', '·', '·', '·', '·', 'r', '·', 'd', '·', 'u', '·'];
            if (quadState.every((char, index) => char === expectedState[index])) {
                setPhase(5);
            }
        } else if (currentPhase === 5) {
            const expectedState = ['·', '·', '·', '·', '·', '·', '·', 'd', '·', 'u', '·'];
            if (quadState.every((char, index) => char === expectedState[index])) {
                setPhase(6);
            }
        } else if (currentPhase === 6) {
            const expectedState = ['·', '·', '·', '·', '·', '·', '·', '·', '·', 'u', '·'];
            if (quadState.every((char, index) => char === expectedState[index])) {
                setPhase(7);
            }
        } else if (currentPhase === 7) {
            const expectedState = ['·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·'];
            if (quadState.every((char, index) => char === expectedState[index])) {
                // golden land
                setPhase(8);
                setQuadState(() => Array.from("Congrats!"));
            }
        }
    };

    // next phase check when quadState changes
    useEffect(() => { nextPhase(phase); }, [quadState]);

    return (
        <div className="h-screen flex flex-col items-center justify-center overflow-hidden select-none">
            <div className="text-5xl font-bold flex lt-sm:gap-1 sm:gap-2 md:gap-3 touch-none">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={quadState.map((_, index) => index.toString())}
                        strategy={horizontalListSortingStrategy}>
                        {quadState.map((char, index) => (char &&
                            <SortableItem
                                id={index.toString()}
                                key={index}
                                char={char}
                                onClick={handleClick}
                                draggable={draggable} />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
            <div className="flex flex-col gap-1 mt-10">
                <p className="text-center animate-pulse italic my-0">This door is opened only at probability of a quadrillion to one.</p>
                <p className="text-center animate-pulse italic my-0">You will be blessed only at probability of a quadrillion to one.</p>
            </div>
        </div>
    );
};

// sortable component
const SortableItem = ({
    id,
    char,
    onClick,
    draggable,
}: {
    id: string;
    char: string;
    onClick: (index: number) => void;
    draggable: boolean;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: transform?.toString(),
        transition,
    };

    if (char === '·') {
        style.color = 'gray';
    }

    return (
        <span
            ref={setNodeRef}
            style={style}
            onClick={() => onClick(parseInt(id))}
            {...(draggable ? { ...attributes, ...listeners } : {})}>
            {char}
        </span>
    );
}

export default Quadrillion;
