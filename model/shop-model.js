const db = require('../util/database');

class Shop{

    constructor(){

    }

    // add to buy cart
    addToBuy(userId, cartId, Id, ISBN, date, number){
        return db.execute('insert into buy(userId, cartId, Id, ISBN, date, buynumber) values(?,?,?,?,?,?)', [userId, cartId, Id, ISBN, date, number])
    }

    addCompletedCheckout(Id){
        return db.execute('update buy set type = 1 where Id = ?', [Id])
    }
    shopProduct(){
        
        return db.execute('select * from shop')
    }

    fetchUserCart(userId){
        return db.execute('select cartId from buy where userId = ? group by cartId', [userId])
    }
    fetchUserBuyBookId(userId){
        return db.execute('select Id from buy where userId = ?', [userId])
    }
    // fetchUserBuy(cartId, userId){
   
    //  return db.execute('select * from buy where cartId = ? and userId = ?', [cartId, userId]) 
    // }

    fetchShopBooks(){
        return db.execute('select * from shop')
    }
    fetchUserBuy(userId){
   
        return db.execute('select distinct Id, ISBN, userId, cartId, date, buynumber, type, title, price, number from buy natural join shop where userId = ?', [ userId]) 
    }
    fetchUserAllBuys(userId){
   
        return db.execute('select distinct Id, ISBN, userId, cartId, date, buynumber, type, title, price, number from buy natural join shop where userId = ? and type = 0', [ userId]) 
    }
    
    fetchUserBought(userId){
        return db.execute('select * from buy natural join shop where userId = ? and type = 1', [userId])
    }

    fetchShopByIdAndDate(Id, date){
        return db.execute('select * from buy natural join shop where Id = ? and date = ?', [Id, date])
    }
    // Last Cart
    fetchCart(){
        return db.execute('SELECT cartId FROM cart where date in (select max(date) from cart)')
    }
    deleteBookInsert(Id){
        return db.execute('update shop set deleteFlag = 0 where Id = ?', [Id])
    }
    deleteBookFromShop(Id){
        return db.execute('update shop set deleteFlag = 1 where Id = ?', [Id])
    }
    deleteCart(Id, userId, date){
        return db.execute('delete from buy where Id = ? and userId = ? and date = ?', [Id, userId, date])
    }
    updateAllBuys(userId, date){
        return db.execute('update buy set type = 1  where userId = ? and date = ? ', [userId, date])
    }
}

module.exports = Shop ; 