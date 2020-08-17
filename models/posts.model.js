const db = require('../utils/db');
const TBL_POSTS = 'posts';
const TBL_CATE = 'categories';
const TBL_DETAIL = "detail_categories";
const TBL_DETAIL_STATUS = "detail_status";
const TBL_ACCOUNT = 'account';
const TBL_TAGS = 'tags';
const TBL_APR_CATE = 'approver_cate';

module.exports = {
    all: () => {
        return db.load(`
         select p.postsID,p.title,p.sub_content,p.catID,dt.catName,p.small_avatar,p.writer,p.approver,
         p.date,p.views,p.status,p.isVIP,ac1.fullname as writername
         from ${TBL_POSTS} p,${TBL_DETAIL} dt,account ac1
         WHERE p.catID=dt.detailID and ac1.accID=p.writer 
         order by p.postsID`);
    },
    allApproverCateByAccID: (accID) => {
        return db.load(`select * from ${TBL_APR_CATE} where accID="${accID}"`);
    },
    allOfWriter: (accID) => {
        return db.load(`
        select p.postsID,p.title,p.sub_content,p.catID,dt.catName,p.small_avatar,p.writer,p.approver,
        p.date,p.views,p.status,p.isVIP,ac1.fullname as writername
        from ${TBL_POSTS} p,${TBL_DETAIL} dt,${TBL_ACCOUNT} ac1
        WHERE p.catID=dt.detailID and ac1.accID=p.writer and p.writer="${accID}"
        order by p.status ASC`);
    },
    allOfApprover: (accID) => {
        return db.load(`
        select p.postsID,p.title,p.sub_content,p.catID,dt.catName,p.small_avatar,p.writer,p.approver,
        p.date,p.views,p.status,p.isVIP,ac1.fullname as writername
        from ${TBL_POSTS} p,${TBL_DETAIL} dt,${TBL_ACCOUNT} ac1
        WHERE p.catID=dt.detailID and ac1.accID=p.writer
        and EXISTS (
            select * from ${TBL_APR_CATE} apc 
            WHERE apc.accID="${accID}" and apc.cateID=p.catID)
        order by p.status ASC`);
    },
    allstatus: () => {
        return db.load(`
         select * from ${TBL_DETAIL_STATUS} `);
    },
    single: (id) => {
        return db.load(`select * from ${TBL_POSTS} where postsID="${id}"`);
    },
    singlePostsWithAccount: (id) => {
        return db.load(`select p.postsID,p.content,p.title,p.views,p.status,dt.catName,p.catID,p.writer,
                p.approver,p.date,p.isVIP,p.sub_content,ac1.fullname as writername
        from ${TBL_POSTS} p join ${TBL_DETAIL} dt on dt.detailID=p.catID
              join ${TBL_ACCOUNT} ac1 on ac1.accID=p.writer
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
    approvePosts: (id, ap) => {
        return db.load(`update posts
                    set status=1, approver="${ap}"
                    where postsID="${id}"`);
    },
    denyPosts: (id, ap) => {
        return db.load(`update posts
                    set status=2,approver="${ap}"
                    where postsID="${id}"`);
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
        return db.del(TBL_POSTS, condition);
    }
}