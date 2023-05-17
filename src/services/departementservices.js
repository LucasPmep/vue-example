import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import useErrors from "./errorservices.js";

const { handleErrors } = useErrors();

export default function useDepartements() {
    const departements = ref([]);
    const errors = ref('');

    const getDepartements = async () => {
        try{
            let response = await axios.get(`http://localhost:8000/api/departements`);
            departements.value = response.data.data;
        } catch (error) {
            // handleErrors(error);
        }
    };

    return {
        departements,
        errors,
        getDepartements,
    }
};