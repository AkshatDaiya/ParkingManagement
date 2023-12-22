const Reg = require('../model/reg');

exports.loginPage = (req, res) => {
    res.render('login.ejs', { message: '' })
}

exports.loginPageDataCatch = async (req, res) => {
    const { name, pass } = req.body
    const record = await Reg.findOne({ user: name })
    if (record !== null) {
        if (record.pass === pass) {
            req.session.userName = name
            req.session.isAuth = true
            res.redirect('/dashboard')
        } else {
            res.render('login.ejs', { message: 'Wrong Credentails' })
        }
    } else {
        res.render('login.ejs', { message: 'Wrong Credentails' })
    }
}

exports.dashboardPage = (req, res) => {
    const userName = req.session.userName
    res.render('dashboard.ejs', { userName, message: '' })
}

exports.dashboardPageLogOut = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

exports.newPass = async (req, res) => {
    const { nPass } = req.body
    const record = await Reg.findOne({ user: "Akshat" })
    const id = record.id
    await Reg.findByIdAndUpdate(id, {
        pass: nPass
    })
    const userName = req.session.userName
    res.render('dashboard.ejs', { userName, message: 'Password Update Successfully' })
}