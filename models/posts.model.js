const db = require('../utils/db');
const TBL_POSTS = 'posts';
const TBL_CATE = 'categories';
const TBL_DETAIL = 'detail_categories';

module.exports = {
    all: () => {
        return db.load(`select * from ${TBL_POSTS}`);
    },
    single: (id) => {
        return db.load(`select * from ${TBL_POSTS} where postsID="${id}"`);
    },
    getTopView: (top) => {
        return db.load(`select p.postsID,p.title,dt.detailID,dt.catName,p.small_avatar,p.views, p.date
                from ${TBL_POSTS} p,${TBL_DETAIL} dt
                WHERE p.catID=dt.detailID order by views DESC LIMIT 0,${top}`);
    },
    getRandomPosts: (cate, top) => {
        return db.load(`select p.postsID,p.title,dt.detailID,dt.catName,p.small_avatar,p.views, p.date
                from ${TBL_POSTS} p,${TBL_DETAIL} dt
                WHERE p.catID=dt.detailID and p.catID = "${cate}" LIMIT 0,${top}`);
    },
    topWeek(top) {
        return db.load(`select p.postsID,p.title,dt.detailID,dt.catName,p.small_avatar,p.views ,p.date
        from ${TBL_POSTS} p,${TBL_DETAIL} dt
        WHERE p.catID=dt.detailID order by views DESC LIMIT 0,${top}`);
    },
    newpost(top) {
        return db.load(`select  p.postsID,p.title,dt.detailID,dt.catName,p.small_avatar,p.views, p.date
        from ${TBL_POSTS} p,${TBL_DETAIL} dt
        WHERE p.catID=dt.detailID order by date DESC LIMIT ${top}`);
    },
    posts_of_each_categories() {
        return db.load(`SELECT * FROM posts p JOIN detail_categories dt on dt.detailID=p.catID
            where p.postsID = (SELECT p1.postsID
            FROM  detail_categories c join posts p1 
            on c.catID=p1.catID
           WHERE p1.catID=p.catID
           order by VIEWS DESC
           LIMIT 0,1)`);
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
    },
}