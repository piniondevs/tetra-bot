const chalk = require('chalk');

class Loggy {

  /**
   * Create a loggy instance with options
   * 
   * @param {options} options - An object representing the log settings
   * @param {boolean} options.showTimeStamp - Does what the name says it does, defaults to true.
   * @param {string} options.logPath - Path to the folder where log files are to be kept, if not provided auto log is turned off.
   */
  constructor(options) {
    this.options = (() => {
      if (!options) {
        return {
          showTimeStamp: true,
        };
      }
      return options;
    })();
    this.getFileName = (() => {
      const basePath = process.argv[1].split("/");
      return basePath[basePath.length - 1];
    })();
  }

  /**
   * This function creates the date used in logs, just a helper function
   * not really meant to be called.
   */
  __generateTime = () => {
    if (
      this.options.showTimeStamp === false ||
      this.options.showTimeStamp === undefined
    )
      return ``;
    const date = new Date();
    return `(${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()})`;
  };

  /**
   * The function responsible for creating the actual logs,
   * not really meant to be called by the user but you can use it if you want custom logs.
   *
   *
   * @param {Object} param - Param object representing the log properties
   * @param {string} param.color - The color you wish the log to be
   * @param {string} param.title - The title of the param (LOG, ERROR, Whatever)
   * @param {string} param.message - The message you want your log to include
   */
  __generateLog = (param) =>
    `${chalk.bold[param.color](param.title)} [${
      this.getFileName
    }] ${this.__generateTime()} - ${chalk[param.color](param.message)}`.replace(
      /\s\s+/g,
      " "
    );

  /**
   * The standard log function, no fluff, no colors, just a simple message.
   *
   * @param {string} message
   */
  log = (message) => {
    console.log(
      `${chalk.bold("LOG")} [${
        this.getFileName
      }] ${this.__generateTime()} - ${message}`.replace(/\s\s+/g, " ")
    );
  };

  /**
   * A success log function, log stuff with a green color,
   * used when somethings goes accoring to plan.
   *
   * @param {string} message
   */
  success = (message) => {
    console.log(
      this.__generateLog({
        title: "SUCCESS",
        color: "greenBright",
        message: message,
      })
    );
  };

  /**
   * An error log function, log stuff with a red color,
   * used when something does not go according to plan.
   *
   * @param {string} message
   */
  error = (message) => {
    console.log(
      this.__generateLog({
        title: "ERROR",
        color: "red",
        message: message,
      })
    );
  };
}

module.exports = Loggy;