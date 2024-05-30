const {Pool} = require('pg')
const pool = new Pool({
    user:'postgres',
    host:'127.0.0.1',
    database:'dbms',
    password:'manager',
    port:5432
})
module.exports=pool;
// const getUser = async () => {
//     try {
//       return await new Promise(function (resolve, reject) {
//         pool.query("SELECT * FROM users", (error, results) => {
//           if (error) {
//             reject(error);
//           }
//           if (results && results.rows) {
//             resolve(results.rows);
//           } else {
//             reject(new Error("No results found"));
//           }
//         });
//       });
//     } catch (error_1) {
//       console.error(error_1);
//       throw new Error("Internal server error");
//     }
//   };
//   //create a new merchant record in the databsse
//   const createUser = (body) => {
//     return new Promise(function (resolve, reject) {
//       const {userID,username, email, password } = body;
//       pool.query(
//         "INSERT INTO users (userID,username, email,password) VALUES ($1, $2,$3,$4) RETURNING *",
//         [userID,username, email,password],
//         (error, results) => {
//           if (error) {
//             reject(error);
//           }
//           if (results && results.rows) {
//             resolve(
//               `A new merchant has been added: ${JSON.stringify(results.rows[0])}`
//             );
//           } else {
//             reject(new Error("No results found"));
//           }
//         }
//       );
//     });
//   };
//   //delete a merchant
// //   const deleteMerchant = (id) => {
// //     return new Promise(function (resolve, reject) {
// //       pool.query(
// //         "DELETE FROM merchants WHERE id = $1",
// //         [id],
// //         (error, results) => {
// //           if (error) {
// //             reject(error);
// //           }
// //           resolve(`Merchant deleted with ID: ${id}`);
// //         }
// //       );
// //     });
// //   };
//   //update a merchant record
//   module.exports={
//     getUser,
//     createUser
//   }
// export default pool;