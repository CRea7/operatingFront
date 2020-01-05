import Api from '../services/api.js'

export default {
    fetchProcedures () {
        // eslint-disable-next-line no-console
        //console.log("all good");
        return Api().get('/procedures')
    },
}