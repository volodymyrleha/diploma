class Error {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(400, message);
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(404, message);
    }
}

class ServerError extends Error {
    constructor() {
        super(500, "server error");
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    ServerError
}