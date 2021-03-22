const bcrypt = require('bcrypt');

class PasswordHasher {
    hash(password) {
        return new Promise((resolve) => {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            
            resolve(hash);
        });
    }
}

module.exports = PasswordHasher;