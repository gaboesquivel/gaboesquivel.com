const jq = require('jquery')
global.jQuery = global.$ = jq
require('magnific-popup')
global.scrollspy = require('scrollspy')
require('owl.carousel')
require('./libs/jquery.stellar.min')
global.mixitup = require('mixitup')
global.WOW = require('wowjs')

require('./home')
require('./blog')
require('./nav')
