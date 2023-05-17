import { ref } from "vue";
import router from "../router/index.js";
import { toast } from 'vue3-toastify';

export default function useErrors() {

    const errors =  ref('');

    const handleErrors = (error) => {
        if (error.response.data.errors) {
            errors.value = error.response.data.errors;
            for (const key in errors.value) {
                if (Object.hasOwnProperty.call(errors.value, key)) {
                    const element = errors.value[key];
                    toast.error(element);
                }
            }
        }
        else {
            toast.error('Server error : please try again in a few seconds',  {
                autoClose: 10000,
                closeOnClick: true,
                hideProgressBar: true,
            })
        }
        console.log('HANDLING ERRORS');
    }

    return {
        errors,
        handleErrors
    }
}