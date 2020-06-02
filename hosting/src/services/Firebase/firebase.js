import app from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/performance'
import 'firebase/storage'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
}

class Firebase {
  constructor() {
    app.initializeApp(config)

    /* Firebase APIs */
    this.analytics = app.analytics()
    this.auth = app.auth()
    // this.database = app.database()
    this.firestore = app.firestore()
    this.functions = app.functions()
    this.performance = app.performance()
    this.storage = app.storage()

    /* Helper */
    this.fieldValue = app.firestore.FieldValue
    this.emailAuthProvider = app.auth.EmailAuthProvider

    /* Social Sign In Method Provider */
    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()
    this.twitterProvider = new app.auth.TwitterAuthProvider()
  }

  // *** Analytics API ***

  doLogAnalyticsEvent = (eventName, eventParams, options) =>
    this.analytics.logEvent(eventName, eventParams, options)

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider)

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider)

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    })

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password)

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data()

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {}
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            }

            next(authUser)
          })
      } else {
        fallback()
      }
    })

  // *** User API ***

  user = uid => this.firestore.doc(`users/${uid}`)

  users = () => this.firestore.collection('users')

  // *** Message API ***

  message = uid => this.firestore.doc(`messages/${uid}`)

  messages = () => this.firestore.collection('messages')

  // *** Orders API ***

  order = oid => this.firestore.doc(`orders/${oid}`)

  orders = () => this.firestore.collection('orders')
}

export default Firebase
