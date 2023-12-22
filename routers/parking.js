const Router = require('express').Router();
const validation = require('../helper/validation');
const RegC = require('../controllers/regcontroller');
const ParkingC = require('../controllers/parkingcontroller');

Router.get('/',RegC.loginPage)
Router.post('/',RegC.loginPageDataCatch)
Router.get('/dashboard',validation,RegC.dashboardPage)
Router.post('/dashboard',RegC.newPass)
Router.get('/logOut',RegC.dashboardPageLogOut)

Router.get('/add',validation,ParkingC.addForm)
Router.post('/add',ParkingC.addFormDataCatch)
Router.get('/Out',validation,ParkingC.selection)
Router.post('/Out',ParkingC.searchDataCatch)
Router.get('/parkedStatusUpdate/:id',ParkingC.parkedStatusUpdate)
Router.get('/delete/:id',ParkingC.deleteParkingDetails)
Router.get('/receipt/:id',ParkingC.parkingDetailsReceipt)

module.exports = Router