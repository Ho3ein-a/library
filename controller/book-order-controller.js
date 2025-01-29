const bookModel = require('../model/book-model');
const userModel = require('../model/user-model')
const  notifier  = require('node-notifier');

exports.bookOrderFormRender = async(req, res) => {

    let [categories] = await new bookModel().fetchCategory();    
    var username = req.query.username ; 
    res.render('book-order-form', {
        username ,
        categories
    })

}

// great
exports.bookOrderValidationController = async(req, res)=>{
    
    var ISBN = parseInt(req.query.ISBN);
    var title = req.query.title;
    var username = parseInt(req.query.username) ; 
    var date = req.query.date ;
    var price = parseInt(req.query.price) ;
    var number = parseInt(req.query.number);
    var publisher = req.query.publisher; 
    var category = req.query.category ;     

    // type 

    if(req.query.received){
        var type = 1 
    }
    else{
        type = 0
    }

    // type

  
    let [storeBook] = await new bookModel().fetchStoreBooksForInsert(ISBN, price, category, publisher)
    console.log(storeBook)
   
    new bookModel().fetchStore().then(([store])=>{

    var Id =  Math.floor(Math.random()*100000);

    let Ids = [];  
    store.forEach(item=>{
        Ids.push(item.Id);

    })




    // check the Id 

    while(1){
        if(Ids.includes(Id)){
            Id =  Math.floor(Math.random()*100000) 
            continue
        }

        else{
            break;
        }
            
    
        }
    
    try{
        if(type==1){
            // recived in store

             

                    if(storeBook.length != 0 ){
                    // we have ordered this ISBN with this price before
                    let totalNumber = number + storeBook[0].number ; 
                        
                    let bookId = storeBook[0].Id ;  // first    
                    
                    new bookModel().updateTotalNumber(bookId, ISBN, totalNumber); 
                    
                    new bookModel().addToStore(Id, ISBN, title, price, publisher,  category, type, number, date, null);
                    
                    new bookModel().bookOrder(Id, ISBN, username) ;

                    res.redirect(`/admin-main-page?username=${username}`);

                    } 
                    else {
                    // we have in store with diffrent ISBN or we dont have this book in store      
                    // first time                    
                    new bookModel().addToStore(Id, ISBN, title, price, publisher,  category, type, number, date, number);
    
                    new bookModel().bookOrder(Id, ISBN, username) ;
    
            
                    res.redirect(`/admin-main-page?username=${username}`);
         
                    }




            
        } 
    
        else{
            // type = 0 ;

            if(storeBook != ''){
                // we have ordered this ISBN with this price before
                let totalNumber = number + storeBook[0].number ; 
                
                let bookId = storeBook[0].Id ;  // first    
                
                new bookModel().updateTotalNumber(bookId, ISBN, totalNumber); 
                
                new bookModel().addToStore(Id, ISBN, title, price, publisher,  category, type, number, date, null);
                
                // new bookModel().bookOrder(Id, ISBN, username) ;

                res.redirect(`/admin-main-page?username=${username}`);

                } 
                else {
                    // console.log(Id, ISBN, title, price, publisher, category, type, number, date, number)
                // we have ordered with diffrent ISBN or we have not ordered this book     
                // first time               
                new bookModel().addToStore(Id, ISBN, title, price, publisher, category, type, number, date, number);

                new bookModel().bookOrder(Id, ISBN, username) ;

        
                res.redirect(`/admin-main-page?username=${username}`);
     
                }

        }
        
    }
    catch{
        throw new Error("Error in book ordering")
    } 
    })
    
    
}







exports.orderedBooksRender = (req, res)=>{
    
    let username = parseInt(req.query.username) ; 
    new bookModel().fetchOrders().then(([books])=>{
        console.log(username)
        res.render('ordered-books-page',{
            book : books,
            username,
        })

    })
}






exports.addFromOrderToStoreController = (req, res)=>{


    let Id = parseInt(req.query.Id);     
    let ISBN = parseInt(req.query.ISBN);
    let username = parseInt(req.query.username); 
    console.log(username)
    new bookModel().updateStoreType(Id, ISBN); 
    res.redirect(`/admin-main-page?username=${username}`)

}






exports.storePageRender = (req, res)=>{

    let username = req.query.username ; 


        new bookModel().fetchAllStockStore().then(([stocks])=>{
            console.log(stocks)
            res.render('store-page', {
                username,
                stocks,
            })

        })
        


}

exports.bookSearch = async(req, res)=>{

    let title = req.query.title ; 
    let userId = parseInt(req.query.userId) ;

    let [user] = await new userModel().fetchUserInfo(userId);
    let userType = parseInt(user[0].type);

    new bookModel().fetchShopBooksTitles().then(([titles])=>{
        let booksTitle = [];
        titles.forEach(item=>{
            booksTitle.push(item.title);    
        })

        
        if(booksTitle.includes(title)){

            new bookModel().fetchShopBooksByTitle(title).then(([book])=>{
                res.render('result-page',{
                    book,
                    userId,
                    type : userType
            })
                

            })


        }

        else{
            function showPopup() {
                notifier.notify({
                    title: 'اخطار',
                    message: 'این کتاب در فروشگاه موجود نیست',
                    sound: true, // Optional sound flag
                    wait: true // Wait for user input

                });
            
            }
            showPopup();

            res.redirect(`/shop?userId=${userId}&type=${userType}`)
        }
    })


}