import { createApp } from 'vue'
import App from './App.vue'
import SvgIcon from '@/components/shared/SvgIcon.vue'

const app = createApp(App)
app.component('svg-icon', SvgIcon)
app.mount('#app')
