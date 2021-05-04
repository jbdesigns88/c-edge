if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    }
    
    const express = require('express')
    const app = express()
    const path = require('path')
  
    const passport = require('passport')
    const flash = require('express-flash')
    const session = require('express-session')
    const methodOverride = require('method-override')
    
    const initializePassport = require('./passport-config')
    initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )
    
    const users = []
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname , './src/views'));
    
    app.use(express.urlencoded({ extended: false }))
    app.use(flash())

    app.use(express.static(__dirname + '/src'));
    app.use(session({
        secret: 'secrettexthere',
        saveUninitialized: true,
        resave: true,
   
      }));
      
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(methodOverride('_method'))
    
    app.get('/', checkAuthenticated, (req, res) => {
    
      res.render('app', { name: req.user.name,template:'chart' })
    })
    
    app.get('/login', checkNotAuthenticated, (req, res) => {
        res.render('app', {   name:null,template:'login' })
    //   res.render('login.ejs')
    })
    
    app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
    }))
    
    app.get('/register', checkNotAuthenticated, (req, res) => {
        res.render('app', {   name:null,template:'register' })
    })
    
    app.post('/register', checkNotAuthenticated, (req, res) => {
    try {
    
    users.push({
      id: Date.now().toString(),
      name: req.body.fullname,
      email: req.body.email,
      password: req.body.password
    })
    res.redirect('/login')
    } catch {
    res.redirect('/register')
    }
    })
    
    app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
    })
    
    function checkAuthenticated(req, res, next) {
        
    if (req.isAuthenticated()) {
       return next()
    }
    
    res.redirect('/login')
    }
    
    function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
    return res.redirect('/')
    }
    next()
    }
    
    app.listen(process.env.PORT || 3000)
    
    