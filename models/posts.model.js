const db = require('../utils/db');
const TBL_POSTS = 'posts';
const TBL_CATE = 'categories';
const TBL_DETAIL_CATE='detail_categories'
const TBL_DETAIL='detail_status';
const TBL_ACCOUNT='account';


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
        return db.load(`select*from ${TBL_POSTS} where postsID="${id}"`);
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
            postsID: entity.postsID
        }
        delete entity.postsID;
        return db.patch(TBL_POSTS, entity, condition);
    },
    add: (entity) => {
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
}