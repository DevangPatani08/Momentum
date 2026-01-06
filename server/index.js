const exp = require('express');
const mg = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authR = require('./routes/auth.js');
const taskR = require('./routes/tasks.js');


dotenv.config();
const app = exp();


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(exp.json());


app.use('/api/auth', authR);
app.use('/api/tasks', taskR);


mg.connect(process.env.MONGODB_URI).then(() => {
    console.log('✅ Connected to MongoDB Atlas!...');
    app.listen(PORT, () => {
        console.log(`✅ Server is up & running at http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
});