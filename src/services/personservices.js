import { ref } from "vue";
import axios from "axios";
import router from "../router/index.js";

export default function usePersons() {
    const person = ref([]);
    const persons = ref([]);
    const paginate = ref([]);
    const errors = ref('');
    

    const getPerson = async (id) => {
        let response = await axios.get(`http://localhost:8000/api/persons/` + id);
        person.value = response.data.data;    
    };
    
    // we could use a parameter paginate boolean to know if we are, or not, in a paginate mode
    // we can just call both /persons and /persons?page=${page} API calls
    const getPersons = async (page = 1, dep = ['aaaaa'], civi = "") => {
        console.log('start call API');
        // console.log(dep);
        const response = await axios.get(`http://localhost:8000/api/persons?page=${page}&dep=${dep}&civi=${civi}`);
        paginate.value =  response.data;

        // const allresponses = await axios.get(`http://localhost:8000/api/persons`);
        persons.value =  response.data.data;
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
        paginate,
        getPersons,
        getPerson,
        createPerson,
        updatePerson,
        deletePerson
    }
};