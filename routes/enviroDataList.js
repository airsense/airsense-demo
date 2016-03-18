var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function EnviroDataList(enviroData) {
  this.enviroData = enviroData;
}

module.exports = EnviroDataList;

EnviroDataList.prototype = {
    showData: function (req, res) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.deleted=@deleted',
            parameters: [{
                name: '@deleted',
                value: false
            }]
        };

        self.enviroData.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
            console.log("size: "+Object.keys(items).length);
            res.render('index', {
                title: 'Real Time Air Quality Data',
                dataset: items
            });
        });
    },

    addData: function (req, res) {
        var self = this;
        var item = req.query;
        console.log(item);
        self.enviroData.addItem(item, function (err) {
            if (err) {
                throw (err);
            }

            res.redirect('/');
        });
    },

    deleteData: function (req, res) {
        var self = this;
        var deletedData = Object.keys(req.body);

        async.forEach(deletedData, function dataIterator(deletedData, callback) {
            self.enviroData.updateItem(deletedData, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }, function goHome(err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
    }
};
