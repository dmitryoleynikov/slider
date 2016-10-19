;(function($) {
	
	$.sliderPartner = {
		'idSlider'		: 0,
		settings		: {
			'containerWidth'	: 0,
			'containerHeight'	: 0,
			'decal'				: 0
		},
		params			: {
			'imageSrc'			: '', 
			'imageWidth'		: 0,
			'imageHeight'		: 0,
			'imageAlt'			: '',
			'speed'				: 2000,	
			'decal'				: 140,	
			'direction'			: 'left'
		}
	};
	
	$.extend($.fn, {
	
		sliderPartner: function(params) {
			$.sliderPartner.idSlider++;
			
			var iId				= $.sliderPartner.idSlider;	
			
			var settings		= $.extend({}, $.sliderPartner.settings);
			var params			= $.extend({}, $.sliderPartner.params, params);
						
			var container		= $(this);
			var content;
			var img;
				
			settings.containerWidth		= this.width();
			settings.containerHeight	= this.height();			
			
			var imgSlide	= function () {	
				$(content).animate({
					left: (params.direction === 'left') ? '-='+params.decal : '+='+params.decal
				}, params.speed, 'linear', function(){
					settings.decal	+= params.decal;
										
					if(settings.decal >= params.imageWidth) {
						
						settings.decal	= 0;
						
						if(params.direction === 'left') {
							$(content).children('img:first-child').appendTo(content).end().end().css('left', 0);	
						}
						else {
							$(content).children('img:last-child').prependTo(content).end().end().css('left', -params.imageWidth + 'px');
						}						
					}
					imgSlide();
				});
			};
			
			var imgInit	= function() {
				
				var nbClone			= 1;
				
				if(settings.containerWidth > params.imageWidth) {
					nbClone			= Math.floor(settings.containerWidth / params.imageWidth) + 1;
				}
				
				var widthContent	= params.imageWidth + params.imageWidth * nbClone;
			
			
				content				= $("<div id='slideLogoContent_"+iId+"'></div>").appendTo(container).css({	"width"			: widthContent,
																												"height"		: settings.containerHeight,
																												"position"		: "relative",
																												"left"			: (params.direction === 'left') ? 0 : -params.imageWidth + 'px',
																												"z-index"		: "0"});
																										
				
				
				img					= $('<img src="' + params.imageSrc+ '" width="'+params.imageWidth+'" height="'+params.imageHeight+'" alt="'+params.imageAlt+'" />').appendTo(content).css({	'float'			: 'left'});
			
					
				for(var i = 0; i < nbClone ; i++) {
					$(img).clone().appendTo(content);
				}
				
				imgSlide();
			};
			
			imgInit();
		}
	});
})(jQuery); 