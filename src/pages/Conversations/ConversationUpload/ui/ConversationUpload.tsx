import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

//mui
import { Box, Button, IconButton, Link, Select, Sheet, Stack, Table, Tooltip } from '@mui/joy';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

//components
import { LeftPanelConversation } from '../../../../widgets/LeftPanel';
import RightPanel from '../../../../shared/ui/RightPanel';

//stores

const ConversationUpload = observer(() => {
    const [uploadedFiles, setUploadedFiles] = useState({});

    // const handleUploadFiles = (files): void => {
    //     const uploaded = [...uploadedFiles];
    //     let limitExceeded = false;
    //     files.some((file) => {
    //         if (uploaded.findIndex((f) => f.name === file.name) === -1) {
    //             uploaded.push(file);
    //             if (uploaded.length > MAX_COUNT) {
    //                 alert(`You can only add a maximum of ${MAX_COUNT} files`);
    //                 setFileLimit(false);
    //                 limitExceeded = true;
    //                 return true;
    //             }
    //         }
    //     });
    //     if (!limitExceeded) setUploadedFiles(uploaded);
    // };

    const handleFileEvent = (e): void => {
        setUploadedFiles(e.target.files);
    };

    // useEffect(() => {
    //     if (Object.keys(uploadedFiles).length > 0) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => console.log(e.target.result);
    //         reader.readAsText(uploadedFiles[0]);
    //     }
    // }, [uploadedFiles]);

    // const ttt = (file) => {
    //     // console.log(file);
    //     const reader = new FileReader();
    //     let temp;
    //     reader.onload = (e) => console.log(e.target.duration);
    //     reader.readAsText(file);
    //     return 'tesft';
    // };

    // *************************************************************************************************

    return (
        <Stack>
            <LeftPanelConversation />
            <RightPanel>
                <input
                    id={'fileUpload'}
                    type={'file'}
                    multiple
                    accept={'audio/*'}
                    style={{ display: 'none' }}
                    onChange={handleFileEvent}
                />
                <Stack justifyContent={'space-between'}>
                    <label htmlFor={'fileUpload'}>
                        <Box sx={{ padding: 1, bgcolor: 'blue', color: '#fff', cursor: 'pointer' }}>asdf</Box>
                    </label>
                    <Stack gap={2}>
                        <Select placeholder={'менеджер'} />
                        <Select placeholder={'скрипт'} />
                    </Stack>
                </Stack>
                <Sheet sx={{ overflow: 'auto' }}>
                    <Table stickyHeader size={'sm'}>
                        <thead>
                            <tr>
                                <th>Название файла</th>
                                <th width={'20%'} />
                                <th width={'10%'} />
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(uploadedFiles).length > 0 &&
                                Object.entries(uploadedFiles).map((file, i) => (
                                    <tr key={i}>
                                        <Tooltip placement={'top-start'} enterDelay={1000} title={file[1].name}>
                                            <td>{file[1].name}</td>
                                        </Tooltip>
                                        <td align={'center'}>
                                            <Button size={'sm'}>Обработать</Button>
                                        </td>
                                        <td align={'right'}>
                                            <IconButton size={'sm'} onClick={() => console.log('here')}>
                                                <DeleteForeverRoundedIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Sheet>
            </RightPanel>
        </Stack>
    );
});

export default ConversationUpload;
