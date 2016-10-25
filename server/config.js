exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
        'mongodb://localhost/data/' :
        'mongodb://localhost/data/dev');
exports.PORT = 8080 || process.env.PORT;