
const get = (server, route, controller) => {
    let req = server[0];
    if(req.method !== "GET") return false;
    return handle(server, route, controller);
}

const post = (server, route, controller) => {
    let req = server[0];
    if(req.method !== "POST") return false;
    return handle(server, route, controller);
}

const handle = (server, route, controller) => {
    let [req, res] = server;
    let method = req.url.split('/')[2];
    if(req.url !== route) return false;
    res.writeHead(200, {"content-type":"application/json"});
    try {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            body = body ? JSON.parse(body) : null;
            res.write(controller[method](body));
            return res.end();
        });
    } catch (err) {
        res.write("ERROR:: " + err.message);
    }
}

module.exports = {get, post, handle};