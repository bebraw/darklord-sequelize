'use strict';

module.exports = function(model) {
    return {
        create: function(o) {
            return model.create(o);
        },
        update: function(o) {
            return model.update({
                where: {
                    id: o._id
                },
                values: o,
            });
        },
        find: function(o) {
            return model.findAll({
                where: o
            });
        },
        findOne: function(o) {
            o.id = o._id;
            delete o._id;

            return model.findOne({
                where: o
            });
        },
        remove: function(o) {
            o.id = o._id;
            delete o._id;

            return model.destroy({
                where: o
            });
        },
    };
};
