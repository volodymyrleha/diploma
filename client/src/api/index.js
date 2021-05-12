import Auth from './auth.service';
import { ROOT_ENDPOINT, AUTH_ENDPOINT, USERS_ENDPOINT } from './endpoints';

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