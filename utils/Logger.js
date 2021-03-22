class Logger {
    constructor(service) {
        this.service = service;
    }

    log(message) {
        console.log(`[${ this.service.toUpperCase() }] ${ message }`);
    }
}

module.exports = Logger;