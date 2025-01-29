const db = require('../util/database');

class pages {


// the query 
fetchYearMonthSale(){
    return db.execute('select date, sum(buynumber) as  Sum from buy where type = 1  group by date')
}


}

module.exports = pages;