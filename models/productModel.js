const path = require("path");
const fs = require('fs');
const p = path.join(path.dirname(process.mainModule.filename), "Data", "products.json");

function getProductFromFile(cb) {
    fs.readFile(p, (err, fileData) => {
        if (err) {
            return cb([]);
        }
        return cb(JSON.parse(fileData))
    })
}



module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductFromFile(products=>{
        products.push(this)

            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err)
            })
        })
    }

    static fetchAll(cb) {
        getProductFromFile(cb)

    }
}