import { observer } from 'mobx-react-lite';

import { Stack, Input, Typography } from '@mui/joy';

const CompanyCard = observer(() => {
    return (
        <>
            <Typography marginBottom={4} level={'title-lg'}>
                Ваши данные нам потребуются, чтобы общаться с вами и выставлять счета
            </Typography>
            <Stack direction={'column'} gap={1}>
                <Input placeholder={'Название компании'} sx={{ width: '500px' }} />
                <Input placeholder={'Сфера деятельности'} sx={{ width: '500px' }} />
                <Input placeholder={'Контактное лицо (ФИО)'} sx={{ width: '500px' }} />
                <Input placeholder={'Телефон'} sx={{ width: '500px' }} />
                <Input placeholder={'email'} sx={{ width: '500px' }} />
            </Stack>
        </>
    );
});

export default CompanyCard;
