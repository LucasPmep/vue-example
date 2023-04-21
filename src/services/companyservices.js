import { ref } from "vue";
import axios from "axios";

export default function useCompanies() {
    const companies = ref([]);

    const getCompanies = async () => {
        let response = await axios.get(`http://localhost:8000/api/companies`);
        companies.value = response.data.data;
    };
    
    return {
        companies,
        getCompanies
    }
};