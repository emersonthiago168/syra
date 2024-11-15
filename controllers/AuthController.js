const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login');
    }

    static async loginPost(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            req.flash('message', 'Usuário não encontrado!');
            res.render('auth/login');

            return;
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            req.flash('message', 'Senha inválida!');
            res.render('auth/login');

            return;
        }

        req.session.userid = user.id
        req.session.save(() => {
            res.redirect('/syra/musicas');
        })
    }

    static register(req, res) {
        res.render('auth/register');
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        // password match validation 
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!');
            res.render('auth/register');

            return;
        }

        // check if user exists
        const checkIfUserExists = await User.findOne({ where: { email: email } });

        if (checkIfUserExists) {
            req.flash('message', 'O e-mail já está em uso!');
            res.render('auth/register');

            return;
        }

        // create a password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            // initialize session
            req.session.userid = createdUser.id

            req.session.save(() => {
                res.redirect('/syra/musicas');
            })
        } catch (error) {
            console.log(error)
        }
    };

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/login')
    }

    static showProfile(req, res) {
        res.render('auth/perfil');
    }
}