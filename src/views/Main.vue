<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

export default defineComponent({
    setup() {
        const state = reactive({
            inprogress: false,
            data: [],
            settings: {},
        })

        const handleToggle = () => {
            state.inprogress = ! state.inprogress
            if (state.inprogress) {
                setTimeout(() => {
                    start();
                }, state.settings.delay * 1000)
                return ;
            }
            stop();
        }

        const start = () => {
            const profiles = document.querySelectorAll('.entity-result__item');
            for(let profile of profiles) {
                state.data = [
                    ...state.data,
                    {
                        name: profile.querySelector('.entity-result__title-text span > span').innerText,
                        address: profile.querySelector('.entity-result__secondary-subtitle').innerText,
                        position: profile.querySelector('.entity-result__primary-subtitle').innerText,
                        photo: profile.querySelector('.presence-entity img')?.getAttribute('src'),
                    }
                ]
            }
        }

        const stop = () => {
            console.log(state.data)
        }

        onMounted(() => {
            let settings = localStorage.getItem('le-settings');
            settings = (JSON.parse(settings ?? '{}'));
            state.settings = settings;
        })

        const handleDownload = () => {
            state.inprogress = false

            let csvContent = "";
            
            const header = [
                'name',
                'address',
                'position',
                'photo',
            ];
            
            csvContent += header.join(";") + "\n";

            state.data.forEach((row) => {
                row = Object.values(row).join(";");
                csvContent += row + "\r\n";
            });

            const pom = document.createElement('a');
            const blob = new Blob(["\ufeff" + csvContent],{type: 'text/csv; charset=utf-8;'});
            const url = URL.createObjectURL(blob);
            pom.href = url;
            pom.setAttribute('download', ((new Date() * 1) / 100).toFixed(0) + '.csv');
            pom.click();
        }

        return {
            handleToggle,
            handleDownload,
            ...toRefs(state)
        }
    },
})
</script>

<template>
     <div class="dark:le-text-white le-flex le-justify-center le-pt-3 le-mb-3">
        <button @click="handleToggle" type="button" class="le-text-white le-bg-blue-700 hover:le-bg-blue-800 focus:le-outline-none focus:le-ring-4 focus:le-ring-blue-300 le-font-medium le-rounded-full le-text-sm le-px-5 le-py-2.5 le-text-center me-2 le-mb-2 dark:le-bg-blue-600 dark:hover:le-bg-blue-700 dark:focus:le-ring-blue-800">
            <svg v-if="inprogress" aria-hidden="true" role="status" class="le-inline le-w-4 le-h-4 me-3 le-text-white le-animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            {{ inprogress ? 'Pause' : 'Scrape' }}
        </button>
    </div>
    <div class="le-flex le-justify-center">
        <button @click="handleDownload" type="button" v-if="data.length" class="le-px-3 le-py-2 le-text-xs le-font-medium le-inline-flex le-items-center le-px-5 le-py-2.5 le-text-sm le-font-medium le-text-center le-text-white le-bg-blue-700 le-rounded-lg hover:le-bg-blue-800 focus:le-ring-4 focus:le-outline-none focus:le-ring-blue-300 dark:le-bg-blue-600 dark:hover:le-bg-blue-700 dark:focus:le-ring-blue-800">
            <svg class="le-mr-3" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
            Download
            <span class="le-ml-2 le-inline-flex le-items-center le-justify-center le-w-4 le-h-4 ms-2 le-text-xs le-font-semibold le-text-blue-800 le-bg-blue-200 le-rounded-full">
            {{ data.length }}
            </span>
        </button>
        <a id="download" href=""></a>
    </div>
    <p class="le-mt-2 le-text-sm le-text-gray-500 dark:le-text-gray-400">Current page {{ settings.currentPage }}</p>
                   
</template>