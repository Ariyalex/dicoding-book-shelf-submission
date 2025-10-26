const app = require('./src/app');

const PORT = 9000;



app.listen(PORT, () => {
    console.log(`server berjalan di http://localhost:${PORT}`);
});