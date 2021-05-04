
const LocalStrategy = require('passport-local').Strategy


function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = (email, password, done) => {
      
    const user = getUserByEmail(email)
    console.log(user)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
   

    try {
      if (password === user.password) {
        console.log(`${password} === ${user.password}`)
        console.log("success")
        console.dir(user)
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize




