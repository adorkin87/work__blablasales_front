import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

//stores
import rootStoreContext from 'src/app/providers/rootStore.context.ts';

const LoginPage = observer(() => {
    const rootStore = useContext(rootStoreContext);

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLogin = (e) => {
        e.preventDefault();
        rootStore?.viewer.auth.login(login, password);
    };

    return (
        <div className={'h-dvh flex items-center justify-center'}>
            <form className={'flex flex-col gap-4'} onSubmit={handleLogin}>
                <input
                    className={'input'}
                    type={'text'}
                    placeholder={'Имя пользователя'}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    className={'input'}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={'Пароль'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={'btn'} type={'submit'}>
                    Войти
                </button>
            </form>
        </div>
    );
});

export default LoginPage;
