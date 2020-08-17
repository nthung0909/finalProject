const db = require('../utils/db');
const TBL_TAGS = 'tags';
const TBL_POSTS = 'posts';

module.exports = {
    all: () => {
        return db.load(`select * from ${TBL_TAGS} `);
    },
    singlebyPostID: (postsID) => {
        return db.load(`select t.tagID ,t.postID
                        from ${TBL_TAGS} t join ${TBL_POSTS} p on t.postID = p.postsID
                        where t.postID ="${postsID}" `);
    },
    allByPostID: (id) => {
        return db.load(`select * from ${TBL_TAGS} where postID=${id}`);
    },
    addtag: (entity) => {
        return db.add(TBL_TAGS, entity);
    },
    removetag: function(tag, posts) {
        const condition = {
            tagID: tag,
            postID: posts
        }
        return db.del(TBL_TAGS, condition);
    }
}