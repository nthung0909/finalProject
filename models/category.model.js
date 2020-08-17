const db = require('../utils/db');
const TBL_CATE = 'categories';
const TBL_DETAIL_CAT = 'detail_categories'

module.exports = {
    all: () => {
        return db.load(`select * from ${TBL_CATE}`);
    },
    single: (id) => {
        return db.load(`select * from ${TBL_CATE} where catID= "${id}" `);
    },
    allByCatID: () => {
        return db.load(`select ct.catID,ct.catName,dt.catID,dt.catName as subCatName,dt.detailID
                        from ${TBL_CATE} ct join ${TBL_DETAIL_CAT} dt
                            on ct.catID=dt.catID
                            order by ct.catID`);
    },
    singleDetailCate: (id) => {
        return db.load(`select ct.catID,ct.catName,dt.catID,dt.catName as subCatName,dt.detailID
                    from ${TBL_CATE} ct join ${TBL_DETAIL_CAT} dt
                    on ct.catID=dt.catID
                    where detailID= "${id}" `);
    },
    singleDetailCateAndCate: (id) => {
        return db.load(`select ct.catID,ct.catName,dt.catID,dt.catName as subCatName,dt.detailID
             from ${TBL_DETAIL_CAT} ${TBL_DETAIL_CAT} dt where detailID= "${id}" `);
    },
    singleByUsername: (catname) => {
        return db.load(`select*from ${TBL_CATE} where catName=N"${catname}"`);
    },
    allDetailCate: () => {
        return db.load(`select * from ${TBL_DETAIL_CAT}`);
    },
    patch: (entity) => {
        const condition = {
            catID: entity.detailID
        }
        delete entity.catID;
        return db.patch(TBL_DETAIL_CAT, entity, condition);
    },
    add: (entity) => {
        return db.add(TBL_DETAIL_CAT, entity);
    },
    del: function(id) {
        const condition = {
            catID: id
        }
        return db.del(TBL_CATE, condition);
    }

}