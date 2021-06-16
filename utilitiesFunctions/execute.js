const exec = require('child_process').exec
const insertLog = require('../database/insertLogs')

function getLogName(route) {
    switch (route) {
        case "/shutdown":
            return "Shutdown Windows instantly"
        case "/restart":
            return "Restart Windows instantly"
        case "/chrome":
            return "Open google chrome"
        case "/notepad":
            return "Create a notepad and open it"
        case "/scheduleShutdown":
            return "Shutdown Windows scheduled"
        case "/scheduleRestart":
            return "Restart Windows scheduled"
        default:
            return "Execute user command"
    }
}

module.exports = {
    exc: async function execute(command, req, res) {
        exec(command, (error, stdout, stderr) => {
            var log = {
                logName: getLogName(req.route.path),
                command: command,
                executed: error || stderr ? false : true,
                error: error,
                stdout: stdout,
                stderr: stderr,
            };
            insertLog.add(log)

            if (error)
                return res.status(400).json({
                    message: error.message
                })
            if (stderr)
                return res.status(400).json({
                    message: stderr
                })
            return res.status(200).json({
                message: stdout
            })
        })
    },
}