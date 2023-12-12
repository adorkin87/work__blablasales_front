import cls from './Profile.module.scss';

import LeftPanel from '../../../widgets/LeftPanel';

const Profile = () => {
    return (
        <div className={cls.main}>
            <LeftPanel />
        </div>
    );
};

export default Profile;
