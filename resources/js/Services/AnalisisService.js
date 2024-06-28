import ApiService from "@/Services/ApiService";

class ApiAnalisisService extends ApiService {
    async precipitationAnalisis(body) {
        return this.post("/precipitation", body);
    }

    async vciAnalisis(body) {
        return this.post("/vci", body);
    }

    async eviAndMsiAnalisis(body) {
        return this.post("/evi", body);
    }
}

export default new ApiAnalisisService();
