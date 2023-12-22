const Parking = require('../model/parking');

exports.addForm = (req, res) => {
    const userName = req.session.userName;
    res.render('addForm.ejs', { userName, message: '' })
}

exports.addFormDataCatch = (req, res) => {
    const userName = req.session.userName;
    const { vno, vtype } = req.body
    const record = new Parking({
        vno: vno,
        vtype: vtype,
    })
    record.save()
    res.render('addForm.ejs', { userName, message: 'Successfuly Added' })
}

exports.selection = async (req, res) => {
    const userName = req.session.userName;
    const Parked = await Parking.find({ status: 'Parked' })
    const record = await Parking.find().sort({ status: -1 })
    res.render('out.ejs', { userName, record, Parked })
}

exports.parkedStatusUpdate = async (req, res) => {
    const id = req.params.id
    let outTime = new Date()
    const record = await Parking.findById(id)
    let totalTimeSpend = (outTime - record.vin) / (1000 * 60 * 60)
    let amount = null;
    if (record.amount == '2w') {
        amount = totalTimeSpend * 30
    } else if (record.amount == '3w') {
        amount = totalTimeSpend * 50
    } else if (record.amount == '4w') {
        amount = totalTimeSpend * 80
    } else if (record.amount == 'hv') {
        amount = totalTimeSpend * 150
    } else if (record.amount == 'lv') {
        amount = totalTimeSpend * 120
    } else {
        amount = totalTimeSpend * 70
    }

    if (amount <= 20) {
        amount = 20
    }

    await Parking.findByIdAndUpdate(id, {
        vout: outTime,
        amount: Math.round(amount),
        status: 'OUT',
        totalTime: totalTimeSpend
    })
    res.redirect('/Out')
}

exports.deleteParkingDetails = async (req, res) => {
    const id = req.params.id
    await Parking.findByIdAndDelete(id)
    res.redirect('/Out')
}

exports.parkingDetailsReceipt = async (req, res) => {
    const id = req.params.id
    const record = await Parking.findById(id)
    res.render('parkingReceipt.ejs', { record })
}

exports.searchDataCatch = async (req, res) => {
    const { search } = req.body
    const userName = req.session.userName;
    const Parked = await Parking.find({ status: 'Parked' })
    const record = await Parking.find({ vno: search }).sort({ status: -1 })
    res.render('out.ejs', { userName, record, Parked })
}