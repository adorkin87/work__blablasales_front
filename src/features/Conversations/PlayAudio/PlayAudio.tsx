import { useEffect, useState } from 'react';

import { IconButton } from '@mui/joy';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';

interface PlayAudioProps {
    file: File;
}

const PlayAudio = ({ file }: PlayAudioProps) => {
    const [onPlay, setOnPlay] = useState<boolean>(false);

    const reader = new FileReader();
    const audio = new Audio();

    reader.onload = (): void => {
        if (reader.result) {
            audio.src = String(reader.result);
        }
    };
    reader.readAsDataURL(file);

    useEffect(() => {
        onPlay ? audio.play() : audio.pause();
    }, [onPlay]);

    // *************************************************************************************************
    // render

    return onPlay ? (
        <IconButton onClick={() => setOnPlay(false)}>
            <PauseRoundedIcon />
        </IconButton>
    ) : (
        <IconButton onClick={() => setOnPlay(true)}>
            <PlayArrowRoundedIcon />
        </IconButton>
    );

    // const audioRef = useCallback((node: HTMLAudioElement): void => {
    //     if (node) {
    //         const reader = new FileReader();
    //         reader.onload = (): void => {
    //             if (reader.result) {
    //                 node.src = String(reader.result);
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // }, []);

    // if (file.type.startsWith('audio/')) {
    //     return (
    //         <div>
    //             <audio ref={audioRef} controls preload={'metadata'} />
    //         </div>
    //     );
    // }
};

export default PlayAudio;
