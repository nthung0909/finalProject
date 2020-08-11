const db = require('../utils/db');
const TBL_TAGS = 'tags';
const TBL_POSTS = 'posts';

module.exports ={
    all: () => {
        return db.load(`select * from ${TBL_TAGS} `);
    },
    singlebyPostID:(postsID)=>{
        return db.load(`select t.tagID ,t.postID
                        from ${TBL_TAGS} t join ${TBL_POSTS} p on t.postID = p.postsID
                        where t.postID ="${postsID}" `);
    },

}       