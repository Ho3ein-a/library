const shopModel = require('../model/shop-model');
const userModel = require('../model/user-model');
const bookModel = require('../model/book-model');
const  notifier  = require('node-notifier');

exports.shopRenderController = async(req, res)=>{
   
    new shopModel().shopProduct().then(([books])=>{
        let userId = req.query.userId;
        let type = parseInt(req.query.type);
        res.render('shop-page', {
            books,
            userId,
            type
        });
        
        
   
        })
        

}



exports.checkUserForAddToCart = (req, res)=>{

    let userId = parseInt(req.query.userId) ;
    let Id = parseInt(req.query.Id) 
    let ISBN = parseInt(req.query.ISBN);
    let buyNumber = parseInt(req.query.number);

    
    new userModel().fetchUserInfo(userId).then(([user])=>{
        new bookModel().fetchShopBookById(Id).then(([book])=>{
            let stock = parseInt(book[0].number) ;             
            let type = parseInt(user[0].type) ; 

            if(type == 1){
                
                if(stock >= buyNumber){

                    new shopModel().fetchCart().then(([cart])=>{

                        let cartId = parseInt(cart[0].cartId) ; 
                        function showPopup() {
                            notifier.notify({
                                title: 'تایید',
                                message: 'کتاب مدنظر به سبد خرید شما اضافه گردید',
                                sound: true, // Optional sound flag
                                wait: true // Wait for user input
                                
                            });
                        
                        }
                        
                        new shopModel().addToBuy(userId, cartId, Id, ISBN, new Date().toLocaleString(), buyNumber);

                        // new bookModel().updateShopBookNumberAfterBuy(Id, ISBN, newNumber)
                        
                        res.redirect(`/shop?userId=${userId}&type=${type}`);
                    })
        
                }
                else {

                    function showPopup() {
                        notifier.notify({
                            title: 'خطا',
                            message: 'تعداد کتاب وارد شده از موجودی بیشتر می باشد',
                            sound: true, // Optional sound flag
                            wait: true // Wait for user input
                            
                        });
                    
                    }
                    showPopup();
                        res.redirect(`/shop?userId=${userId}&type=${type}`);
                    
                }
                
                
                
    
            }
    
            else{
    
                function showPopup() {
                    notifier.notify({
                        title: 'اخطار',
                        message: 'برای انجام سفارش باید عضو شوید',
                        sound: true, // Optional sound flag
                        wait: true // Wait for user input
    
                    });
                
                }
                showPopup();
                res.redirect(`/shop?userId=${userId}&type=${type}`);


    
            }
    

        })
        
    })
    

}



exports.deleteBookForm = (req, res)=>{
    let username = parseInt(req.query.username);

    new shopModel().fetchShopBooks().then(([shopBook])=>{
        console.log(shopBook)
        res.render('delete-book-page',{
            username,
            shopBook
        })
    
    })

}


exports.deleteBookFromShop = (req, res)=>{

    let Id = req.query.Id; 
    let username = req.query.username ; 
    new shopModel().deleteBookFromShop(Id);
    res.redirect(`/admin-main-page?username=${username}`);

}


exports.deletedBookInsert = (req, res)=>{

    let Id = req.query.Id; 
    let username = req.query.username ; 
    new shopModel().deleteBookInsert(Id);
    res.redirect(`/admin-main-page?username=${username}`);

}

