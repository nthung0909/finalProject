const db = require('../utils/db');
const TBL_POSTS = 'posts';
const TBL_CATE = 'categories';
<<<<<<< HEAD
const TBL_DETAIL_CATE='detail_categories'
const TBL_DETAIL='detail_status';
const TBL_ACCOUNT='account';

=======
const TBL_DETAIL = 'detail_categories';
>>>>>>> 4fd8aa94e4d09078f1d7d89de3620ba6535b4f0e

module.exports = {
    all: () => {
        return db.load(`
         select * from ${TBL_POSTS} `);
         
    },
    allstatus: () => {
        return db.load(`
         select * from ${TBL_DETAIL} `);
         
    },
    allcatID: () => {
        return db.load(`
         select * from ${TBL_DETAIL_CATE} `);
         
    },
    allfullname: ()=>{
        return db.load(`select * from ${TBL_ACCOUNT}  `);
    },
    single: (id) => {
        return db.load(`select * from ${TBL_POSTS} where postsID="${id}"`);
    },
    singlestatus: (id) => {
        return db.load(`select p.postsID,p.title,p.views,s.statusName,p.status,c.catName,p.catID,p.writer,p.approver, a.fullname, a.accID
                    from ${TBL_POSTS} p join ${TBL_DETAIL}  s on  p.status= s.statusID join ${TBL_DETAIL_CATE} c on  
                     p.catID = c.catID  join ${TBL_ACCOUNT} a on p.writer = a.accID
                     where postsID="${id}"`);
    },
    singleapprover: (id)=>{
        return db.load(`select  p.approver , a.fullname
                        from ${TBL_POSTS} p join ${TBL_ACCOUNT} a on  p.approver = a.accID
                        where postsID="${id}"`);
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
            postsID: entity.postsID
        }
        delete entity.postsID;
        return db.patch(TBL_POSTS, entity, condition);
    },
    add: (entity) => {
<<<<<<< HEAD
        return db.add(TBL_POSTS, entity);
    },
    del: function(id){
        console.log(id);
        const condition ={
            postsID: id
        }
        console.log(condition); 
        return db.del(TBL_POSTS, condition);
    }
=======
        return db.add(TBL_CATE, entity);
    },
>>>>>>> 4fd8aa94e4d09078f1d7d89de3620ba6535b4f0e
}