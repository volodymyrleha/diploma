class Logger {
    constructor(service) {
        this.service = service.toUpperCase();
    }

    log(message) {
        console.log(`[${ this.service }] ${ message }`);
    }
}

module.exports = Logger;