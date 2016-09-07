module.exports = {
    secret: 'TWFyaW8gR3VlcnJpZXJvIGNyZWF0ZWQgdGhpcyBzb2NpYWwgbmV0d29yaw==',
    dbhost: process.env.PROD_MONGODB || 'mongodb://localhost',
    dbname: 'opengram'
};