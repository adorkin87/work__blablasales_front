import RecordsListPage from 'src/pages/RecordsListPage';
import RecordsUploadPage from 'src/pages/RecordsUploadPage';

import AgentsListPage from 'src/pages/AgentsListPage';
import ScriptsListPage from 'src/pages/ScriptsListPage';
import DictsListPage from 'src/pages/DictsListPage';

const authorizedRoutes = [
    {
        path: '/',
        element: <RecordsListPage />
    },
    {
        path: '/records/upload',
        element: <RecordsUploadPage />
    },
    {
        path: '/metrics',
        children: [
            {
                index: true,
                element: <div>Будут располагаться настройки для связи скриптов, интеграций и менеджеров</div>
            },
            {
                path: 'scripts',
                element: <ScriptsListPage />
            },
            {
                path: 'markers',
                element: <DictsListPage />
            }
        ]
    },
    {
        path: '/agents',
        element: <AgentsListPage />
    },
    {
        path: '/analytics',
        element: <div>Будет располагаться ананалитика в разрезе по менеджерам и скриптам</div>
    },
    {
        path: '/integrations',
        element: <div>Будет располагаться настройка интеграций с телефонией и CRM</div>
    },
    {
        path: '/profile',
        element: <div>Будет располагаться страница с настройками профиля компании</div>
    },
    {
        path: '/support',
        element: <div>Будет располагаться справка и система тикетов</div>
    }
];

export default authorizedRoutes;
