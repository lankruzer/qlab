$(document).ready(function() { // Ждём загрузки страницы
	/*
		mobile-menu
	*/

	var btn_menu = document.querySelector(".btn-menu"),
		header = document.querySelector("header"),
		nav = document.querySelector("nav");
		
	if(btn_menu) {
		btn_menu.addEventListener("click", function(event) {
			event.preventDefault();
			$(header).toggleClass("show-menu");
			$(nav).slideToggle(500);
		})
		
		window.addEventListener("scroll", function(event) {
			if(header.classList.contains("show-menu")) {
				$(header).removeClass("show-menu");
				$(nav).slideUp(500);
			}
		})
	}
	
	
	/*
		swimming-menu
	*/
	
	var offset = $('header').offset(),
		topPadding = 0,
		winWidth = window.innerWidth;

	$(window).resize(function() {
		winWidth = window.innerWidth;
		if(winWidth > 767)  {
			$(nav).css("display", "block");
		} else {
			$(nav).css("display", "none");
		}
	});
	
	function SwimmingMenu() {
		if($(window).scrollTop() > offset.top) {
			
			if(winWidth > 1199) {
				$('.screen-adv').stop().animate({marginTop: $("header").height() - 62}, 0);
			} else if(winWidth > 991) {
				$('.screen-adv').stop().animate({marginTop: $("header").height() - 32}, 0);
			} else if(winWidth > 767) {
				$('.screen-adv').stop().animate({marginTop: $("header").height() - 15}, 0);
			} else {
				$('.screen-adv').stop().animate({marginTop: $("header").height() - 38}, 0);
			}
			$('header').css("position", "fixed");
			$('header').addClass("fixed");
			$('header').css("top", "0px");
		}
		else {
			$('header').stop().animate({marginTop: 0}, 0);
			$('header').css("position", "static");
			$('header').removeClass("fixed");
			$('header').css("top", "0px");
			$('.screen-adv').stop().animate({marginTop: 0}, 0);
		}
	};
	
	SwimmingMenu();
	
	$(window).scroll(function() {
		SwimmingMenu();
	});
	

	/*
		DisableScroll
	*/
	
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = {37: 1, 38: 1, 39: 1, 40: 1};
	
		
	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
		  e.preventDefault();
	  e.returnValue = false;  
	}

	function preventDefaultForScrollKeys(e) {
		if (keys[e.keyCode]) {
			preventDefault(e);
			return false;
		}
	}

	function disableScroll() {
	  if (window.addEventListener) // older FF
		  window.addEventListener('DOMMouseScroll', preventDefault, false);
	  window.onwheel = preventDefault; // modern standard
	  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	  window.ontouchmove  = preventDefault; // mobile
	  document.onkeydown  = preventDefaultForScrollKeys;
	}

	function enableScroll() {
		if (window.removeEventListener)
			window.removeEventListener('DOMMouseScroll', preventDefault, false);
		window.onmousewheel = document.onmousewheel = null; 
		window.onwheel = null; 
		window.ontouchmove = null;  
		document.onkeydown = null;  
	};
	
	
	/*
		Popups
	*/
		
	$(".open-order-js").click(function(event) {
		event.preventDefault();
		$(".overlay").fadeIn(500);
		$(".overlay").addClass("show");
		$(".form-order").css("display", "block");
		
		disableScroll();
		
		window.addEventListener("keydown", function(e){
			if (e.keyCode == 27) {
				$(".block-form").css("display", "none");
				$(".overlay").removeClass("show");
				$(".overlay").fadeOut(500);

				enableScroll();
			}
		}, true);
	});
	
	$(".open-call-js").click(function(event) {
		event.preventDefault();
		$(".overlay").fadeIn(500);
		$(".overlay").addClass("show");
		$(".form-call").css("display", "block");
		
		disableScroll();
		
		window.addEventListener("keydown", function(e){
			if (e.keyCode == 27) {
				$(".block-form").css("display", "none");
				$(".overlay").removeClass("show");
				$(".overlay").fadeOut(500);

				enableScroll();
			}
		}, true);
	});
		
	$(".close").click(function(event) {
		event.preventDefault();
		$(".block-form").css("display", "none");
		$(".overlay").removeClass("show");
		$(".overlay").fadeOut(500);
		
		enableScroll();
	});
	
	$(document).mouseup(function (e) {
		var container = $(".overlay");
		if (container.has(e.target).length === 0){
			$(".block-form").css("display", "none");
			$(".overlay").removeClass("show");
			$(".overlay").fadeOut(500);

			enableScroll();
		}
	});
	
	
	/*
		Tabs work steps
	*/
	var btn_tabs_node = document.querySelectorAll(".tabs-steps li"),
		btn_tabs = [btn_tabs_node.length],
		tabs_node = document.querySelectorAll(".tabs-info > li"),
		tabs = [tabs_node.length],
		btn_tabs_arrow_node = document.querySelectorAll(".screen-steps .btn-arrow"),
		btn_tabs_arrow = [btn_tabs_arrow_node.length],
		current_tab = 0;
	
	for(var i = 0; i < btn_tabs_node.length; i++) {
		btn_tabs[i] = btn_tabs_node.item(i);
		tabs[i] = tabs_node.item(i);
	};
	
	for(var i = 0; i < btn_tabs_arrow_node.length; i++) {
		btn_tabs_arrow[i] = btn_tabs_arrow_node.item(i);
	};
	
	btn_tabs[0].classList.add("active");
	tabs[0].classList.add("active");
	
	btn_tabs.forEach(function(btn, i, btn_tabs) {
		btn.addEventListener("click", function(event) {
			event.preventDefault();
			for(var y = 0; y < btn_tabs.length; y++) {
				if(i != y) {
					if(btn_tabs[y].classList.contains("active")) {
						btn_tabs[y].classList.remove("active");
					}
					
					if(tabs[y].classList.contains("active")) {
						tabs[y].classList.remove("active");
					}
				}
			}

			btn.classList.add("active");
			tabs[i].classList.add("active");
			current_tab = i;
		})
	});
	
	btn_tabs_arrow.forEach(function(btn, i, btn_tabs_arrow) {
		btn.addEventListener("click", function(event) {
			event.preventDefault();
			console.log("current = " + current_tab);
			console.log("btn = " + i);
			for(var y = 0; y < btn_tabs.length; y++) {
				if(btn_tabs[y].classList.contains("active")) {
					btn_tabs[y].classList.remove("active");
				}

				if(tabs[y].classList.contains("active")) {
					tabs[y].classList.remove("active");
				}
			}

			if(i == 0) {
				console.log("prev");
				if(current_tab == 0) {
					console.log("prev if");
					current_tab = btn_tabs.length -1;
					btn_tabs[current_tab].classList.add("active");
					tabs[current_tab].classList.add("active");
				} else {
					console.log("prev else");
					current_tab -= 1;
					btn_tabs[current_tab].classList.add("active");
					tabs[current_tab].classList.add("active");	
				}
			} else {
				console.log("next");
				if(current_tab == btn_tabs.length -1) {
					current_tab = 0;
				
					btn_tabs[current_tab].classList.add("active");
					tabs[current_tab].classList.add("active");
				} else {
					current_tab += 1;
					btn_tabs[current_tab].classList.add("active");
					tabs[current_tab].classList.add("active");	
				}
			}
		})
	})
	
	/*
		Tabs portolio
	*/
	var btn_tabs_portfolio_node = document.querySelectorAll(".tabs-portfolio li"),
		btn_tabs_portfolio = [btn_tabs_portfolio_node.length],
		tabs_portfolio_node = document.querySelectorAll(".tabs-portfolio-info > li"),
		tabs_portfolio = [tabs_portfolio_node.length],
		btn_tabs_portfolio_arrow_node = document.querySelectorAll(".screen-portfolio .btn-arrow"),
		btn_tabs_portfolio_arrow = [btn_tabs_portfolio_arrow_node.length],
		current_portfolio_tab = 0;
	
	for(var i = 0; i < btn_tabs_portfolio_node.length; i++) {
		btn_tabs_portfolio[i] = btn_tabs_portfolio_node.item(i);
		tabs_portfolio[i] = tabs_portfolio_node.item(i);
	};
	
	for(var i = 0; i < btn_tabs_portfolio_arrow_node.length; i++) {
		btn_tabs_portfolio_arrow[i] = btn_tabs_portfolio_arrow_node.item(i);
	};
	
	btn_tabs_portfolio[0].classList.add("active");
	tabs_portfolio[0].classList.add("active");
	
	btn_tabs_portfolio.forEach(function(btn, i, btn_tabs_portfolio) {
		btn.addEventListener("click", function(event) {
			event.preventDefault();
			for(var y = 0; y < btn_tabs_portfolio.length; y++) {
				if(i != y) {
					if(btn_tabs_portfolio[y].classList.contains("active")) {
						btn_tabs_portfolio[y].classList.remove("active");
					}
					
					if(tabs_portfolio[y].classList.contains("active")) {
						tabs_portfolio[y].classList.remove("active");
					}
				}
			}

			btn.classList.add("active");
			tabs_portfolio[i].classList.add("active");
			current__portfoliotab = i;
		})
	});
	
	
	/*
		Запуск всплывающего окна через 5 секунд после загрузки сайта
	*/

	function Ready() {
		if (!localStorage.getItem("present")) {
			setTimeout(function() {
				$(".overlay").fadeIn(500);
				$(".overlay").addClass("show");
				$(".form-present").css("display", "block");

				disableScroll();
				localStorage.setItem("present", "see");

				window.addEventListener("keydown", function(e){
					if (e.keyCode == 27) {
						$(".block-form").css("display", "none");
						$(".overlay").removeClass("show");
						$(".overlay").fadeOut(500);

						enableScroll();
					}
				}, true);	
			} ,5000);
		}
	};
	
	document.addEventListener("DOMContentLoaded", Ready());

	window.onfocus = function() {
		if (!localStorage.getItem("exit")) {
			if($(".overlay").hasClass("show")) {
				$(".block-form").css("display", "none");
				$(".form-exit").css("display", "block");
			} else {
				$(".overlay").fadeIn(500);
				$(".overlay").addClass("show");
				$(".form-exit").css("display", "block");
			}
			disableScroll();
			localStorage.setItem("exit", "see");

			window.addEventListener("keydown", function(e){
				if (e.keyCode == 27) {
					$(".block-form").css("display", "none");
					$(".overlay").removeClass("show");
					$(".overlay").fadeOut(500);

					enableScroll();
				}
			}, true);	
		}
	};
  
    
	/*
		Плавная прокрутка
	*/
	$('a[href^="#"]').bind('click.smoothscroll', function (e) {
		e.preventDefault();

		var target = this.hash,
			$target = $(target);
		if(target == "") {
			$('html, body').stop().animate({
				'scrollTop': 0
			}, 700, 'swing', function () {
				window.location.hash = target;
			});
		} else {
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top - 70
			}, 700, 'swing', function () {
				window.location.hash = target;
			});
		}
	});
	
	
	/*
		Слайдер отзывов
	*/
	$(".block-reviews").slick({
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: [
			{
			  breakpoint: 1024,
				settings: {
					arrows: false	
				}
			}
		]
	});

});