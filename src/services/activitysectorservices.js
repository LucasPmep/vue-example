import { ref } from "vue";
import axios from "axios";

export default function useActivitysectors() {
    const activitysectors = ref([]);

    const getActivitysectors = async () => {
        let response = await axios.get(`http://localhost:8000/api/activitysectors`);
        activitysectors.value = response.data.data;
    };

    return {
        activitysectors,
        getActivitysectors,
    }
};