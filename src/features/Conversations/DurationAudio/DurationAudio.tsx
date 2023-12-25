import { useState } from 'react';

interface DurationAudioProps {
    file: File;
}

const DurationAudio = ({ file }: DurationAudioProps) => {
    const [duration, setDuration] = useState<number | null>(null);

    const reader = new FileReader();
    const audio = new Audio();

    reader.onload = () => {
        if (reader.result) {
            audio.src = String(reader.result);
        }
    };
    reader.readAsDataURL(file);

    audio.ondurationchange = () => setDuration(audio.duration);

    return <>{duration ? Math.ceil(duration) : '0'} сек</>;
};

export default DurationAudio;
