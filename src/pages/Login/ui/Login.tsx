import { Stack, Input, Button } from '@mui/joy';

const Login = () => {
    return (
        <Stack height={'100vh'} alignItems={'center'} justifyContent={'center'}>
            <Stack width={'320px'} spacing={2}>
                <Input placeholder={'Имя пользователя'} />
                <Input type={'password'} placeholder={'Пароль'} />
                <Button fullWidth>Войти</Button>
            </Stack>
        </Stack>
    );
};

export default Login;
