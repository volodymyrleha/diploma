import apicall from './apicall';
import { USER_ENDPOINT, NOTES_ENDPOINT, TASKS_ENDPOINT, EVENTS_ENDPOINT } from './endpoints';
import * as storage from '../utils/storage';

class UserService {
    constructor(serviceEndpoint) {
        this.serviceEndpoint = serviceEndpoint;
        this.userEndpoint = serviceEndpoint + USER_ENDPOINT;
        this.notesEndpoint = serviceEndpoint + NOTES_ENDPOINT;
        this.tasksEndpoint = serviceEndpoint + TASKS_ENDPOINT;
        this.eventsEndpoint = serviceEndpoint + EVENTS_ENDPOINT;
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
                const res = await apicall(`${this.notesEndpoint}/${noteId}`, 'DELETE', {}, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async getTasks() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(this.tasksEndpoint, 'GET', {}, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async createTask(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(this.tasksEndpoint, 'POST', payload, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async updateTask(taskId, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(`${this.tasksEndpoint}/${taskId}`, 'PUT', payload, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async updateTaskState(taskId, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(`${this.tasksEndpoint}/${taskId}/state`, 'PUT', payload, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async deleteTask(taskId) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(`${this.tasksEndpoint}/${taskId}`, 'DELETE', {}, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async createEvent(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(this.eventsEndpoint, 'POST', payload, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async updateEvent(eventId, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(`${this.eventsEndpoint}/${eventId}`, 'PUT', payload, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }

    async deleteEvent(eventId) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await apicall(`${this.eventsEndpoint}/${eventId}`, 'DELETE', {}, this.getToken());
                resolve(res);

            } catch (err) {
                reject(err);
            }
        });
    }
}

export default UserService;