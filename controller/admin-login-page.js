const userModel = require('../model/user-model');
const bookModel = require('../model/book-model');
const notifier = require('node-notifier');


exports.adminlogInFormController = (req, res)=>{

    res.render('admin-login-page')

}


// admin authentication 

exports.adminAuthentication = (req, res)=>{
    
   new userModel().admins().then(([records])=>{


        let username = req.query.username ; 
        let password = req.query.password ; 
      
        
        for(let i =0; i<records.length; i++ ){

            if(username == records[i].username){
                if(password == records[i].password){
                    
                    res.redirect(`/admin-main-page?username=${username}`);
                    break

                }
                else{
                  
                    res.redirect("/admin-login");
                    
                    function showPopup() {
                        notifier.notify({
                            title: 'اخطار',
                            message: 'نام کاربری یا رمز عبور اشتباه است',
                            sound: true, // Optional sound flag
                            wait: true // Wait for user input

                        });
                    
                    }
                    showPopup();

                    break
                }

                
            }
            
            else if (username != records[i].username){
                continue;
            }

            else if(username != records[-1]) {
                res.redirect("/admin-login");

                break;
                
            }
        }

            

        })

}
// admin authentication 




exports.adminMainPageRender = async(req, res)=>{
    
    let username = req.query.username ; 
    let [books] = await new bookModel().fetchShopBooks(); 
    console.log(books)
    res.render('admin-main-page', {
        username,
        books 
    })
}