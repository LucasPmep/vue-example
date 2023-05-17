import { ref } from "vue";
import axios from "axios";
import router from "../router/index.js";
import { toast } from 'vue3-toastify';
import useErrors from "./errorservices.js";

const { handleErrors } = useErrors();

export default function usePersons() {
    const person = ref([]);
    const persons = ref([]);
    const paginate = ref([]);
    const fullPersons = ref([]);
    const q = ref('');
    const errors = ref('');
    const checkedFilterValues = ref([]);
    const checkedCiviFilterValues = ref([]);
    
    // checks if a filter is activated and add or remove it to the array
    const checkFilters = (event, type) => {
        // check type to which table you want to change filter
        switch (type) {
            case 'departement':
                if(event.target.checked === true) {
                    checkedFilterValues.value.push(event.target.id)
                }
                else {
                    checkedFilterValues.value.splice(checkedFilterValues.value.indexOf(event.target.id), 1)
                }        
                break;
            case 'civility':
                if(event.target.checked === true) {
                    checkedCiviFilterValues.value.push(event.target.id)
                }
                else {
                    checkedCiviFilterValues.value.splice(checkedCiviFilterValues.value.indexOf(event.target.id), 1)
                    // indexOf renverra -1 s'il ne trouve pas la valeur sélectionnée (-1 avec splice éliminera le dernier élément du tableau)
                }
                break;
        }
        
        getPersons(1);
    }

    const searchPerson = async (query) => {
        q.value = query;
        await getPersons(1)
    }


    const getPerson = async (id) => {
        try{
            let response = await axios.get(`http://localhost:8000/api/persons/` + id);
            person.value = response.data.data;    
        } catch (error) {
            handleErrors(error);
        }
    };
    
    const fullGetPersons = async () => {
        errors.value = '';
        try{
            const response = await axios.get(`http://localhost:8000/api/persons?fullget=1`);
            fullPersons.value =  response.data.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    const getPersons = async (page = 1) => {
        errors.value = '';
        try{
            const response = await axios.get(`http://localhost:8000/api/persons?page=${page}&dep=${checkedFilterValues.value}&civi=${checkedCiviFilterValues.value}&q=${q.value}`);
            paginate.value =  response.data;
            persons.value =  response.data.data;
        } catch (error) {
            handleErrors(error);
        }
    };

    const createPerson = async (data) => {
        errors.value = '';
        try {
            await axios.post(`http://localhost:8000/api/persons`, data);
            await router.push({name: 'person.list'});
        } catch(error) {
            handleErrors(error);
        }
    };

    const updatePerson = async (id) => {
        errors.value = '';
        try {
            console.log(person.value);
            await axios.put(`http://localhost:8000/api/persons/` + id, person.value);
            await router.push({name: 'person.list'});
            toast.success('person updated successfully');
        } catch(error) {
            handleErrors(error);
        }
    };

    const deletePerson = async (id) => {
        errors.value = '';
        try {
            await axios.delete(`http://localhost:8000/api/persons/` + id, person.value);
            await router.push({name: 'person.list'});
        } catch (error) {
            handleErrors(error);
        }
    }

    return {
        person,
        persons,
        errors,
        paginate,
        fullPersons,
        getPersons,
        getPerson,
        createPerson,
        updatePerson,
        deletePerson,
        checkFilters,
        searchPerson,
        fullGetPersons
    }
};