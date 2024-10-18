const User = require('../models/User');

module.exports = class SyraController {
    static async showSyra(req, res) {
        res.render('syra/home');
    }

    static async music(req,res){
        res.render('syra/music');
    }

    static async suporte(req, res) {
        res.render('syra/suporte');
    }

    static async obrigado(req, res) {
        res.render('syra/obrigado');
    }
}