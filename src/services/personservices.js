import { ref } from "vue";
import axios from "axios";
import router from "../router/index.js";

export default function usePersons() {
    const person = ref([]);
    const persons = ref([]);
    const errors = ref('');
    

    const getPerson = async (id) => {
        let response = await axios.get(`http://localhost:8000/api/persons/` + id);
        person.value = response.data.data;    
    };
    
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
            errors.value = error.response.data.errors;
        }
    };

    const updatePerson = async (id) => {
        errors.value = '';
        try {
            console.log(person.value);
            await axios.put(`http://localhost:8000/api/persons/` + id, person.value);
            await router.push({name: 'person.list'});
        } catch(error) {
            errors.value = error.response.data.errors;
        }
    };

    const deletePerson = async (id) => {
        errors.value = '';
        try {
            await axios.delete(`http://localhost:8000/api/persons/` + id, person.value);
            await router.push({name: 'person.list'});
        } catch (error) {
            errors.value = error.response.data.errors;
        }
    }

    return {
        person,
        persons,
        errors,
        getPersons,
        getPerson,
        createPerson,
        updatePerson,
        deletePerson
    }
};