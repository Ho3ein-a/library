const  notifier  = require('node-notifier');
const userModel = require('../model/user-model');

exports.searchUser = (req, res)=>{

    new userModel().fetchUsers().then(([user])=>{
        let userId ; 
        let userIds = []
        let type = 0;
        let date = new Date().toLocaleString();
        userId =  Math.floor(Math.random()*100000) 

        user.forEach(element => {
            userIds.push(element.userId);
        });

        // check Id
        while(1){
            if(userIds.includes(userId)){
                userId =  Math.floor(Math.random()*100000) 
                continue
            }
    
            else{
                break;
            }
                
          }


        new userModel().addSearchUser(userId, type, date);

        res.redirect(`/shop?userId=${userId}&type=0`);

    })
}





exports.userSignInController = (req, res)=>{


    let userId = parseInt(req.query.userId); 
    let password = parseInt(req.query.password);
    let confirmPassword = parseInt(req.query.confirm_password);
    let fullName = req.query.fullName; 
    let address = req.query.address; 
    let creditCardNumber = parseInt(req.query.credit_card_number);
    let creditCardExpire = req.query.expire_date;
    let creditCardType = req.query.credit_card_type ;
    let zipCode = parseInt(req.query.zip_code) ; 
    let type = 1 ; // Signed
    let date = new Date().toLocaleDateString();
    
    new userModel().fetchUsers().then(([user])=>{
        
        let userIds = [];

        user.forEach(item=>{
            userIds.push(parseInt(item.userId));

        })

        
        if(userIds.includes(userId)){

            res.redirect('/sign-in');

            function showPopup() {
                notifier.notify({
                    title: 'اخطار',
                    message: 'این نام کاربری قبلا ثبت شده است',
                    sound: true, // Optional sound flag
                    wait: true // Wait for user input

                });
            
            }
            showPopup();
        }

        else{

            if(password==confirmPassword){

                new userModel().addUser(userId, type, date, password, fullName, address, zipCode, creditCardType, creditCardExpire, creditCardNumber);
                cartId =  Math.random()*1000000 ;
                new userModel().generateCart(cartId, new Date().toLocaleString()); 
                res.redirect(`/shop?userId=${userId}&type=1`);
            }


            else{
                res.redirect('/sign-in');

            function showPopup() {
                notifier.notify({
                    title: 'اخطار',
                    message: 'رمز عبور وارد شده و تکرار آن مطابقت ندارند',
                    sound: true, // Optional sound flag
                    wait: true // Wait for user input

                });
            
            }
            showPopup();
            }


        }




    
    }) 



}


exports.userLoginController = (req, res)=>{

    let userId = parseInt(req.query.userId);
    let password = parseInt(req.query.password) ; 

    new userModel().fetchUsers().then(([user])=>{

        
        let userIds = [];

        user.forEach(element => {
            userIds.push(parseInt(element.userId));
        });

        
        if(userIds.includes(userId)){
            for(let i=0; i<user.length; i++){

                if(user[i].userId==userId){

                    if(user[i].password == password){
                        res.redirect(`/shop?userId=${userId}&type=1`);
                        cartId =  Math.random()*1000000 ;
                        // fetch cartId`s to check that its unique
                        new userModel().generateCart(cartId, new Date().toLocaleString());
                        break;
                    }
                    else{
                        res.redirect('/login');
                        
                        function showPopup() {
                            notifier.notify({
                                title: 'اخطار',
                                message: 'نام کاربری یا رمز عبور اشتباه است',
                                sound: true, // Optional sound flag
                                wait: true // Wait for user input
    
                            });
                        
                        }
                        showPopup();
                        break;
                    }
                }
            }

        }
        else{
            res.redirect('/login');
            
            function showPopup() {
                notifier.notify({
                    title: 'اخطار',
                    message: 'نام کاربری یا رمز عبور اشتباه است',
                    sound: true, // Optional sound flag
                    wait: true // Wait for user input

                });
            
            }
            showPopup();
        }





    })

}