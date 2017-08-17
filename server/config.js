const config = {
    secret: 'TWFyaW8gR3VlcnJpZXJvIGNyZWF0ZWQgdGhpcyBzb2NpYWwgbmV0d29yaw==',
    dbhost: process.env.PROD_MONGODB || 'mongodb://localhost:27017/opengram',
    dbname: 'opengram',
    url: process.env.NODE_ENV !== 'production' ? 'http://localhost/' : 'https://opengram.herokuapp.com/',
    port: process.env.PORT || 3000
};

export default config;
