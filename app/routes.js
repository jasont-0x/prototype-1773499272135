const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/benefits-received', function (req, res) {
  res.render('benefits-received')
})

router.post('/benefits-received', function (req, res) {
  const answer = req.session.data['benefits-received']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'benefits-received': 'Select yes if you receive any of these benefits.' }
    return res.render('benefits-received')
  }
  if (answer === 'yes') {
    return res.redirect('/child-age')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-benefits-received')
  }
  res.redirect('/child-age')
})

router.get('/ineligible-benefits-received', function (req, res) {
  res.render('ineligible-benefits-received')
})

router.get('/child-age', function (req, res) {
  res.render('child-age')
})

router.post('/child-age', function (req, res) {
  const answer = req.session.data['child-age']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'child-age': 'Select yes if your child is in reception to year 11.' }
    return res.render('child-age')
  }
  if (answer === 'yes') {
    return res.redirect('/parent-name')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-child-age')
  }
  res.redirect('/parent-name')
})

router.get('/ineligible-child-age', function (req, res) {
  res.render('ineligible-child-age')
})

router.get('/parent-name', function (req, res) {
  res.render('parent-name')
})

router.post('/parent-name', function (req, res) {
  const answer = req.session.data['parent-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'parent-name': 'Enter your full name.' }
    return res.render('parent-name')
  }
  res.redirect('/national-insurance-number')
})

router.get('/national-insurance-number', function (req, res) {
  res.render('national-insurance-number')
})

router.post('/national-insurance-number', function (req, res) {
  const answer = req.session.data['national-insurance-number']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'national-insurance-number': 'Enter your National Insurance number.' }
    return res.render('national-insurance-number')
  }
  res.redirect('/child-details')
})

router.get('/child-details', function (req, res) {
  res.render('child-details')
})

router.post('/child-details', function (req, res) {
  const answer = req.session.data['child-details']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'child-details': 'Enter your child\'s full name.' }
    return res.render('child-details')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FSM')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
