import { ref } from "vue";
import axios from "axios";

export default function usePersons() {
    const persons = ref([]);

    const getPersons = async () => {
        let response = await axios.get(`http://localhost:8000/api/persons`);
        persons.value = response.data.data;
    };

    return {
        persons,
        getPersons
    }
};