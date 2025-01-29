const boolModel = require('../model/book-model');
const notifier = require('node-notifier')


exports.addToShopFirstPage = async(req, res)=>{
    new boolModel().fetchStoreISBNs().then(([book])=>{

        let username = req.query.username ; 
        let ISBNs = []; 
        book.map(item=>{
            ISBNs.push(item.ISBN)
        })


        res.render('add-to-shop-first-page',{
            username, 
            ISBNs
        })

    })


}


exports.addToShopSecondPage = async(req, res)=>{

    let username = parseInt(req.query.username) ;
    let ISBN = parseInt(req.query.ISBN);

    let [ISBNBooks] = await new boolModel().fetchStoreBooksByISBN(ISBN);

    res.render('add-to-shop-second-page',{
        username, 
        ISBNBooks
})

}


exports.addToShopThirdPage = async(req, res)=>{

    let username = parseInt(req.query.username) ;
    let Id = parseInt(req.query.Id);
    let ISBN = parseInt(req.query.ISBN)
    let [bookId] = await new boolModel().fetchStoreBooksById(Id);

    res.render('add-book-page',{
        username, 
        bookId
})

}



// exports.addBookFormController = (req, res)=>{

//     let username = parseInt(req.query.username) ; 

//     new boolModel().fetchStore(username).then(([book])=>{

//             let bookISBN = [];

//             book.forEach(item => {
//                 bookISBN.push(item.ISBN)
//             });
            
   
//             res.render('add-book-page',{
//                 ISBN : bookISBN ,
//                 username
//         })
    

        
//     })

// }





exports.addBookValidation = (req, res)=>{


    let username = parseInt(req.query.username);
    let ISBN = parseInt(req.query.ISBN);
    let title = req.query.title;
    let price = parseInt(req.query.price); 
    let number = parseInt(req.query.number);
    let leastStock = parseInt(req.query.least_stock);
    let Id = req.query.Id; 

    new boolModel().fetchStockNumber(Id).then(([bookId])=>{
        
        new boolModel().fetchShopBookById(Id).then(([shopBook])=>{
    
        let stock = bookId[0].totalNumber ;
  


        if(shopBook != ''){
            // we have this book in shop, so we update its number


            if(number <= stock){
                        // successfully
                        let oldAccNumber = shopBook[0].number; 
                        
                        new boolModel().updateShopBookNumber(Id, title, leastStock, oldAccNumber + number, price);

                        let newNumber = stock - number ;
        
                        new boolModel().updateTotalNumber(Id, ISBN, newNumber);
    
                        new boolModel().addAdminInsertToStore(username, Id, ISBN, new Date().toLocaleString(), number);

                        function showPopup() {
                            notifier.notify({
                                title: 'تایید',
                                message: 'کتاب مدنظر به فروشگاه اضافه شد',
                                sound: true, // Optional sound flag
                                wait: true // Wait for user input
            
                            });
                        
                        }
                        
                        res.redirect(`/admin-main-page?username=${username}`);
                        showPopup();
                        
            }
            
            else {
    
                
                // number > stock
                function showPopup() {
                    notifier.notify({
                        title: 'اخطار',
                        message: 'تعداد کتاب وارد شده از تعداد کتاب موجود در انبار بیشتر است',
                        sound: true, // Optional sound flag
                        wait: true // Wait for user input
    
                    });
                
                }
                res.redirect(`/add-book?username=${username}&Id=${Id}`);
                showPopup();
    
    
            }

        }

        else {
            // we dont have this book in shop

            if(number <= stock){
                // successfully     
                let newNumber = stock - number ;

                new boolModel().updateTotalNumber(Id, ISBN, newNumber)   

                new boolModel().addToShop(Id, ISBN, title, leastStock, number, price);
                
                new boolModel().addAdminInsertToStore(username, Id, ISBN, new Date().toLocaleString(), number);


                function showPopup() {
                    notifier.notify({
                        title: 'تایید',
                        message: 'کتاب مدنظر به فروشگاه اضافه شد',
                        sound: true, // Optional sound flag
                        wait: true // Wait for user input
    
                    });
                
                }
                
                res.redirect(`/admin-main-page?username=${username}`)
                showPopup();
    
            }
    
    
    
    
            else{
    
                // number > stock
                function showPopup() {
                    notifier.notify({
                        title: 'اخطار',
                        message: 'تعداد کتاب وارد شده از تعداد کتاب موجود در انبار بیشتر است',
                        sound: true, // Optional sound flag
                        wait: true // Wait for user input
    
                    });
                
                }
                res.redirect(`/add-book?username=${username}&Id=${Id}`);
    
                showPopup();
    
    
            }


        }

        

    })    

})




}