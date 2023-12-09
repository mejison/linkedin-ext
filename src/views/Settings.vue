<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'

export default defineComponent({
    setup() {
        const state = reactive({
            settings: {
                currentPage: 1,
                delay: 1,
            },
        })

        onMounted(() => {
            const settings = localStorage.getItem('le-settings')
            state.settings = JSON.parse(settings ?? JSON.stringify(state.settings))
        })

        watch(state, (state) => {
            localStorage.setItem('le-settings', JSON.stringify(state.settings))
        })

        return {
            ...toRefs(state)
        }
    },

})
</script>

<template>
  <div class="le-pt-3">
        <form class="le-max-w-xs le-mx-auto">
           <div>
                <label for="quantity-input" class="le-block le-mb-2 le-text-sm le-font-medium le-text-gray-900 dark:le-text-white">Delay:</label>
                <div class="le-relative le-flex le-items-center max-w-[7rem]">
                    <button type="button" id="decrement-button" @click="settings.delay = settings.delay != 0 ? settings.delay - 1 : 0" data-input-counter-decrement="quantity-input" class="le-bg-gray-100 dark:le-bg-gray-700 dark:hover:le-bg-gray-600 dark:le-border-gray-600 hover:le-bg-gray-200 le-border le-border-gray-300 rounded-s-lg le-p-3 le-h-8 focus:le-ring-gray-100 dark:focus:le-ring-gray-700 focus:le-ring-2 focus:le-outline-none">
                        <svg class="le-w-2 le-h-2 le-text-gray-900 dark:le-text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                        </svg>
                    </button>
                    <input type="text" id="quantity-input" readonly v-model="settings.delay" placeholder="1s" data-input-counter aria-describedby="helper-text-explanation" class="le-bg-gray-50 border-x-0 le-border-gray-300 le-h-8 le-text-center le-text-gray-900 le-text-sm focus:le-ring-blue-500 focus:le-border-blue-500 le-block le-w-full le-py-2.5 dark:le-bg-gray-700 dark:le-border-gray-600 dark:le-placeholder-gray-400 dark:le-text-white dark:focus:le-ring-blue-500 dark:focus:le-border-blue-500"  required />
                    <button type="button" id="increment-button" @click="settings.delay += 1" data-input-counter-increment="quantity-input" class="le-bg-gray-100 dark:le-bg-gray-700 dark:hover:le-bg-gray-600 dark:le-border-gray-600 hover:le-bg-gray-200 le-border le-border-gray-300 rounded-e-lg le-p-3 le-h-8 focus:le-ring-gray-100 dark:focus:le-ring-gray-700 focus:le-ring-2 focus:le-outline-none">
                        <svg class="le-w-2 le-h-2 le-text-gray-900 dark:le-text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                        </svg>
                    </button>
                </div>
                <p id="helper-text-explanation" class="le-mt-2 le-text-sm le-text-gray-500 dark:le-text-gray-400">Please select a delay between each extraction.</p>
           </div>
        </form>
    </div>
</template>