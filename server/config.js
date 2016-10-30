exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV = 'mongodb://ducktivity:ducktivity123@ds139267.mlab.com:39267/ducktivity');
exports.PORT = 8080 || process.env.PORT;