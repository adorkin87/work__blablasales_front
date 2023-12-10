import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cls from './TopPanel.module.scss';

//stores
// import viewer from '../../../entities/viewer';

const TopPanel = () => {
    return (
        <div className={cls.topMenu}>
            <div className={cls.left}>
                <Link className={cls.logo} to={'/'}>
                    <div>
                        <img src={'/images/logo.png'} alt={'logo'} />
                        <p>BlaBlaSALES</p>
                    </div>
                </Link>
                <div className={cls.mainMenu}>
                    <Link to={'/'}>Загрузка аудио</Link>
                    <Link to={'/scripts'}>Редактор скриптов</Link>
                    <Link to={'/analytics'}>Аналитика</Link>
                </div>
            </div>
            <div className={cls.right}>
                {/*<p>Баланс {viewer.bill}</p>*/}
                <Link to={'/'}>Мой профиль</Link>
            </div>
        </div>
    );
};

export default observer(TopPanel);
