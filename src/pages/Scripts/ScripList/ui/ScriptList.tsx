import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// mui
import { Button, IconButton, Sheet, Stack, Table } from '@mui/joy';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

// components
import LeftPanelScripts from '../../../../widgets/LeftPanel/ui/LeftPanelScripts.tsx';
import RightPanel from '../../../../shared/ui/RightPanel';
import ModalConfirmDel from '../../../../widgets/ModalConfirmDel';

// store
import StoreItemList from '../../../../shared/store/baseStoreList.ts';

const ScriptList = observer(() => {
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [scriptListStore] = useState(() => new StoreItemList('http://10.10.0.106:8001/api/v1/script'));

    const tableRef = useCallback((node: any) => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - 32 - node.offsetTop + 'px';
        }
    }, []);

    useEffect(() => {
        scriptListStore.getList();
    }, []);

    // const scriptList = [
    //     { name: 'Скрипт 1', comment: '' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' },
    //     { name: 'Скрипт 2', comment: 'Комментарий 2' }
    // ];

    // *************************************************************************************************
    // handlers

    const handleBtnAdd = () => {
        navigate('/scripts/add');
    };

    const handleBtnEdit = (id: number) => {
        navigate('/scripts/' + String(id));
    };

    const handleBtnDel = () => {
        setModalOpen(true);
    };

    // *************************************************************************************************
    // render

    return (
        <>
            <Stack>
                <LeftPanelScripts />
                <RightPanel>
                    <Stack direction={'column'} gap={4}>
                        <Stack justifyContent={'right'}>
                            <Button onClick={handleBtnAdd}>+ Добавить скрипт</Button>
                        </Stack>

                        <Sheet ref={tableRef} sx={{ overflow: 'auto', bgcolor: '#fff' }}>
                            <Table stickyHeader hoverRow>
                                <thead>
                                    <tr>
                                        <th colSpan={1}>Название скрипта</th>
                                        <th colSpan={2}>Комментарий</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(scriptListStore.value).map((script: any, index: number) => (
                                        <tr key={index}>
                                            <td>{script.name}</td>
                                            <td>{script.comment}</td>
                                            <td align={'right'}>
                                                <IconButton onClick={() => handleBtnEdit(index)}>
                                                    <EditNoteRoundedIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleBtnDel()}>
                                                    <DeleteForeverRoundedIcon />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Sheet>
                    </Stack>
                </RightPanel>
            </Stack>
            <ModalConfirmDel open={modalOpen} setOpen={setModalOpen} item={'test'} />
        </>
    );
});

export default ScriptList;
