const mysql =require('mysql')
const db = mysql.createPool({
    host:'lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user:'os83v3ycivh8on1b',
    password:'llrzmno1rew8880c',
    database:'w5y69ki1y9udcp9i'
});
module.exports = db;


