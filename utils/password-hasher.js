const bcrypt = require('bcrypt');

class PasswordHasher {
    hash(password) {
        return new Promise((resolve) => {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            
            resolve(hash);
        });
    }

    compare(password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, results) => {
                if (err)
                    reject(err);                

                if (results)
                    resolve(true);
                else
                    reject(false);
            });
        });
    }
}

module.exports = PasswordHasher;