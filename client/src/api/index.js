import Auth from './auth.service';

const ROOT_ENDPOINT = '/api/v1';
const AUTH_ENDPOINT = '/auth';
//const USERS_ENDPOINT = '/users';

class API {
    constructor(rootEndpoint) {
        if (!API._instance) {
            API._instance = this;
            this.rootEndpoint = rootEndpoint;
        }

        return API._instance;
    }

    addService(serviceName, serviceEndpoint, Service) {
        this[serviceName] = new Service(this.rootEndpoint + serviceEndpoint);
    }

    static getInstance() {
        return this._instance;
    }
}

const api = new API(ROOT_ENDPOINT);
api.addService('auth', AUTH_ENDPOINT, Auth);

export default API.getInstance();