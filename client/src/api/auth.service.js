import apicall from './apicall';

const LOGIN_ENDPOINT = '/login';
const REGISTER_ENDPOINT = '/register';

class AuthService {
    constructor(serviceEndpoint) {
        this.serviceEndpoint = serviceEndpoint;
        this.loginEndpoint = serviceEndpoint + LOGIN_ENDPOINT;
        this.registerEndpoint = serviceEndpoint + REGISTER_ENDPOINT;
    }

    async login(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(this.loginEndpoint, 'POST', payload);
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async register(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(this.registerEndpoint, 'POST', payload);
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }
}

export default AuthService;