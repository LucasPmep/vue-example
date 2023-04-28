import { ref } from "vue";
import axios from "axios";
import router from "../router/index.js";

export default function useCompanies() {
    const company = ref([]);
    const companies = ref([]);
    const errors = ref('');


    const getCompany = async (id) => {
        let response = await axios.get(`http://localhost:8000/api/companies/` + id);
        company.value = response.data.data;    
    };

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
            errors.value = error.response.data.errors;
        }
    };

    const updateCompany = async (id) => {
        errors.value = '';
        try {
            console.log(company.value);
            await axios.put(`http://localhost:8000/api/companies/` + id, company.value);
            await router.push({name: 'company.list'});
        } catch(error) {
            errors.value = error.response.data.errors;
        }
    };

    const deleteCompany = async (id) => {
        errors.value = '';
        try {
            await axios.delete(`http://localhost:8000/api/companies/` + id, company.value);
            await router.push({name: 'company.list'});
        } catch (error) {
            errors.value = error.response.data.errors;
        }
    };

    return {
        company,
        companies,
        errors,
        getCompany,
        getCompanies,
        createCompany,
        updateCompany,
        deleteCompany
    }
};