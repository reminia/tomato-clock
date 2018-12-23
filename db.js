let PouchDB = require('pouchdb-browser')
PouchDB.plugin(require('pouchdb-find'));

//tomato: day, _id, desc, duration
class DBService {

    constructor() {
        this.setup()
    }
    //setup the database
    setup() {
        this.db = new PouchDB("tomatoes")
        this.db.createIndex({
            index: { fields: ['day'] }
        });
    }

    // add a tomato, return the promise
    add(tomato) {
        return this.db.put(tomato)
            .then(function (response) {
                return true;
            }).catch(function (err) {
                return false;
            });
    }

    // list tomatoes of the day, return a promise
    list(theDay) {
        return this.db.find({
            selector: { day: theDay }
        }).then(function (result) {
            return result.docs
        }).catch(function (err) {
            console.log(err)
        });
    }
}
module.exports = DBService