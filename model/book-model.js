
const db = require('../util/database');
module.exports = class Books{

    constructor(){
        
    }

    



    addAuthor(ISBN, fullName){

        return db.execute('insert into author(ISBN, fullName) values(?,?)', [ISBN, fullName])

    }

    // addBookCategory(ISBN, title){
    //     return db.execute('insert into bookcategory(ISBN, category) values(?,?)', [ISBN, title])
    // }
    
    
    updateShopBookNumber(Id, title, leastStock, number, price){

        return db.execute('update shop set title = ?, leastStock = ?, number = ?, price = ?  where Id = ?', [title, leastStock, number, price, Id])

    }

    updateShopBookNumberAfterBuy(Id, ISBN, number){
        return db.execute('update shop set number = ? where Id = ? and ISBN = ?', [number, Id, ISBN])
    }

    fetchShopBooksTitles(){
        return db.execute('select title from shop')
    }

    fetchShopBooksByTitle(title){
        return db.execute('select * from shop where title = ?', [title])
    }



    // fetchStock(username){

    //     return db.execute(`SELECT ISBN, title, SUM(number) AS total_number 
    //     FROM store 
    //     WHERE username = ?
    //     GROUP BY ISBN, title;
    //     `, [username])
        
    // }
    
    addToShop(Id, ISBN, title, leastStock, number, price){

        return db.execute('insert into shop(Id, ISBN, title ,leastStock, number, price) values(?,?,?,?,?,?)', [Id, ISBN, title, leastStock, number, price])

    }

    addAdminInsertToStore(username, Id, ISBN, date, number){
        return db.execute('insert into admininserttostore(username, Id, ISBN, date, number) values(?,?,?,?,?)',[username, Id, ISBN, date, number])
    }

    bookOrder(Id, ISBN, username ){
        return db.execute('insert into bookorder(Id, ISBN,  username ) values(?,?,?)', [Id, ISBN, username] )
    }

 
    addToStore(Id, ISBN, title, price, publisher, category, type, number, date, totalNumber){

        return db.execute('insert into store(Id, ISBN, title, price, publisher, category, type, number, totalNumber, date) values(?,?,?,?,?,?,?,?,?,?) ', [Id, ISBN, title, price, publisher, category, type, number, totalNumber, date])
        
    }

    addedToStore(bookId){
        
        return db.execute('update orderedbooks set type = 1 where id=?',[bookId])

    }

  

    addCategory(title, text, username){
        return db.execute('insert into category(title, description, username) values(?,?,?) ', [title, text, username])
    }
    updateStoreType(Id, ISBN){

        return db.execute('update store set type = 1 where Id =? and ISBN = ?', [Id, ISBN ])

    }
        // same price 
    updateTotalNumber(Id, ISBN, total_number){
        return db.execute('update store set totalNumber = ? where Id = ? and ISBN = ?', [total_number, Id, ISBN])
    }

    fetchOrders(){
        return db.execute('select * from store ')
    }
    fetchStore(){
        return db.execute('select * from store  where type = 1 ')
    }
    fetchStoreISBNs(){
        return db.execute('select ISBN from store  where type = 1 group by ISBN')
    }
    fetchAllStockStore(){
        return db.execute('select * from store where type = 1 and totalNumber != ""')
    }
    fetchStoreBooksForInsert(ISBN, price, category, publisher ){
        return db.execute('select * from store where ISBN = ? and price = ? and category = ? and publisher = ? and totalNumber != "" ' , [ISBN, price, category, publisher])
    }
    fetchStoreBooksByISBN(ISBN){
        return db.execute('select * from store where ISBN = ? and totalNumber !="" ', [ISBN])
    }
    fetchStoreBooksById(Id){
        return db.execute('select * from store where Id = ?', [Id])
    }
    fetchShopBookById(Id){

        return db.execute('select * from shop where Id=?', [Id])

    }
    fetchShopBooks(){

        return db.execute('select * from shop')

    }
    fetchCategory(){
        return db.execute('select categoryId, title, description from category')
    }
        
    fetchOrderedBooks(username){
        return db.execute('select * from bookorder where username = ?', [username])

    }

    fetchStockNumber(Id){
        return db.execute('SELECT * from store where Id = ? ', [Id])
    }

    
}