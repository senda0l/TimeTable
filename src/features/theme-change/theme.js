import { ref, watchEffect } from "vue";

const theme = ref('light');
const toggleTheme = ()=>{
    theme.value = theme.value === 'light'?'dark':'light';
};
watchEffect(()=>{
    if(theme.value==='dark'){
        document.documentElement.classList.add('dark');
    }else{
        document.documentElement.classList.remove('dark');
    }
});

export function useTheme(){
    return{
        theme,
        toggleTheme
    }
};



