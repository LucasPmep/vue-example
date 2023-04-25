import { ref } from "vue";
import axios from "axios";

export default function useCivilities() {
    const civilities = ref([]);

    const getCivilities = async () => {
        let response = await axios.get(`http://localhost:8000/api/civilities`);
        civilities.value = response.data.data;
    };

    return {
        civilities,
        getCivilities,
    }
};