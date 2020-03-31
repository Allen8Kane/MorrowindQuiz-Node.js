//declare var require: any
const sqlite3 = require('sqlite3').verbose();
const http = require('http')
const fs = require('fs')
const path = require('path')


let result = 'hi';
var res = new Promise((resolve, reject) => {
    let db = new sqlite3.Database('./db/questions.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
          reject(err);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
    db.all('SELECT * FROM Questions', (err, results) => {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
    });
    db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      });
});

res.then(function(value){
    result = value;
    result.forEach(element => {
      console.log(element.Question + '\n');
    });
}); 