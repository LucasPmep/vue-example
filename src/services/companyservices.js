import { ref } from "vue";
import axios from "axios";
import router from "../router/index.js";

export default function useCompanies() {
    const companies = ref([]);
    const errors = ref('');

    const getCompanies = async () => {
        let response = await axios.get(`http://localhost:8000/api/companies`);
        companies.value = response.data.data;
    };
    
    const createCompany = async (data) => {
        errors.value = '';
        try {
            await axios.post('http://localhost:8000/api/companies', data, );
            await router.push({name: 'company.list'});
        } catch(error) {
            const createCompanyErrors = error.response.data.errors;

            for (const key in createCompanyErrors) {
                errors.value += createCompanyErrors[key][0] + ' ';
            }
        }
    }

    return {
        companies,
        errors,
        getCompanies,
        createCompany
    }
};