const config = {
    secret: 'TWFyaW8gR3VlcnJpZXJvIGNyZWF0ZWQgdGhpcyBzb2NpYWwgbmV0d29yaw==',
    dbhost: process.env.PROD_MONGODB || 'mongodb://localhost:27017/opengram',
    dbname: 'opengram'
};

export default config;