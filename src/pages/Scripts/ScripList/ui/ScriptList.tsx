import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// mui
import { Button, Sheet, Stack, Table } from '@mui/joy';

// components
import LeftPanelScripts from '../../../../widgets/LeftPanel/ui/LeftPanelScripts.tsx';
import RightPanel from '../../../../shared/ui/RightPanel';
import ModalConfirmDel from '../../../../widgets/ModalConfirmDel';
import AppBtnEdit from '../../../../shared/ui/AppBtnEdit';
import AppBtnDel from '../../../../shared/ui/AppBtnDel';
import AppBtnCopy from '../../../../shared/ui/AppBtnCopy';

// store
import StoreItemList from '../../../../shared/store/baseStoreList.ts';
import StoreItem from '../../../../shared/store/baseStoreItem.ts';

const ScriptList = observer(() => {
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalSelectedItem, setModalSelectedItem] = useState<{ itemID?: number | string; itemName?: string }>({});

    const [scriptListStore] = useState(() => new StoreItemList('http://10.10.0.106:8001/api/v1/script'));
    const [scriptCardStore] = useState(() => new StoreItem('http://10.10.0.106:8001/api/v1/script', {}));

    const tableRef = useCallback((node: any) => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - 32 - node.offsetTop + 'px';
        }
    }, []);

    useEffect(() => {
        scriptListStore.getList();
    }, []);

    // *************************************************************************************************
    // handlers

    const handleBtnAdd = (): void => {
        navigate('/scripts/add');
    };

    const handleBtnEdit = (scriptID: number): void => {
        navigate('/scripts/' + String(scriptID));
    };

    const handleBtnCopy = async (indexRow: number): Promise<void> => {
        const scriptText = scriptListStore.value[indexRow]['script_text'];
        scriptCardStore.updStoreValue('script_name', `${scriptListStore.value[indexRow]['script_name']} (копия)`);
        scriptCardStore.updStoreValue('script_comment', scriptListStore.value[indexRow]['script_comment']);
        scriptCardStore.updStoreValue('script_text', scriptText);
        await scriptCardStore.addItem();
        scriptListStore.getList();
    };

    const handleBtnDel = (itemID: string, itemName: string): void => {
        setModalSelectedItem({ itemID, itemName });
        setModalOpen(true);
    };

    const handleDelItem = async (): Promise<void> => {
        if (modalSelectedItem.itemID) {
            await scriptListStore.delItem(modalSelectedItem.itemID);
        }
        scriptListStore.resetValue();
        scriptListStore.getList();
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
                                        <tr key={script[1]['script_id']}>
                                            <td>{script[1]['script_name']}</td>
                                            <td>{script[1]['script_comment']}</td>
                                            <td align={'right'}>
                                                <AppBtnEdit onClick={() => handleBtnEdit(script[1]['script_id'])} />
                                                <AppBtnCopy onClick={() => handleBtnCopy(index)} />
                                                <AppBtnDel
                                                    onClick={() =>
                                                        handleBtnDel(script[1]['script_id'], script[1]['script_name'])
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Sheet>
                    </Stack>
                </RightPanel>
            </Stack>
            <ModalConfirmDel
                open={modalOpen}
                setOpen={setModalOpen}
                handleDel={handleDelItem}
                text={modalSelectedItem.itemName}
            />
        </>
    );
});

export default ScriptList;
