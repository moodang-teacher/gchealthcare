$(document).on('scroll', function () {
	if ($(document).scrollTop() > 100) {
		$('.header').removeClass('large').addClass('small');
	} else {
		$('.header').removeClass('small').addClass('large');
	}
});

$(document).ready(function () {
	$('#image-gallery').lightSlider({
		gallery: true,
		item: 1,
		thumbItem: 3,
		slideMargin: 0,
		speed: 600,
		pause: 4000,
		auto: true,
		loop: true,
		onSliderLoad: function () {
			$('#image-gallery').removeClass('cS-hidden');
		},
	});

	$('.gnb li').hover(
		function () {
			$('ul', this).stop().slideDown(200);
		},
		function () {
			$('ul', this).stop().slideUp(200);
		}
	);

	$('.nav li').hover(
		function () {
			$('ul', this).stop().slideDown(200);
		},
		function () {
			$('ul', this).stop().slideUp(200);
		}
	);

	$('.select')
		.on('click', '.placeholder', function () {
			var parent = $(this).closest('.select');
			if (!parent.hasClass('is-open')) {
				parent.addClass('is-open');
				$('.select.is-open').not(parent).removeClass('is-open');
			} else {
				parent.removeClass('is-open');
			}
		})
		.on('click', 'ul>li', function () {
			var parent = $(this).closest('.select');
			parent.removeClass('is-open').find('.placeholder').text($(this).text());
			parent
				.find('input[type=hidden]')
				.attr('value', $(this).attr('data-value'));
		});

	var is_state = 'close';
	$('.sitelink > ul').css({ top: -$('.sitelink ul').height() });
	$('.sitelink > a').on('click', function (e) {
		if (is_state === 'close') {
			$('.sitelink > ul').removeClass('blind');
			is_state = 'open';
			$(this).text('CLOSE');
		} else {
			$('.sitelink > ul').addClass('blind');
			is_state = 'close';
			$(this).text('계열사/가족사이트 바로가기');
		}
	});

	$(function () {
		$.fatNav();
		$('.arctic_scroll').arctic_scroll({
			speed: 800,
		});
		$('.more-wrap').readmore({ speed: 500 });
		$('a[rel*=leanModal]').leanModal({ top: 100, closeButton: '.modal_close' });
	});

	AOS.init({
		easing: 'ease-in-out-sine',
	});
});

jQuery(document).ready(function ($) {
	var tabs = $('.cd-tabs');

	tabs.each(function () {
		var tab = $(this),
			tabItems = tab.find('ul.cd-tabs-navigation'),
			tabContentWrapper = tab.children('ul.cd-tabs-content'),
			tabNavigation = tab.find('nav');

		tabItems.on('click', 'a', function (event) {
			event.preventDefault();
			var selectedItem = $(this);
			if (!selectedItem.hasClass('selected')) {
				var selectedTab = selectedItem.data('content'),
					selectedContent = tabContentWrapper.find(
						'li[data-content="' + selectedTab + '"]'
					),
					slectedContentHeight = selectedContent.innerHeight();

				tabItems.find('a.selected').removeClass('selected');
				selectedItem.addClass('selected');
				selectedContent
					.addClass('selected')
					.siblings('li')
					.removeClass('selected');
				//animate tabContentWrapper height when content changes
				tabContentWrapper.animate(
					{
						height: slectedContentHeight,
					},
					200
				);
			}
		});

		//hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
		checkScrolling(tabNavigation);
		tabNavigation.on('scroll', function () {
			checkScrolling($(this));
		});
	});

	$(window).on('resize', function () {
		tabs.each(function () {
			var tab = $(this);
			checkScrolling(tab.find('nav'));
			tab.find('ul.cd-tabs-content').css('height', 'auto');
		});
	});

	function checkScrolling(tabs) {
		var totalTabWidth = parseInt(
				tabs.children('ul.cd-tabs-navigation').width()
			),
			tabsViewport = parseInt(tabs.width());
		if (tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
			tabs.parent('.cd-tabs').addClass('is-ended');
		} else {
			tabs.parent('.cd-tabs').removeClass('is-ended');
		}
	}
});
