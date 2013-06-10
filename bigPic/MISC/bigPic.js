// bigPic.js for ChromeExt
jQuery(function($){
	//console.clear();
	var popBox = false;
    var webUrl = document.location.hostname;

	// for iTunes Store
	if(/(itunes.apple.com)/i.test(document.location.hostname)){
		$('img.portrait, img.landscape').wrap(function(){
			imgSrc = $(this).attr('src').replace(/320/g, 640).replace(/480/g, 960);
			return '<a rel="shadowbox[bigPic]" href="' + imgSrc + '">';
		});
        $('div.lockup.product.application > a:first-child').attr({
            rel : 'shadowbox[bigIco]',
            href: function(){ return $(this).find('img').attr('src').replace(/175/g, 512).replace(/.jpg/g, '.png'); }
        });
        //.clone().attr('href', function(){ return $(this).attr('href').replace(/512/g, 1024); }).prependTo('div.lockup.product.application');
		popBox = true;
	}

	// for Google Play

	// for dribbble.com
	if(/(dribbble.com)/i.test(document.location.hostname)){
		//$('a.twotimes').addClass('shadowbox');
		//popBox = true;
	}


	// setup the shadowbox
	if(popBox){Shadowbox.init({
        viewportPadding: 10,
        continuous: true,
		displayNav: false,
	})}

    //
});
