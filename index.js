const { createApp } = require('./src/app');

let app;

module.exports = async (req, res) => {
    if (!app) {
        app = await createApp();
        await app.ready();
    }

    app.server.emit('request', req, res);
};