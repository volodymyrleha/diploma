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

class UnauthorizedError extends Error {
    constructor(message) {
        super(401, message);
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(403, message);
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
    UnauthorizedError,
    ForbiddenError,
    ServerError
}