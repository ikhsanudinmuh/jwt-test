const jwt = require('jsonwebtoken')
const route = require('express').Router()

let users = [
    {
        username: 'ikhsan',
        password: 'ikhsan',
        jurusan: 'informatika',
    },
    {
        username: 'udin',
        password: 'udin',
        jurusan: 'RPL',
    }
]

const checkToken = ((req, res, next) => {
    const token = req.headers.authorization
    if (token == null) return res.send({message: 'token tidak boleh kosong'})
    jwt.verify(token, 'rahasia', (err, decoded) => {
        if (err) return res.send(err)
        req.info = decoded
        next()
    })
})

route.post('/login', (req, res) => {
    const { username, password } = req.body
    const index = users.findIndex(r => r.username == username)

    if (index == -1) {
        res.send({message: 'username atau password salah!'})
    } else {
        const payload = {username: users[index].username, jurusan: users[index].jurusan}
        const token = jwt.sign(payload, 'rahasia')
        res.send({token: token})
    }
})

route.get('/success', checkToken, (req, res) => {
    res.send({data: req.info})
})

module.exports = route