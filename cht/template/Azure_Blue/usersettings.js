//Variables to override in settings
var useTOC = true;
var useGLO = false;
var useIDX = true;
var useFilter = false;
var useFacebook = false;
var useTwitter = false;
var useSocial = true;
var defaultPane = 'toc';
var mobileHeader = false;
var mobileTocDrilldown = true;
var useANDsearch = true;
var maxResults = 15;
var desktopSidebarVisibleDefault = true;
var searchLocationBoolean = true;
var phone_max_width = 941;
var tablet_max_width = 1295;

(function() {
	var mobileMenu, rh, features;

	rh = window.rh;
	features = rh.model.get(rh.consts('KEY_FEATURE')) || {};

	//Publish which panes are available
	features.toc = useTOC;
	features.idx = useIDX;
	features.glo = useGLO;
	features.filter = useFilter;
	
	rh.model.publish(rh.consts('KEY_DEFAULT_TAB'), defaultPane);

	//If there are are no panes available
	if (!useTOC && !useGLO && !useIDX) {
		mobileMenu = false;
	} else {
		mobileMenu = true;
	}

	rh.model.publish('l.mobile_menu_enabled', mobileMenu);

	//Should the header (project title + logo) be shown on a mobile device?
	rh.model.publish('l.mobile_header_visible', mobileHeader);

	//Set the TOC type for mobile: Regular (false: default) or Drill down (true).
	rh.model.publish(rh.consts("KEY_MOBILE_TOC_DRILL_DOWN"), mobileTocDrilldown);

	//Should desktop sidebar be hidden by default?
	rh.model.publish('l.desktop_sidebar_visible', desktopSidebarVisibleDefault);

	//Does the user want search results in the sidebar or over topic content?
	var searchLocation = (searchLocationBoolean === true) ? 'tabbar' : 'content';
	rh.model.publish(rh.consts('KEY_DEFAULT_SEARCH_LOCATION'), searchLocation);

	//Number of search results to be loaded at once.
	rh.consts('MAX_RESULTS', '.l.maxResults');
	rh.model.publish(rh.consts('MAX_RESULTS'), maxResults);

	//Choose whether to use the AND search option in the layout
	features.andsearch = useANDsearch;

	/* This layout has single page and so handles search */
	rh.model.publish(rh.consts("KEY_CAN_HANDLE_SEARCH"), true);

	//Hide the sidebar when there are no panes
	if (!useTOC && !useGLO && !useIDX && !searchLocationBoolean && !useFilter) {
		rh.model.publish('l.desktop_sidebar_available', false);
	} else {
		rh.model.publish('l.desktop_sidebar_available', true);
	}

	var desktop = 'screen and (min-width: '+ (tablet_max_width + 1) +'px)';
	var tablet = 'screen and (min-width: '+ (phone_max_width + 1) +'px) and (max-width: '+ tablet_max_width +'px)';
	var phone = 'screen and (max-width: '+ phone_max_width +'px)';
	var screens = {
	  desktop: { media_query: desktop },
	  tablet: { media_query: tablet },
	  phone: { media_query: phone },
	  ios: {user_agent: /(iPad|iPhone|iPod)/g}
	};
	rh.model.publish(rh.consts('KEY_SCREEN'), screens);
	
	//Social widgets
	if(document.location.toString().indexOf("file:///") != -1) {//Always disable buttons for local output
		useFacebook = false;
		useTwitter = false;
		useSocial = false;
	}
	if(!useFacebook && !useTwitter) {
		useSocial = false;
	}
	
	features.facebook = useFacebook;
	features.twitter = useTwitter;
	features.social = useSocial;

	if(useFacebook) {//Facebook Button
		rh.model.subscribe(rh.consts('KEY_TOPIC_TITLE'), updateFacebookButton);
		rh.model.subscribe('l.social_opened', updateFacebookButton);
	}
	if(useTwitter) {//Twitter button
		rh.model.subscribe(rh.consts('KEY_TOPIC_TITLE'), updateTwitterButton);
		rh.model.subscribe('l.social_opened', updateTwitterButton);
	}
	function updateFacebookButton() {
		var iframeID, url, iframe, topicUrl;
		
		topicUrl = rh.model.get(rh.consts('KEY_TOPIC_URL'));
		
		if(!rh.model.get('l.social_opened') || !topicUrl) {
			return;
		}
		
		if(document.location.toString().indexOf("file://") != -1) {
			return;//No FB button on local content
		}
		
		iframeID = "bf-iframe";
		
		//The URL for the Facebook iFrame
		url = 'http://www.facebook.com/plugins/share_button.php?href='+
			  topicUrl +
			  '&layout=button_count&action=like&show_faces=false&share=false&height=21';
		
		iframe = document.getElementById(iframeID);
		iframe.setAttribute("src", url);
		
	}
	function updateTwitterButton() {
		var holderID, holder, newLink, textNode, topicUrl;
		
		topicUrl = rh.model.get(rh.consts('KEY_TOPIC_URL'));
		
		if(!rh.model.get('l.social_opened') || !topicUrl) {
			return;
		}
		
		if(document.location.toString().indexOf("file://") != -1) {
			return;//No Tweet button on local content
		}
		
		holderID = 'twitter-holder';
		holder = document.getElementById(holderID);
		
		//Remove existing children
		while (holder.firstChild) {
			holder.removeChild(holder.firstChild);
		}
		
		//Add tweet button
		newLink = document.createElement('a');
		newLink.setAttribute("href", 'https://twitter.com/share');
		newLink.setAttribute("class", 'twitter-share-button');
		newLink.setAttribute("data-url", topicUrl);
		newLink.setAttribute("data-text", rh.model.get(rh.consts('KEY_TOPIC_TITLE')));
		
		textNode = document.createTextNode("Tweet");
		newLink.appendChild(textNode);
		
		holder.appendChild(newLink);
		
		if(window.twttr) {
			window.twttr.widgets.load();
		}
	}
	
	rh.model.publish(rh.consts('KEY_FEATURE'), features);
	rh.model.publish(rh.consts("KEY_LAYOUT_VERSION"), "2.0");	
}.call(this));

