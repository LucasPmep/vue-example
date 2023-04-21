import { ref } from "vue";
import axios from "axios";
import router from "../router/index.js";

export default function usePersons() {
    const persons = ref([]);
    const errors = ref('');
    const getPersons = async () => {
        let response = await axios.get(`http://localhost:8000/api/persons`);
        persons.value = response.data.data;
    };

    const createPerson = async (data) => {
        errors.value = '';
        try {
            await axios.post(`http://localhost:8000/api/persons`, data);
            await router.push({name: 'person.list'});
        } catch(error) {
            const createPersonErrors = error.response.data.errors;

            for (const key in createPersonErrors) {
                errors.value += createPersonErrors[key][0] + ' ';
            }
        }
    };

    return {
        persons,
        errors,
        getPersons,
        createPerson
    }
};