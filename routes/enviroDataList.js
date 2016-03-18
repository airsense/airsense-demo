var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function EnviroDataList(enviroData) {
  this.enviroData = enviroData;
}

module.exports = EnviroDataList;

EnviroDataList.prototype = {
    showData: function (req, res) {
        var self = this;
        var currDate = new Date();

        var hourAgoDate = new Date();
        hourAgoDate.setHours(hourAgoDate.getHours() - 1);
        // var checktime = hourAgoDate.getMilliseconds();
        console.log(hourAgoDate);
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.sub=@sub',
            parameters: [{
                name: '@sub',
                value: "dc"
            }]
        };

        self.enviroData.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
            // console.log(items);
            console.log("size: "+Object.keys(items).length);

            items.sort(function(a,b) {
              return b.date - a.date;
            });
            for (i = 0; i < Object.keys(items).length; i++) {
              items[i].lat = items[i].lat/10000;
              items[i].lng = items[i].lng/10000;
              var datetime = new Date(items[i].date);
              items[i].date = datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds();
            }
            var new_items = items.slice(0,50);

            res.render('index', {
                title: 'DC Library Air Quality Data',
                dataset: new_items
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
