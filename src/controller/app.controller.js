var appService = require('../service/app.resource');
const config = require("exp-config");

const dataHeader = 'Data-Endpoint';
const login = 'login';
const defaultPage = 'index';
const cookieName = 'loginToken';

const dataPathPrefix = '/data/';

module.exports.appView = (req, res) => {

    const dataUrl = req.header(dataHeader) || config.backend;
    view = req.params.view || defaultPage;
    console.log("Backend endpoint: " + dataUrl);
    if (typeof dataUrl !== 'undefined') {
        var dataUrlPath = dataUrl + dataPathPrefix + req.params.app + '/' + view;
        console.log("Backend endpoint modified: " + dataUrlPath);
        appService.getDataJson(dataUrlPath, view, req.cookies[cookieName]).then((response) => {
            // console.log(JSON.stringify(response.data.projects))

            return res.render("app/" + req.params.app + "/" + view, { layout: false, context: response.data.projects, static: config });
        }).catch((error) => {
            return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
        });
    } else {
        return res.render(folder + "/" + req.params.app + "/" + view, { layout: false, context: null, static: config });
    }
}

module.exports.loginView = (req, res) => {
    const ADMIN_BACKEND_PUBLIC = req.header(dataHeader);
    return res.render(login, { layout: false, admin: ADMIN_BACKEND_PUBLIC, static: config });
}

module.exports.errorView = (req, res) => {
    return res.render(req.params.error, { layout: false, static: config });
}

