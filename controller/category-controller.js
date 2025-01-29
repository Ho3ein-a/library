const bookModel = require('../model/book-model');
const notifier = require('node-notifier')


exports.categoryFormRender = async(req, res)=>{
    
    let username = req.query.username;
    

    let [categories] = await new bookModel().fetchCategory();

    res.render('category-page',{
        username, 
        categories
});
}


exports.addCategoryConteroller = (req, res)=>{

    let username = req.query.username;
    let title = req.query.title;
    let description = req.query.description;


    new bookModel().fetchCategory().then(([categories])=>{

        let titles =[];

        categories.forEach(item => {
            titles.push(item.title);
        });



        if(titles.includes(title)){
            showPopup();
            function showPopup() {
                notifier.notify({
                    title: 'اخطار',
                    message: 'دسته بندی ایجاد شده است',
                    sound: true, // Optional sound flag
                    wait: true // Wait for user input

                });
            }
            
            res.redirect(`category?username=${username}`);

            

        }
        else{
           
            new bookModel().addCategory(title, description, username)

            res.redirect(`/admin-main-page?username=${username}`)

            function showPopup() {
                notifier.notify({
                    title: 'تایید',
                    message: 'دسته بندی ایجاد شد',
                    sound: true, // Optional sound flag
                    wait: true // Wait for user input

                });
            
            }
            showPopup();

        }
        

    })



}