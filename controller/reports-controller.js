const reportsModel = require('../model/reports-model');

exports.reportsPageRender = async(req, res)=>{

    let username = parseInt(req.query.username);

    res.render('reports-page',{
        username
})

}

exports.numberOfEachCategoryReport = async (req, res)=>{

    let username = parseInt(req.query.username);

    let [books] = await new reportsModel().fetchNumberOfEachCategory();
    res.render('category-books-page',{
        books, 
        username
    })

}



exports.bestSalesReport = async(req, res)=>{

    let username = parseInt(req.query.username) ; 
    
    let [bestSales] = await new reportsModel().fetchBestSales();

    res.render('best-sales-page',{
        username,
        books : bestSales
    })
    

}


exports.mostExpensiveOfCategory = async(req, res)=>{

    let username = parseInt(req.query.username)

    let [mostExpensiveOfCategory] = await new reportsModel().fetchMostExpensiveOfCategory();

    res.render('most-expensive-page',{
        username, 
        books : mostExpensiveOfCategory
    })
}


exports.categoryBuyerNumber = async(req, res)=>{

    let username = parseInt(req.query.username)

    let [categoryBuyerNumber] = await new reportsModel().fetchCategoryBuyerNumber();

    res.render('category-buyers-page',{
        username, 
        buyers : categoryBuyerNumber
    })

}


exports.lastMonthSales = async(req, res)=>{

    let username = parseInt(req.query.username)
    let date = req.query.date; 
    
    // Month
    let lastMonth = parseInt(date[0])   

    // Last Month
    // let lastMonth = parseInt(date[0]) - 1   

    // console.log(lastMonth.toString())

    let [sales] = await new reportsModel().fetchLastMonthSales(lastMonth)

    res.render('last-month-sales', {
        username, 
        sales,
    })
}


exports.categorySales = async(req, res)=>{

    let username = parseInt(req.query.username);
    let date = req.query.date; 
    let month = date[0];

    let [monthSales] = await new reportsModel().fetchCategorySales(month) 

    res.render('category-month-sales',{
        username, 
        sales : monthSales
    })
}