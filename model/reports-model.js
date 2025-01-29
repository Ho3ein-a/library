const db = require('../util/database');

class reports  {

    fetchNumberOfEachCategory(){
        return db.execute('SELECT category, sum(totalNumber) as number FROM library.store where totalNumber != "" group by category')
    }
    
    fetchBestSales(){
        return db.execute(`SELECT ISBN, title, COUNT(*) AS sales
FROM buy natural join shop
where type = 1
GROUP BY ISBN, title
ORDER BY sales DESC
LIMIT 10`)
    }

    fetchMostExpensiveOfCategory(){
        return db.execute(`SELECT s1.category, s1.ISBN, s1.price, s1.title
    FROM library.store s1
    JOIN (
    SELECT category, MAX(price) as max_price
    FROM library.store
    GROUP BY category
    ) s2
    ON s1.category = s2.category AND s1.price = s2.max_price ;
`)
    }


    fetchCategoryBuyerNumber(){
        return db.execute(`SELECT 
    category, 
    COUNT(DISTINCT userId) AS distinct_buyers
    FROM 
    buy 
    JOIN 
    store  ON buy.Id = store.Id
    WHERE 
    buy.type = 1
    GROUP BY 
    category;`)
    }


    fetchLastMonthSales(month){
        return db.execute('select * from buy join (select Id, title from shop) shop on buy.Id = shop.Id where date like concat(?, "%") and type = 1 ', [month])
    }

    fetchCategorySales(month){
        return db.execute(`SELECT 
    
    sum(shop_store.price) as Sum, 
    shop_store.category 
FROM 
    buy 
JOIN 
    (
        SELECT 
            shop.Id AS shop_Id, 
            shop.price, 
            store.category 
        FROM 
            shop 
        JOIN 
            store 
        ON 
            shop.Id = store.Id
    ) AS shop_store 
ON 
    buy.Id = shop_store.shop_Id
where type = 1  and date LIKE CONCAT(?, "%")  
group by category `, [month])
    }



}

module.exports = reports