import ReactDOM from 'react-dom/client';

import App from './app';

async function enableMocking() {
    if (!import.meta.env.PROD && !Boolean(+import.meta.env.VITE_FAKEAPI)) return;
    const { worker } = await import('src/app');
    return worker.start({
        onUnhandledRequest(request, print) {
            if (!request.url.includes('/api/')) return;
            print.warning();
        }
    });
}

enableMocking().then(() => ReactDOM.createRoot(document.getElementById('root')!).render(<App />));
