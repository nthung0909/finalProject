const db = require('../utils/db');
const TBL_POSTS = 'posts';
const TBL_CATE = 'categories';

module.exports = {
    all: () => {
        return db.load(`select * from ${TBL_POSTS}`);
    },
    single: (id) => {
        return db.load(`select*from ${TBL_POSTS} where postsID="${id}"`);
    },
    getTopView: (top) => {
        return db.load(`select p.postsID,p.title,c.catID,c.catName,p.small_avatar,p.views 
                        from ${TBL_POSTS} p,${TBL_CATE} c 
                        WHERE p.catID=c.catID order by views DESC LIMIT ${top}`);
    },
    topWeek(top) {
        return db.load(`select p.postsID,p.title,c.catID,c.catName,p.small_avatar,p.views 
        from ${TBL_POSTS} p,${TBL_CATE} c 
        WHERE p.catID=c.catID order by views DESC LIMIT ${top}`);
    },
    newpost(top) {
        return db.load(`select p.postsID,p.title,c.catID,c.catName,p.small_avatar,p.views 
        from ${TBL_POSTS} p,${TBL_CATE} c 
        WHERE p.catID=c.catID order by date DESC LIMIT ${top}`);
    },
    patch: (entity) => {
        const condition = {
            accID: entity.accID
        }
        delete entity.accID;
        return db.patch(TBL_CATE, entity, condition);
    },
    add: (entity) => {
        return db.add(TBL_CATE, entity);
    }
}