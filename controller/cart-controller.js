const userModel = require('../model/user-model');
const shopModel = require('../model/shop-model');
const bookModel = require('../model/book-model');
const  notifier  = require('node-notifier');

exports.renderCart = async (req, res) => {
    try {
        let userId = parseInt(req.query.userId);

        // signed user or not 
        const [user] = await new userModel().fetchUserInfo(userId);
        let type = parseInt(user[0].type);

        if (type === 1) {
            // can
            // const [shop] = await new shopModel().fetchUserCart(userId);

            // let userCarts = shop.map(element => parseInt(element.cartId));

            // let allBuys = [];
            // for (let cartId of userCarts) {
            //     const [buys] = await new shopModel().fetchUserBuy(cartId, userId);
            //     allBuys.push(...buys);
            // }

            const [buys] = await new shopModel().fetchUserBuy(userId);
            console.log(buys)
            res.render('cart-page', {
                buys ,
                userId, 
                type
            });
        } else {
            // can not
            function showPopup() {
                notifier.notify({
                    title: 'اخطار',
                    message: 'برای سفارش باید عضو شوید',
                    sound: true, // Optional sound flag
                    wait: true // Wait for user input
                });
            }

            showPopup();
            res.redirect(`/shop?userId=${userId}&type=${type}`);
        }
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).send('An error occurred');
    }
};


exports.checkoutController = (req, res)=>{

    let Id = parseInt(req.query.Id) ;
    let stock = parseInt(req.query.stock) ; 
    let buyNumber = parseInt(req.query.buynumber) ;
    let ISBN = parseInt(req.query.ISBN);
    let userId = parseInt(req.query.userId);
    let date = req.query.date;
    let newNumber = stock - buyNumber ; 

    new userModel().fetchUserInfo(parseInt(userId)).then(([user])=>{
        
        new shopModel().fetchShopByIdAndDate(Id, date).then(([buy])=>{

            let totalPrice = (buy[0].buynumber * buy[0].price) + 10000 ;
            // update shop number after buying
            new bookModel().updateShopBookNumberAfterBuy(Id, ISBN, newNumber)
            
            res.render("checkout-page", {
                user, 
                buy, 
                totalPrice
            })

        })


    })



}


exports.checkoutCompleted = (req, res)=>{
    let Id = parseInt(req.query.Id) ; 
    let userId = parseInt(req.query.userId);
    new shopModel().addCompletedCheckout(Id) ;

    function showPopup() {
        notifier.notify({
            title: 'تایید',
            message: 'خرید انجام شد',
            sound: true, // Optional sound flag
            wait: true // Wait for user input

        });
    
    }
    showPopup();
    res.redirect(`/shop?userId=${userId}`);

}

exports.boughtsPageRender = async(req, res)=>{

    let userId = req.query.userId;

    new shopModel().fetchUserBought(userId).then(([boughts])=>{
        console.log(boughts)
        res.render('boughts-page',{
            boughts,
        })

    })

}



exports.deleteCart = async (req, res)=>{

    let Id = parseInt(req.query.Id); 
    let userId = parseInt(req.query.userId); 
    let date = req.query.date ; 

    new shopModel().deleteCart(Id, userId, date);

    res.redirect(`cart?userId=${userId}`)

}


exports.checkoutAllCartFirstPage = async (req, res)=>{

    let userId = req.query.userId;

    let [user] = await new userModel().fetchUserInfo(userId);
    let [buys] = await new shopModel().fetchUserAllBuys(userId);
    let price = 0;
    let buyNumber = 0;
    let totalNumber =0 ;

    // finding total price and number
    buys.map(item=>{
        totalNumber += (item.price * item.buynumber) ; 

    })
    console.log(totalNumber)
    
    res.render('checkout-all-cart-first-page',{
        user,
        buys,
        totalPrice : totalNumber + 10000, 
        userId
    })


}


exports.checkoutAllCartSecondPage = async (req, res)=>{
   
    let userId = parseInt(req.query.userId);

    const dateStrings = req.query.buys.split(',');
    
    const combinedDateTime = [];
    
    for (let i = 0; i < dateStrings.length; i += 2) {
        const dateStr = dateStrings[i].trim();
        const timeStr = dateStrings[i + 1].trim();
        const dateTimeStr = `${dateStr}, ${timeStr}`;
        combinedDateTime.push(dateTimeStr);
    }
    
 
    async function updateAllBuys(userId, dates) {
        try {
                dates.map(item=>{
                    new shopModel().updateAllBuys(userId, item)
                })
            
    
            console.log('All dates updated successfully');
        } catch (error) {
            console.error('Error updating dates:', error);
        }
    }
    updateAllBuys(userId, combinedDateTime);    



    res.redirect(`/shop?userId=${userId}`)

    
    /********************* * /
    
        const input = {
        buys: '6/7/2024, 5:21:20 PM,6/7/2024, 5:59:43 PM,6/7/2024, 5:59:45 PM'
    };

    // Split the string into an array of date and time strings
    const dateStrings = input.buys.split(',');

    // Extract only the dates, skipping the times and AM/PM
    const dates = [];
    for (let i = 0; i < dateStrings.length; i += 2) {
        const dateStr = dateStrings[i].trim();
        dates.push(dateStr);
    }

    // Now `dates` is an array of date strings
    console.log(dates);
    ['6/7/2024', '6/7/2024', '6/7/2024']

    ************************ */


}