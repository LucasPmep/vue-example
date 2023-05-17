import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import useErrors from "./errorservices.js";

const { handleErrors } = useErrors();

export default function useCivilities() {
    const civilities = ref([]);
    const errors = ref('');

    const getCivilities = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/api/civilities`);
            civilities.value = response.data.data;
        } catch (error) {
            // handleErrors(error);
        }

    };

    return {
        civilities,
        errors,
        getCivilities,
    }
};