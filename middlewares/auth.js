import tokenService from "../services/token";

export default {

    verify: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                msg: "No token"
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.role == "Administrador" || response.role == "Usuario") {
            next();
        } else {
            return res.status(403).send({
                msg: "No autorizado"
            })
        }
    },
    verifyAdmin: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                msg: "No token"
            });
        }
        const response = await tokenService.decode(req.headers.token);
        console.log(response);
        if (response.role == "Administrador") {
            next();
        } else {
            return res.status(403).send({
                msg: "No autorizado"
            })
        }
    },
    verifyUser: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                msg: "No token"
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.role == "Usuario") {
            next();
        } else {
            return res.status(403).send({
                msg: "No autorizado"
            })
        }
    }
}