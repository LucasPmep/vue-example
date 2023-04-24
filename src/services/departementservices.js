import { ref } from "vue";
import axios from "axios";

export default function useDepartements() {
    const departements = ref([]);

    const getDepartements = async () => {
        let response = await axios.get(`http://localhost:8000/api/departements`);
        departements.value = response.data.data;
    };

    return {
        departements,
        getDepartements,
    }
};