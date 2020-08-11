const db = require('../utils/db');
const TBL_CMT = 'comments';

module.exports = {
    allByPostsID: (id) => {
        return db.load(`select distinct cmt.postID,cmt.accID,cmt.STT,cmt.date,cmt.content,ac.avatar, ac.fullname
                    from ${TBL_CMT} cmt, account ac
                    where cmt.accID=ac.accID and postID="${id}"`);
    },
    allByUserInPosts: (accID, postsID) => {
        return db.load(`select * from ${TBL_CMT}
                        where accID=${accID},postID=${postsID}`);
    },
    getViews: (id) => {
        return db.load(`select count(*) as comments from comments where postID=${id}`)
    },
    patch: (entity) => {
        const condition = {
            accID: entity.postID
        }
        delete entity.postID;
        return db.patch(TBL_CMT, entity, condition);
    }
}