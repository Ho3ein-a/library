const db = require('../util/database');

module.exports = class Users {
    constructor(){

    }

    admins(){
        return db.execute('select username, password from admin')
    }

    generateCart(Id, date){
        return db.execute('insert into cart(cartId, date) values(?,?)', [Id, date]);
    }

    addUser(userId, type, dateOfMembership, password, fullName, address, zipCode, creditCardType, creditCardExpire, creditCardNumber) {

        return db.execute('insert into customer(userId, password, fullName, address, dateOfMembership, zipCode, type, creditCardType, creditCardExpire, creditCardNumber) values(?,?,?,?,?,?,?,?,?,?)', [userId, password, fullName, address, dateOfMembership, zipCode, type, creditCardType, creditCardExpire, creditCardNumber])
    }   

    addSearchUser(userId, type, dateOfMembership){

        return db.execute('insert into customer(userId, type, dateOfMembership) values(?,?,?) ', [userId, type, dateOfMembership])
    }



    fetchUsers(){

        return db.execute('select * from customer')
    }

    fetchUserInfo(userId){

        return db.execute('select * from customer where userId = ?', [userId])
    }
}