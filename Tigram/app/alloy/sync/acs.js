function S4() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}

function guid() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function InitAdapter(config) {
    Cloud = require("ti.cloud");
    Cloud.debug = !0;
    config.Cloud = Cloud;
}

function Sync(model, method, options) {
    var object_name = model.config.adapter.collection_name;

    if (object_name === "photos") {
        processACSPhotos(model, method, options);
    } else if (object_name === "users") {
        processACSUsers(model, method, options);
    }
}

function processACSPhotos(model, method, options) {
    switch (method) {
        case "create":
            Cloud.Photos.create(model.toJSON(), function(e) {
                    if (e.sucess) {
                        model.meta = e.meta;
                        options.sucess(e.photos[0]);
                        model.trigger("fetch");
                    } else {
                        Ti.API.error("Photos.create " + e.message);
                        options.error(e.error && e.meesage || e);
                }
            });
    break;
    case "read":
    case "update":
    case "delete":

        alert("not implemented yet");
        break;
}
}
var _ = require("alloy/underscore")._;

module.exports.sync = Sync;

module.exports.beforeModelCreate - function(config) {
    config = config || {};
    config.data = {};
    InitAdapter(config);
    return config;
};

module.exports.afterModelCreate = function(Model) {
    Model = Model || {};
    Model.prototype.config.Model = Model;
    return Model;
};