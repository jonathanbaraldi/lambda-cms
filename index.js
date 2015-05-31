// dependencias
var AWS = require('aws-sdk');
var util = require('util');
var async = require('async');

var s3 = new AWS.S3();

/* ========================== */
exports.handler = function(event, context) {
    // Lendo opcoes do evento.
    console.log("Evento:\n", util.inspect(event, {depth: 5}));

    var json = event;
    
    var arquivo = JSON.stringify(json);

    async.waterfall([
    
        function upload(callback) {
            var params = {
                Bucket: 'lambda-cms',
                Key: 'json/posts.json',
                ACL: 'public-read',
                Body: arquivo
            };

            s3.putObject(params, function(err, data) {
                    if (err) {
                        console.log(err)
                        callback(err, null);    
                    } else {
                        console.log("SUCESSO");
                        console.log(data);
                        callback(null, 'Terminado');    
                    }
                }
            );

        }], function (err, result) {
            
            if (err) {
                console.error(err);
                context.succeed(err);
            } else {
                console.log('Tudo certo');
                context.succeed('Sucesso');
            }
            
    });

}