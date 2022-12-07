module.exports.firstAPI= function(req, res){
    return res.send(200, {
        message: 'first api'
    })
}