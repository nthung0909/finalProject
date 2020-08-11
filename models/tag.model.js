const db = require('../utils/db');
const TBL_TAG = 'tags';

module.exports = {
    allByPostID: (id) => {
        return db.load(`select * from ${TBL_TAG} where postID=${id}`);
    }
}