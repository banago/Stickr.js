/*
 *  Stickr.js - v1.0.0
 *  Contained Sticky Scrolling jQuery Plugin.
 *  http://banago.github.io/Stickr.js/
 *
 *  @author Baki Goxhaj
 *  @license MIT License
 */
!function(t,o){"use strict";function e(o,e){this.element=o,this.settings=t.extend({},i,e),this._defaults=i,this._name=s,this.init()}var s="stickr",i={easing:"swing",duration:300,closeButton:!1,closeChar:"ⓧ",closeTop:0,closeRight:0,closest:null,offsetTop:0,offsetBottom:0,queue:!1};t.extend(e.prototype,{init:function(){var e=this.settings,s=t(this.element),i=s.prop("id").replace("-","")||"stickr",n=e.closest?s.closest(e.closest):s.parent(),c=s.offset().top-n.offset().top-e.offsetTop;s.css("position","relative"),e.closeButton===!0&&(s.append('<a class="close">'+e.closeChar+"</a>"),s.find(".close").css({position:"absolute",top:e.closeTop+"px",right:e.closeTop+"px"}),s.find(".close").on("click",function(){s.animate({top:"0px"},{queue:e.queue,easing:e.easing,duration:e.duration}),t(o).off("scroll."+i),t(this).remove()})),t(o).on("scroll."+i,function(){t(o).scrollTop()>n.offset().top+c&&n.height()+n.position().top+e.offsetBottom>t(o).scrollTop()+s.height()?0===e.duration?s.css("top",t(o).scrollTop()-(n.offset().top+c)+"px"):s.animate({top:t(o).scrollTop()-(n.offset().top+c)+"px"},{queue:e.queue,easing:e.easing,duration:e.duration}):t(o).scrollTop()<n.offset().top&&s.animate({top:"0px"},{queue:e.queue,easing:e.easing,duration:e.duration})})}}),t.fn[s]=function(o){return this.each(function(){t.data(this,"plugin_"+s)||t.data(this,"plugin_"+s,new e(this,o))})}}(jQuery,window,document);