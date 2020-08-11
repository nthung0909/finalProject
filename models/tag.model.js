const db = require('../utils/db');
<<<<<<< HEAD
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
=======
const TBL_TAG = 'tags';

module.exports = {
    allByPostID: (id) => {
        return db.load(`select * from ${TBL_TAG} where postID=${id}`);
    }
}
>>>>>>> 4fd8aa94e4d09078f1d7d89de3620ba6535b4f0e
