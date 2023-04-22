const connection = require("../database/connect");

// Define a function to create an event that will delete expired loans every minute
const time_waiting_borrow_book = async () => {
   // Execute a SQL statement to create the event
  const [rows] = await connection.execute(`CREATE EVENT delete_expired_loans
    ON SCHEDULE EVERY 1 MINUTE
    DO
      DELETE FROM history WHERE TIMESTAMPDIFF(MINUTE, time_approve, NOW()) >= 10;`);
    return rows
};

module.exports = time_waiting_borrow_book;
