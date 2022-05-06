import { createLogger, format, transports } from 'winston'
const { combine, timestamp, prettyPrint, colorize } = format

/**
	level - Level of messages to log.
  filename - The file to be used to write log data to.
  handleExceptions - Catch and log unhandled exceptions.
  json - Records log data in JSON format.
  maxsize - Max size of log file, in bytes, before a new file will be created.
  maxFiles - Limit the number of files created when the size of the logfile is exceeded.
  colorize - Colorize the output. This can be helpful when looking at console logs.
*/

// const options = {
//   file: {
//     level: 'info',
//     filename: `log/app.log`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: false,
//   },
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false,
//     colorize: true,
//   },
// }

const logger = createLogger({
  transports: [
    new transports.Console({
      format: combine(timestamp(), prettyPrint(), colorize()),
      level: 'info',
    }),
    new transports.File({
      format: combine(timestamp(), prettyPrint(), colorize()),
      filename: 'log/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 14, // keep logs for 14 days
    }),
  ],
})

/**
if (config.DEPLOY === 'prod') {
	var infofile = new transports.DailyRotateFile({
		level: 'info',
		filename: 'log/app-%DATE%-info.log',
		datePattern: 'YYYY-MM-DD-HH',
		zippedArchive: true,
		timestamp: true,
		handleExceptions: true,
		humanReadableUnhandledException: true,
		prettyPrint: true,
		json: true,
		maxsize: 5242880, // 5MB
		colorize: true,
		maxFiles: '15d', // keep logs for 14 days
	});

	// infofile.on('rotate', function (oldFilename, newFilename) {
	// 	// do something fun
	// 	// FUnction called when New file is created
	// });

	var errorfile = new transports.DailyRotateFile({
		level: 'error',
		filename: 'log/app-%DATE%-error.log',
		datePattern: 'YYYY-MM-DD-HH',
		zippedArchive: true,
		maxSize: '20m',
		maxFiles: '30d', // keep logs for 30 days
	});

	// errorfile.on('rotate', function (oldFilename: string, newFilename: string) {
	// 	// do something fun
	// });

	var verbosefile = new transports.DailyRotateFile({
		level: 'error',
		filename: 'log/app-%DATE%-verbose.log',
		datePattern: 'YYYY-MM-DD-HH',
		zippedArchive: true,
		maxSize: '20m',
		maxFiles: '30d', // keep logs for 30 days
	});

	// verbosefile.on('rotate', function (oldFilename, newFilename) {
	// 	// do something fun
	// });
	// logger = createLogger({
	// 	format: combine(timestamp(), prettyPrint(), colorize(), json()),
	// 	transports: [
	// 		infofile,
	// 		errorfile,
	// 		verbosefile,
	// 		new transports.Console(),
	// 		new transports.MongoDB({
	// 			db: process.env.DB_URL,
	// 			level: 'error',
	// 			collection: 'web-v2',
	// 			options: {
	// 				useCreateIndex: true,
	// 				useNewUrlParser: true,
	// 				useFindAndModify: false,
	// 				useUnifiedTopology: true,
	// 			},
	// 		}),
	// 	],
	// });
}

if (config.DEPLOY === 'prod') {
	logger.exceptions.handle(
		new transports.File({
			filename: 'log/exceptions.log',
		})
	);
} else {
	logger.exceptions.handle(new transports.Console());
}
*/

export { logger }
