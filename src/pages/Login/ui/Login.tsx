import { useState } from 'react';
import { observer } from 'mobx-react-lite';

//mui
import { Stack, Input, Button } from '@mui/joy';

//stores
import authStore from 'src/shared/auth';

const Login = observer(() => {
    const [valueLogin, setValueLogin] = useState<string>('');
    const [valuePassword, setValuePassword] = useState<string>('');

    return (
        <Stack height={'100vh'} alignItems={'center'} justifyContent={'center'}>
            <Stack direction={'column'} width={'320px'} spacing={2}>
                <Input
                    value={valueLogin}
                    onChange={(e) => setValueLogin(e.target.value)}
                    placeholder={'Имя пользователя'}
                />
                <Input
                    value={valuePassword}
                    onChange={(e) => setValuePassword(e.target.value)}
                    type={'password'}
                    placeholder={'Пароль'}
                />
                <Button fullWidth onClick={() => authStore.login(valueLogin, valuePassword)}>
                    Войти
                </Button>
            </Stack>
        </Stack>
    );
});

export default Login;
