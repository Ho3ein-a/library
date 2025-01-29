const model = require('../model/pages-model');

exports.page1 = async(req, res)=>{

    let username = parseInt(req.query.username);

    // the fetch model
    let [sales] = await new model().fetchYearMonthSale();
    // the fetch model

    res.render('page1',{
        username,
        sales
    })
}


exports.page2 = async(req, res)=>{

    let username = parseInt(req.query.username);

    // the fetch model

    // the fetch model

    res.render('page2',{
        username,
    })
}