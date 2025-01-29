const express = require('express');
const app = express();
const path = require('path');


const startPageRouter = require('./router/start-page-router.js');
const logInRouter = require('./router/login-router.js');
const signInRouter = require('./router/signin-router.js');
const cartRouter = require('./router/cart-router.js');
const adminLoginRouter = require('./router/admin-login-page.js');
const adminAuth = require('./router/admin-auth-router.js');
const adminRender = require('./router/admin-main-page-router.js');
const bookOrderFormRouter = require('./router/book-order-router.js');
const bookOrderValidation = require('./router/book-order-validation-router.js');
const orderedBooksRender = require('./router/ordered-books-router.js');
const addToStore = require('./router/add-store-router.js');
const storeRender = require('./router/store-page-router.js');
const categoryFormRender = require('./router/category-page-router.js');
const addCategory = require('./router/add-category-router.js');
const addBook = require('./router/add-book-router.js');
const addBookValidation = require('./router/add-book-validation-router.js');
const shopRender = require('./router/shop-page-router.js');
const searchUser = require('./router/search-user-router.js');
const userSignIn = require('./router/add-user-router.js');
const userLogin = require('./router/user-login-router.js'); 
const addToCart = require('./router/add-to-cart-router.js');
const checkout = require('./router/checkout-router.js');
const checkoutCompleted = require('./router/checkout-completed-router.js');
const resultPage = require('./router/book-search-router.js');
const deleteBookFromShop = require('./router/delete-book-shop-router.js');
const deleteBookForm = require('./router/delete-book-form-router.js');
const deletedBookInsert = require('./router/deleted-book-insert-router.js');
const addToShopFirstPage = require('./router/add-to-shop-first-router.js');
const addToShopSecondPage = require('./router/add-to-shop-second-router.js'); 
const userBoughtsPage = require('./router/boughts-router.js') ;
const deleteCart = require('./router/delete-cart-router.js');
const checkoutAllCartFirstPage = require('./router/checkout-all-cart-router.js');
const checkoutAllCartSecondPage = require('./router/checkout-all-cart-second-router.js');
const reportsPageRender = require('./router/reports-page-router.js');
const numberOfEachCategory = require('./router/category-book-router.js');
const staticFilesDirectory = path.join(__dirname, 'static');
const bestSales = require('./router/best-sales-router.js');
const mostExpensiveOfCategory = require('./router/most-expencive-category-router.js');
const categoryBuyerNumber = require('./router/category-buyer-router.js');
const lastMonthSales = require('./router/last-month-sales-router.js');
const categorySales = require('./router/category-month-sales-router.js')

const page2 = require('./router/page2-router.js');
const page1 = require('./router/page1-router.js');


app.use(express.static(staticFilesDirectory));

app.set('views', './view');
app.set('view engine', 'ejs');




app.use(startPageRouter);
app.use(logInRouter);
app.use(signInRouter);
app.use(cartRouter);
app.use(adminLoginRouter);
app.use(adminAuth);
app.use(adminRender);
app.use(bookOrderFormRouter);
app.use(bookOrderValidation);
app.use(orderedBooksRender);
app.use(addToStore);
app.use(storeRender);
app.use(categoryFormRender);
app.use(addCategory);
app.use(addBook);
app.use(addBookValidation);
app.use(shopRender);
app.use(searchUser);
app.use(userSignIn);
app.use(userLogin);
app.use(addToCart);
app.use(checkout);
app.use(checkoutCompleted);
app.use(resultPage);
app.use(deleteBookFromShop);
app.use(deleteBookForm);
app.use(deletedBookInsert);
app.use(addToShopFirstPage);
app.use(addToShopSecondPage);
app.use(userBoughtsPage);
app.use(checkoutAllCartFirstPage);
app.use(checkoutAllCartSecondPage)
app.use(deleteCart);
app.use(reportsPageRender);
app.use(numberOfEachCategory);
app.use(bestSales);
app.use(mostExpensiveOfCategory);
app.use(categoryBuyerNumber);
app.use(page2)
app.use(page1)
app.use(lastMonthSales)
app.use(categorySales)
app.get('/', function (req, res) {
    res.send('404 Not Found');
});

app.listen(3000)