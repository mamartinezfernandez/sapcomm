/* Controller APP based in express */

/* Imports*/
const cf = require('../config/cf.json');
const cmis = require('cmis');
const AuthUAA = require('../controllers/auth-xsuaa');

/* Global variables */
const cmis_session_url = cf.cmis_session_url;
const cmis_repo = cf.cmis_repo;
const id_repo = cf.id_repo;

/* :Read Repository --root
*/
function getRepoRootContent(req, res) {

    var cmis_query_folders_repo = 'SELECT cmis:name as name, cmis:objectId as objectId,cmis:objectTypeId as type FROM cmis:folder WHERE cmis:parentId = ' + '\'' + cmis_repo + '\'';
    var cmis_query_documents_repo = 'SELECT cmis:name as name, cmis:objectId as objectId, cmis:objectTypeId as type FROM cmis:document WHERE  ANY sap:parentIds IN (' + '\'' + cmis_repo + '\'' + ')';

    let session = new cmis.CmisSession(cmis_session_url);

    let getTokenData = new Promise((resolve, reject) => {
        const authUAA = new AuthUAA();
        var token = authUAA.getToken();
        resolve(token);
    });

    getTokenData.then((cmis_token) => {

        session.setToken(cmis_token).loadRepositories().then(function () {

            let q1 = session.query(cmis_query_folders_repo);
            let q2 = session.query(cmis_query_documents_repo);

            Promise.all([q1, q2]).then(responses => {

                var folders = [];
                var files = [];

                responses.forEach(response => {

                    for (var i = 0; i < response.results.length; i++) {

                        let record_name = response.results[i].succinctProperties.name;
                        let record_objectId = response.results[i].succinctProperties.objectId;
                        let record_type = response.results[i].succinctProperties.type;

                        if (record_type == 'cmis:folder') {
                            folders.push({ id: record_objectId, name: record_name})
                        }
                        else {
                            files.push({ id: record_objectId, name: record_name })
                        }
                    }
                })
                var respJson = ({
                    "response": {
                        "folders": folders,
                        "files": files
                    }
                });
                res.send(respJson);

            }).catch(function (error) {
                var respJsonExcep = ({
                    "response": {
                        "code": 'error',
                        "message": "Bad request. Check the request and if problem persists contact with app administrator.",
                    }
                });
                res.send(respJsonExcep);
            });
        });
    });
}

module.exports = { getRepoRootContent };