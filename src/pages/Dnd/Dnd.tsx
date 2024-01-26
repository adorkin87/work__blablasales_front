import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropReason, DropResult } from 'react-beautiful-dnd';

import { useDrag } from 'react-dnd';

import { Box, Button, IconButton, Input, Stack, Tooltip } from '@mui/joy';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';

import { LeftPanelScripts } from 'src/widgets/LeftPanel';
import RightPanel from 'src/shared/ui/RightPanel';

const Dnd = () => {
    const defaultList = ['A', 'B', 'C', 'D', 'E'];
    const [itemList, setItemList] = useState(defaultList);

    // Function to update list on drop
    const handleDrop = (droppedItem: DropResult): void => {
        if (!droppedItem.destination) return;

        const updatedList = [...itemList];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

        setItemList(updatedList);
    };

    const handlePriorityChange = (e) => {
        console.log(e);
    };

    return (
        <Stack>
            <LeftPanelScripts />
            <RightPanel>
                <>
                    <Stack marginBottom={4} justifyContent={'space-between'}>
                        <Stack gap={2}>
                            <Input placeholder={'Название скрипта'} />
                            <Input placeholder={'Комментарий'} />
                        </Stack>
                        <Stack gap={2}>
                            <Button>Сохранить</Button>
                            <Button>Отмена</Button>
                        </Stack>
                    </Stack>
                    <Box sx={{ bgcolor: '#d9d9d9' }}>
                        <DragDropContext onDragEnd={handleDrop}>
                            <Droppable droppableId="list-container">
                                {(provided) => (
                                    <Stack
                                        direction={'column'}
                                        paddingY={'5px'}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        {itemList.map((item, index) => (
                                            <Draggable key={item + index} draggableId={item + index} index={index}>
                                                {(provided) => (
                                                    <Stack
                                                        alignItems={'center'}
                                                        margin={'5px 10px'}
                                                        ref={provided.innerRef}
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}>
                                                        <Tooltip
                                                            placement={'top-start'}
                                                            title={'Удерживайте чтобы переместить'}>
                                                            <DragIndicatorRoundedIcon fontSize={'small'} />
                                                        </Tooltip>
                                                        <Tooltip placement={'top-start'} title={'Важность маркера'}>
                                                            <IconButton onClick={() => handlePriorityChange(index)}>
                                                                <PriorityHighRoundedIcon sx={{ color: '#c62828' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Input />
                                                        <Tooltip placement={'top-end'} title={'Удалить'}>
                                                            <IconButton>
                                                                <DeleteForeverRoundedIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                )}
                                            </Draggable>
                                        ))}

                                        {provided.placeholder}
                                    </Stack>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <PostAddRoundedIcon />
                    </Box>
                </>
            </RightPanel>
        </Stack>
    );
};

export default Dnd;
