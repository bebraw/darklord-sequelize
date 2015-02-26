'use strict';

module.exports = function(model) {
    return {
        create: function(o) {
            console.log('create', o);
        },
        update: function(o) {
            console.log('update', o);
        },
        find: function(o) {
            console.log('find', o);
        },
        findOne: function(o) {
            console.log('findOne', o);
        },
        remove: function(o) {
            console.log('remove', o);
        },
    };
};
