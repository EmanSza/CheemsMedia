
class database {
    constructor(client) {

        this.loadSchemas(client);
    }

    async connect(mongoose) {
        // Create a Conneciton to the Database
        mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        // Log the Connection
        mongoose.connection.on('connected', () => {
            console.log('Connected to the Database');
        });
    }
    async loadSchemas(client) {
        client.guildSchema = require('./database/schemas/template');
    }
}

export default database;