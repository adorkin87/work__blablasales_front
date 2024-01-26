import { ChangeEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';

//mui
import { Box, IconButton, Sheet, Stack, Table, Tooltip } from '@mui/joy';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

//components
import { LeftPanelRecords } from 'src/widgets/LeftPanel';
import RightPanel from 'src/shared/ui/RightPanel';
import { SelectManagers, SelectScripts } from 'src/features/Records';
import BtnUploadAudio from 'src/features/Records/BtnUploadAudio/ui/BtnUploadAudio.tsx';
import PlayAudio from 'src/features/Records/PlayAudio/PlayAudio.tsx';
import DurationAudio from 'src/features/Records/DurationAudio/DurationAudio.tsx';

const RecordsUploadPage = observer(() => {
    // state
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [selectedManager, setSelectedManager] = useState<number>(0);
    const [selectedScript, setSelectedScript] = useState<number>(0);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const uploaded: File[] = [...uploadedFiles];
        const upload: File[] = Array.prototype.slice.call(e.target.files);

        upload.some((file: File): void => {
            if (
                uploaded.findIndex((f: File): boolean => f.name === file.name) === -1 &&
                file.type.startsWith('audio/')
            ) {
                uploaded.push(file);
            }
        });

        setUploadedFiles(uploaded);
    };

    const handleBtnDel = (indexAudio: number): void => {
        const newArrayFiles: File[] = [...uploadedFiles];
        newArrayFiles.splice(indexAudio, 1);
        setUploadedFiles(newArrayFiles);
    };

    // *************************************************************************************************
    // render

    return (
        <Stack>
            <LeftPanelRecords />
            <RightPanel>
                <Stack marginBottom={4} justifyContent={'space-between'} alignItems={'end'} gap={8}>
                    <input
                        id={'fileUpload'}
                        type={'file'}
                        multiple
                        accept={'audio/*'}
                        style={{ display: 'none' }}
                        onChange={handleInputChange}
                    />
                    <label htmlFor={'fileUpload'}>
                        <Box sx={{ padding: 1, bgcolor: 'blue', color: '#fff', cursor: 'pointer' }}>Добавить аудио</Box>
                    </label>
                    <Stack gap={4}>
                        <SelectManagers selectedManager={selectedManager} setSelectedManager={setSelectedManager} />
                        <SelectScripts selectedScript={selectedScript} setSelectedScript={setSelectedScript} />
                    </Stack>
                </Stack>
                <Sheet sx={{ overflow: 'auto' }}>
                    <Table stickyHeader size={'sm'} bgcolor={'#fff'}>
                        <thead>
                            <tr>
                                <th>Название файла</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(uploadedFiles).map((file, indexAudio: number) => (
                                <tr key={'index' + indexAudio + '/' + file[1].name}>
                                    <Tooltip placement={'top-start'} title={file[1].name}>
                                        <td>{file[1].name}</td>
                                    </Tooltip>
                                    <td align={'right'}>
                                        <Stack justifyContent={'end'} alignItems={'center'} gap={1}>
                                            <DurationAudio file={file[1]} />
                                            <PlayAudio file={uploadedFiles[indexAudio]} />
                                            <BtnUploadAudio
                                                file={uploadedFiles[indexAudio]}
                                                agent={selectedManager}
                                                script={selectedScript}
                                            />
                                            <IconButton onClick={() => handleBtnDel(indexAudio)}>
                                                <DeleteForeverRoundedIcon />
                                            </IconButton>
                                        </Stack>
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

export default RecordsUploadPage;
