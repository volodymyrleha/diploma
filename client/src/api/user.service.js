import apicall from './apicall';
import { USER_ENDPOINT, NOTES_ENDPOINT } from './endpoints';
import * as storage from '../utils/storage';

class UserService {
    constructor(serviceEndpoint) {
        this.serviceEndpoint = serviceEndpoint;
        this.userEndpoint = serviceEndpoint + USER_ENDPOINT;
        this.notesEndpoint = serviceEndpoint + NOTES_ENDPOINT;
    }

    getToken() {
        return storage.get('token');
    }

    async get() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(this.userEndpoint, 'GET', {}, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async getNotes() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(this.notesEndpoint, 'GET', {}, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async createNote(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(this.notesEndpoint, 'POST', payload, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async updateNote(noteId, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(`${this.notesEndpoint}/${noteId}`, 'PUT', payload, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async deleteNote(noteId) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(`${this.notesEndpoint}/${noteId}`, 'PUT', {}, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }
}

export default UserService;