import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactQueryProvider from './Layouts/Providers/ReactQueryProvider';

const appName = import.meta.env.VITE_APP_NAME || 'SIG';

createInertiaApp({
    title: (title) => `${appName} - ${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ReactQueryProvider>
                <App {...props} />
            </ReactQueryProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
