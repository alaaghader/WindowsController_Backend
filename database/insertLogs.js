var mongodbutil = require('../database/database');
var db = mongodbutil.getDb();

module.exports = {
    add: async function insertLog(log) {
        const newLog = {
            logName: log.logName,
            command: log.command,
            executed: log.executed,
            error: log.error,
            stdout: log.stdout,
            stderr: log.stderr,
            dateAdded: new Date(),
        };

        await db.collection('Logs').insertOne(newLog);
    },
}