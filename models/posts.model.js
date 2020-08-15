const db = require('../utils/db');
const TBL_POSTS = 'posts';
const TBL_CATE = 'categories';
const TBL_DETAIL = "detail_categories";
const TBL_DETAIL_STATUS = "detail_status";
const TBL_ACCOUNT = 'account';
const TBL_TAGS = 'tags';

module.exports = {
    all: () => {
        return db.load(`
         select * 
         from ${TBL_POSTS} p,${TBL_DETAIL} dt
         WHERE p.catID=dt.detailID order by p.postsID`);
    },
    allstatus: () => {
        return db.load(`
         select * from ${TBL_DETAIL_STATUS} `);

    },
    allcatID: () => {
        return db.load(`
         select * from ${TBL_DETAIL} `);

    },
    allfullname: () => {
        return db.load(`select * from ${TBL_ACCOUNT}  `);
    },
    single: (id) => {
        return db.load(`select * from ${TBL_POSTS} where postsID="${id}"`);
    },
    singlestatus: (id) => {
        return db.load(`select p.postsID,p.title,p.views,s.statusName,p.status,c.catName,p.catID,p.writer,p.approver, a.fullname, a.accID
                    from ${TBL_POSTS} p join ${TBL_DETAIL_STATUS}  s on  p.status= s.statusID join ${TBL_DETAIL} c on  
                     p.catID = c.catID  join ${TBL_ACCOUNT} a on p.writer = a.accID
                     where postsID="${id}"`);
    },
    singleapprover: (id) => {
        return db.load(`select  p.approver , a.fullname
                        from ${TBL_POSTS} p join ${TBL_ACCOUNT} a on  p.approver = a.accID
                        where postsID="${id}"`);
    },

    getTopView: (top) => {
        return db.load(`select p.postsID,p.title,p.sub_content,dt.detailID,dt.catName,p.small_avatar,
                        p.views, p.date,p.isVIP
                from ${TBL_POSTS} p,${TBL_DETAIL} dt
                WHERE p.catID=dt.detailID and p.status=1
                     order by views DESC LIMIT 0,${top}`);
    },
    getRandomPosts: (cate, top) => {
        return db.load(`select p.postsID,p.sub_content,p.title,dt.detailID,dt.catName,p.small_avatar,
                    p.views, p.date,p.isVIP
                from ${TBL_POSTS} p,${TBL_DETAIL} dt
                WHERE p.catID=dt.detailID and p.catID = "${cate}" 
                        and p.status=1 LIMIT 0,${top}`);
    },
    topWeek(top) {
        return db.load(`select p.postsID,p.sub_content,p.title,dt.detailID,dt.catName,p.small_avatar,
                    p.views ,p.date,p.isVIP
                from ${TBL_POSTS} p,${TBL_DETAIL} dt
                WHERE p.catID=dt.detailID and DATEDIFF(CURDATE(),p.date)<8 and p.status=1
                    order by p.views DESC LIMIT 0,${top}`);
    },
    newpost(top) {
        return db.load(`select  p.postsID,p.sub_content,p.title,dt.detailID,dt.catName,p.small_avatar,
                    p.views, p.date,p.isVIP
                    from ${TBL_POSTS} p,${TBL_DETAIL} dt
                    WHERE p.catID=dt.detailID and p.status=1 order by date DESC LIMIT ${top}`);
    },
    posts_of_each_categories() {
        return db.load(`SELECT p.postsID,p.title,p.small_avatar,p.sub_content,p.catID,p.date,
                    p.views,dt.catName,p.isVIP
            FROM ${TBL_POSTS} p JOIN ${TBL_DETAIL} dt on dt.detailID=p.catID and p.status=1 
            where p.postsID = (SELECT p1.postsID
                FROM  ${TBL_DETAIL} c join ${TBL_POSTS} p1 
                        on c.detailID=p1.catID
                WHERE p1.catID=p.catID and p.status=1 LIMIT 0,1)`);
    },
    pageByDetailCate: (catName, limit, offset) => {
        return db.load(`
         select p.postsID,p.sub_content,p.title,dt.detailID,dt.catName,p.small_avatar,p.views ,p.date,p.isVIP
         from ${TBL_POSTS} p,${TBL_DETAIL} dt
         WHERE p.catID=dt.detailID and dt.catName LIKE "${catName}"
                and p.status=1 order by p.isVIP DESC limit ${offset},${limit}
         `);
    },
    countByDetailCate: (catName) => {
        return db.load(`
         select count(*) as total
         from ${TBL_POSTS} p,${TBL_DETAIL} dt
         WHERE p.catID=dt.detailID and dt.catName LIKE "${catName}"
                and p.status=1
         `);
    },
    pageByTag: (tag, limit, offset) => {
        return db.load(`
         select p.postsID,p.sub_content,p.title,dt.detailID,dt.catName,p.small_avatar,p.views ,p.date ,p.isVIP
         from ${TBL_POSTS} p,${TBL_DETAIL} dt,${TBL_TAGS} t
         WHERE p.catID=dt.detailID and t.postID=p.postsID and t.tagID="${tag}" and p.status=1 
                order by p.isVIP DESC limit ${offset},${limit}
         `);
    },
    countByTag: (tag) => {
        return db.load(`
         select count(*) as total
         from ${TBL_POSTS} p,${TBL_DETAIL} dt,${TBL_TAGS} t
         WHERE p.catID=dt.detailID and t.postID=p.postsID and t.tagID="${tag}" and p.status=1 
            order by p.isVIP DESC
         `);
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
    del: function(id) {
        console.log(id);
        const condition = {
            postsID: id
        }
        console.log(condition);
        return db.del(TBL_POSTS, condition);
    }
}