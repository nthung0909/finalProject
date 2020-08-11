const db = require('../utils/db');
const TBL_WRT = 'writer';
const TBL_ACC = 'account'

module.exports = {
    all: () => {
        return db.load(`select * from ${TBL_ACC} where type=2 order by accID`);
    },
    single: (id) => {
        return db.load(`select ac.accID,ac.fullname,ac.username,ac.avatar,ac.password,ac.email,ac.type,wr.alias as alias
                        from ${TBL_ACC} ac,${TBL_WRT} wr 
                        where wr.accID=ac.accID and ac.accID="${id}"`);
    },
    patch: (entity) => {
        const condition = {
            accID: entity.accID
        }
        delete entity.accID;
        return db.patch(TBL_ACC, entity, condition);
    },
    add: (entity) => {
        return db.add(TBL_ACC, entity);
    },
    del: function(id) {
        console.log(id);
        const condition = {
            accID: id
        }
        console.log(condition);
        return db.del(TBL_ACC, condition);
    }

}