import { ref } from "vue";
import axios from "axios";
import router from "../router/index.js";
import { toast } from 'vue3-toastify';
import useErrors from "./errorservices.js";

const { handleErrors } = useErrors();

export default function useCompanies() {
    const company = ref([]);
    const companies = ref([]);
    const fullCompanies = ref([]);
    const errors = ref('');
    const q = ref('');
    const paginatedCompanies = ref([]);
    const checkedFilterValues = ref([]);


    const getCompany = async (id) => {
        try {
            let response = await axios.get(`http://localhost:8000/api/companies/` + id);
            company.value = response.data.data;    
        } catch (error) {
            handleErrors(error);
        }

    };

    const getCompanies = async (page = 1) => {
        errors.value = '';
        try{
            const response = await axios.get(`http://localhost:8000/api/companies?page=${page}&q=${q.value}&act=${checkedFilterValues.value}`);
            companies.value = response.data.data;
            paginatedCompanies.value = response.data;
        } catch (error) {
            handleErrors(error);
        }

    };
    
    const createCompany = async (data) => {
        errors.value = '';
        try {
            await axios.post('http://localhost:8000/api/companies', data, );
            await router.push({name: 'company.list'});
        } catch(error) {
            handleErrors(error);
        }
    };

    const updateCompany = async (id) => {
        errors.value = '';
        try {
            console.log(company.value);
            await axios.put(`http://localhost:8000/api/companies/` + id, company.value);
            await router.push({name: 'company.list'});
        } catch(error) {
            handleErrors(error);
        }
    };

    const deleteCompany = async (id) => {
        errors.value = '';
        try {
            await axios.delete(`http://localhost:8000/api/companies/` + id, company.value);
            await router.push({name: 'company.list'});
        } catch (error) {
            handleErrors(error);
        }
    };

    const searchCompany = async (query) => {
        q.value = query;
        await getCompanies(1)
    }

    // checks if a filter is activated and add or remove it to the array
    const checkFilters = (event, type) => {
        // check type to which table you want to change filter
        switch (type) {
            case 'activitysector':
                if(event.target.checked === true) {
                    checkedFilterValues.value.push(event.target.id)
                }
                else {
                    checkedFilterValues.value.splice(checkedFilterValues.value.indexOf(event.target.id), 1)
                }        
                break;
        }
        
        getCompanies(1);
    }
    
    const fullGetCompanies = async () => {
        errors.value = '';
        try{
            const response = await axios.get(`http://localhost:8000/api/companies?fullget=1`);
            fullCompanies.value =  response.data.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    return {
        company,
        companies,
        errors,
        paginatedCompanies,
        fullCompanies,
        getCompany,
        getCompanies,
        createCompany,
        updateCompany,
        deleteCompany,
        searchCompany,
        checkFilters,
        fullGetCompanies
    }
};