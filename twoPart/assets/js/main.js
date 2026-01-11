/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

// Spotlights.
var $spotlights = $('.spotlight');

$spotlights
	._parallax()
	.each(function() {

		var $this = $(this),
			on, off;

		on = function() {

			var top, bottom, mode;

			// 处理视频：移除自动播放，使用默认控制条
			var $video = $this.find('video');
			if ($video.length) {
				var video = $video[0];
				
				// 确保有controls属性，显示默认控制条
				video.controls = true;
				video.autoplay = false; // 禁用自动播放
				video.playsinline = true;
				
				// 可以设置默认静音，用户点击后可以取消
				video.muted = false;
				// 移除了 addVideoClickToPlay($video) 调用
			}

			// Use main <img>'s src as this spotlight's background.
				// $this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

			// Side-specific scrollex tweaks.
				if ($this.hasClass('top')) {

					mode = 'top';
					top = '-20%';
					bottom = 0;

				}
				else if ($this.hasClass('bottom')) {

					mode = 'bottom-only';
					top = 0;
					bottom = '20%';

				}
				else {

					mode = 'middle';
					top = 0;
					bottom = 0;

				}

			// Add scrollex.
				$this.scrollex({
					mode:		mode,
					top:		top,
					bottom:		bottom,
					initialize:	function(t) { $this.addClass('inactive'); },
					terminate:	function(t) { $this.removeClass('inactive'); },
					enter:		function(t) { $this.removeClass('inactive'); },

					// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

					// 添加视频控制
					leave: function(t) { 
						// 离开视口时暂停视频
						var $video = $this.find('video');
						if ($video.length && !$video[0].paused) {
							$video[0].pause();
						}
					}
					
					//leave:	function(t) { $this.addClass('inactive'); },
				});

		};

		off = function() {

			// Clear spotlight's background.
				$this.css('background-image', '');

			// Remove scrollex.
				$this.unscrollex();

		};

		breakpoints.on('<=medium', off);
		breakpoints.on('>medium', on);

	});

// 移除了整个 addVideoClickToPlay 函数

// 页面加载后初始化所有视频 - 只设置基本属性，不移除点击播放
$(document).ready(function() {
	// 为所有视频设置基本属性
	$('video').each(function() {
		var video = this;
		
		// 确保视频属性正确
		video.autoplay = false;
		video.controls = true;
		video.playsinline = true;
		
		// 不再添加额外的点击事件
	});
});


// 字幕数据-----老师祝福
// var subtitles = [
    // { start: 1, end: 5, text: "老师：同学们，大家好！2222Feugiat accumsan lorem eu ac lorem amet ac arcu phasellus tortor enim mi mi nisi praesent adipiscing. Integer mi sed nascetur cep aliquet augue varius tempus lobortis porttitor lorem et accumsa" },
    // { start: 5.5, end: 20, text: "老师：同学们，大家好！2222Feugiat accumsan lorem eu ac lorem amet ac arcu phasellus tortor enim mi mi nisi praesent adipiscing. Integer mi sed" },
    // { start: 20.5, end: 30, text: "老师：希望大家认真听讲" }
// ];

// 在视频时间更新时显示字幕
// var video = document.getElementById('myVideo');
// var subtitleDisplay = document.getElementById('subtitleText');

// video.addEventListener('timeupdate', function() {
    // var currentTime = video.currentTime;
    // var currentSubtitle = '';
    
    // for (var i = 0; i < subtitles.length; i++) {
        // if (currentTime >= subtitles[i].start && currentTime < subtitles[i].end) {
            // currentSubtitle = subtitles[i].text;
            // break;
        // }
    // }
    
    // if (currentSubtitle) {
        // subtitleDisplay.textContent = currentSubtitle;
        // subtitleDisplay.style.display = 'block';
    // } else {
        // subtitleDisplay.style.display = 'none';
    // }
// });


// 单击按钮全屏播放
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有全屏按钮
    const buttons = document.querySelectorAll('.fullscreen-btn');
    
    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // 找到对应的视频元素
            const videoContainers = document.querySelectorAll('.fullscreen-video');
            const video = videoContainers[index];
            
            // 全屏播放
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            }
            
            setTimeout(() => video.play(), 300);
        });
    });
});


	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);