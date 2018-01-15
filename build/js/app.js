require('../sass/main.scss');

var appear = require('./appear');
import { TweenLite, TimelineMax } from 'gsap';

// Main App View
const AppView = Backbone.View.extend({

  events: {
  },

  draw: function(pos) {

    var that = this;

    var size = 55;

    if ($(window).width() <= 1000) size = 90;

    $('.ball').css({
      'left': pos.x,
      'top': pos.y
    });

    this.$el.find('#balls').addClass('start');

    var fctl = new TimelineMax({
      repeat: 0,
      yoyo: false,
      onComplete: function() {

        that.$el.find('#balls').addClass('done');
        TweenLite.to("#circle", 1.33, {attr: {r: size+'vw'}, ease: Power1.easeOut});
      }
    });


    var circlePos = $('#circle').offset();
    var vw = $(window).width() / 100;
    var vh = $(window).height() / 100;

    var ballR = 10;
    var x = circlePos.left - pos.x - ballR;
    var y = circlePos.top - pos.y - ballR;

    var fcbezier_path = [{ x: 0, y: 90 }, { x: 14*vw, y: -30*vh }, { x: 0, y: 30*vh }, { x: x, y: y }];

    fctl.staggerTo($('#balls .ball'), 1.33, { bezier: {
      type: 'thru',
      values: fcbezier_path,
      curviness: 1.2
    }, ease: Power1.easeIn, delay: 1.33 }, 0.004);

  },

  getDot: function() {

    var hi = this.$el.find('#hi');
    var hiPos = hi.offset();
    var dotPos = $(hi.get(0).contentDocument.getElementById("dot")).offset();

    return {
      x: hiPos.left + dotPos.left,
      y: hiPos.top + dotPos.top - 40
    }
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      if ($(window).width() <= 1000) that.$el.find('#home').height($(window).height());

      // LOAD SHIT
      return true;
    })
    .delay(700)
    .then(function() {

      return that.getDot();
    })
    .then(function(pos) {

      that.$el.find('#home').addClass('ready');
      return pos;
    })
    .delay(2500)
    .then(function(pos) {

      return that.draw(pos);
    })
    .catch(function(err) {

      console.log(err);
    })

  },

});

// Init Main View
const App = new AppView({ el: 'body' });
App.render();
