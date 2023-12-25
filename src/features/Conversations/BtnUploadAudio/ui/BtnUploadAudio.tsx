// mui
import { Button } from '@mui/joy';

// func
import { uploadAudio } from '../model/func/lib.ts';

interface BtnUploadAudio {
    file: File;
    diarize?: boolean;
    language?: 'ru' | 'eng';
    agent?: number;
    script?: number;
}

const BtnUploadAudio = ({ file, diarize = false, language = 'ru', agent, script }: BtnUploadAudio) => {
    const handleBtnUpload = (): void => {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('diarize', String(diarize));
        formData.append('language', language);
        agent && formData.append('agent', String(agent));
        script && formData.append('script', String(script));

        uploadAudio(formData).then((r) => r);
    };

    return (
        <Button size={'sm'} onClick={handleBtnUpload}>
            Обработать
        </Button>
    );
};

export default BtnUploadAudio;
