jQuery(document).bind('mobileinit').ready(function($){
//
// tips info ...
var txtTip = new Array(
	'移动版的 GoQR 已经支持使用 iPhone 的<b> 添加到桌面 </b>功能',
	'目前已经有 GoQR for Chrome 免费提供',
	'二维码将成为链接物联网的桥梁',
	'现在 GoQR 已经在 GitHub 上开源提供给开发者',
	'名片模式需要扫码软件支持 vCard 标准如：微信等',
	'点击二维码后还不够大，再点一次打开网页可另存',
	'不能识别时可尝试点击二维码图片进行放大'
);
$('#txtInfo').html('Tip:<br>' + txtTip[Math.floor(Math.random() * txtTip.length)]);


// for navBar even...
var btnNav = $('#barMenu').find('a');
var fomDat = $('#fomData').find('div.ui-input-text');
btnNav.click(function(){
	btnNav.removeClass('ui-btn-active').filter(this).addClass('ui-btn-active');
	fomDat.hide().has('input.' + $(this).attr('rel')).fadeIn('fast', function(){});
	return false;
}).eq(0).click();

// for make qrCode ...
var tplDat = {
	card:'BEGIN:VCARD\nN:{name}\nTEL:{call}\nEMAIL:{mail}\nEND:VCARD',
	msgs:'SMSTO:{call}:{text}',
	call:'TEL:{call}',
	http:'{http}',
	mail:'MAILTO:{mail}?subject=&body={text}',
	text:'{text}'
}
$('#fomData').submit(function(){
	//
	// var warn = '';	// for warning ...
	// $('#fomData input:visible').each(function(){
	// 	warn += $(this).val() ? '' : ($(this).attr('placeholder') + ' ');
	// });
	// if(warn && !confirm(warn + '为空\n是否继续？')){ return false; }
	//
	var code = tplDat[$('#barMenu').find('a.ui-btn-active').attr('rel')];
	$('#fomData input:visible').each(function(){
		term = new RegExp('{' + $(this).attr('name') + '}', 'g');
		code = code.replace(term, $(this).val());
		//console.log(code);
	});
	var edge = (window.devicePixelRatio === 2) ? 258 : 129;
	$(this).find('.ui-submit.ui-btn-active').removeClass('ui-btn-active');
	$('#lnkCode canvas, #bigCode canvas').remove();
	$('#lnkCode').qrcode({ width:edge, height:edge, text:code });
	$('#bigCode').qrcode({ width:edge*2, height:edge*2, text:code });
	$('#bigCode').attr('href', 'http://chart.apis.google.com/chart?cht=qr&chld=|0&choe=UTF-8&chs=430x430&chl=' + encodeURIComponent(code));
	//
	return false;
});


// for ChromeExt
if(typeof(chrome.tabs) === 'object'){
	chrome.tabs.getSelected(null, function(tabs){
		$('#barMenu a').eq(2).click();
		$('input[name="http"]').val(tabs.url);
		$('input[name="text"]').val(tabs.title + ' ' + tabs.url);
		$('#fomData').submit();
	});
}

//
});
