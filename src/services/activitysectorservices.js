import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import useErrors from "./errorservices.js";

const { handleErrors } = useErrors();

export default function useActivitysectors() {
    const activitysectors = ref([]);
    const errors = ref('');

    const getActivitysectors = async () => {
        try{
            let response = await axios.get(`http://localhost:8000/api/activitysectors`);
            activitysectors.value = response.data.data;
        } catch (error) {
            // handleErrors(error);
        }

    };

    return {
        activitysectors,
        errors,
        getActivitysectors,
    }
};