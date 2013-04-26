// bigPic.js for ChromeExt
jQuery(function($){
	//console.clear();
	var popBox = false;

	// for iTunes Store
	if(/(itunes.apple.com)/i.test(document.location.hostname)){
		$('img.portrait, img.landscape').wrap(function(){
			imgSrc = $(this).attr('src').replace(/320/g,'640').replace(/480/g,'960');
			return '<a rel="shadowbox[bigPic]" href="' + imgSrc + '">';
		});
		popBox = true;
	}

	// for Google Play

	// for
	if(/(dribbble.com)/i.test(document.location.hostname)){
		$('a.twotimes').addClass('shadowbox');
		popBox = true;
	}


	// setup the shadowbox
	if(popBox){Shadowbox.init({
			//displayCounter: false,
			//handleOversize: 'drag',
			viewportPadding: 10,
			continuous: true,
			displayNav: false,
	})}


});
