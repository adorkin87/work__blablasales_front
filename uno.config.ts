import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
    presets: [presetUno(), presetIcons()],
    theme: {
        colors: {
            'color-main': '#373a4d',
            'color-second': '#8b95a6',
            'color-green': '#51b682'
        }
    },
    shortcuts: {
        sb_link: 'pl-6 flex items-center gap2 cursor-pointer decoration-none',
        sb_icon: 'text-6 c-color-second group-hover:c-white transition-100',
        sb_text: 'text-5 c-color-second group-hover:c-white transition-100',

        ellipsis: 'ws-nowrap overflow-hidden text-ellipsis',

        'top-panel': 'mb-5 flex justify-between items-center',
        'top-panel_filter': 'mb-6 flex justify-between grid-items-end',

        title: 'font-600 text-5 c-color-main',
        btn: `
                h-9 px-8 flex items-center justify-center b-rd b-none text-4 c-#fff cursor-pointer bg-color-main/90 transition-200
                disabled:bg-color-second disabled:cursor-auto
                hover:not-disabled:bg-color-main
                `,
        btn_icon: `
                px-2 py-2 flex items-center justify-center gap-2 b-rd b-none text-sm c-#fff cursor-pointer bg-color-second transition-200
                disabled:bg-color-second disabled:cursor-auto
                hover:not-disabled:bg-color-main
                `,
        input: `
                h-9 w-full px-4 text-4 c-color-main outline-none b-rd b-1 b-solid b-color-color-second 
                hover:b-color-color-main/75 
                focus:b-color-color-main
                `,
        textaria: `
                w-full p-4 text-4 c-color-main outline-none b-rd b-1 b-solid b-color-color-second resize-y 
                hover:b-color-color-main/75 
                focus:b-color-color-main
                `,

        'pop-up-menu__item': 'px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-color-second/25 transition-100',

        'expand-arrow': 'i-ri:arrow-right-s-line flex-shrink-0 c-color-second hover:c-color-main z-0 transition-100',
        'expand-arrow_down': 'c-color-main transform-rotate-90'
    }
});
