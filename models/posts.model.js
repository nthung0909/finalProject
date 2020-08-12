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
        return db.load(`select p.postsID,p.title,p.sub_content,dt.detailID,dt.catName,p.small_avatar,p.views, p.date
                from ${TBL_POSTS} p,${TBL_DETAIL} dt
                WHERE p.catID=dt.detailID order by views DESC LIMIT 0,${top}`);
    },
    getRandomPosts: (cate, top) => {
        return db.load(`select p.postsID,p.sub_content,p.title,dt.detailID,dt.catName,p.small_avatar,p.views, p.date
                from ${TBL_POSTS} p,${TBL_DETAIL} dt
                WHERE p.catID=dt.detailID and p.catID = "${cate}" LIMIT 0,${top}`);
    },
    topWeek(top) {
        return db.load(`select p.postsID,p.sub_content,p.title,dt.detailID,dt.catName,p.small_avatar,p.views ,p.date
        from ${TBL_POSTS} p,${TBL_DETAIL} dt
        WHERE p.catID=dt.detailID and DATEDIFF(CURDATE(),p.date)<8 order by views DESC LIMIT 0,${top}`);
    },
    newpost(top) {
        return db.load(`select  p.postsID,p.sub_content,p.title,dt.detailID,dt.catName,p.small_avatar,p.views, p.date
        from ${TBL_POSTS} p,${TBL_DETAIL} dt
        WHERE p.catID=dt.detailID order by date DESC LIMIT ${top}`);
    },
    posts_of_each_categories() {
        return db.load(`SELECT p.postsID,p.title,p.content,p.small_avatar,p.sub_content,p.catID,p.date,p.views,dt.catName
            FROM ${TBL_POSTS} p JOIN ${TBL_DETAIL} dt on dt.detailID=p.catID
            where p.postsID = (SELECT p1.postsID
                FROM  ${TBL_DETAIL} c join ${TBL_POSTS} p1 
                        on c.catID=p1.catID
                WHERE p1.catID=p.catID LIMIT 0,1)`);
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