gDataFolder = "whxdata";
gCSHDataFile = "csh.js";
gWndDataFile = "window.js";

var gBrowserWnd = null;
var gTopicURL = null;
var gDefTopicURL = null;

var gCSHWnd = new Object();
gCSHWnd.sName=RHMSWINNAME;
gCSHWnd.nBOptions=WINRESIZABLE|WINSCROLLBARS;
gCSHWnd.sBLeft="49%";
gCSHWnd.sBTop="0";
gCSHWnd.sBWidth="49%";
gCSHWnd.sBHeight="49%";

var gMapType = null;
var gMapData = "";
var gCshRootPathsArr = null;
(function () {
	var _loadTopic = function(defaultTopicURL) {
		if(!rh._.isRelativeUrl(defaultTopicURL)) {
			return false;
		}

		gDefTopicURL = defaultTopicURL; 
		var mapnum = getUrlParameter(RHMAPNO);
		if(mapnum!="") {
			showCSHTopic(ITEMTYPEMAPNO, mapnum);
			return true;
		}
		else {
			var mapid = getUrlParameter(RHMAPID);
			if(mapid!="") {
				showCSHTopic(ITEMTYPEMAPID, mapid);
				return true;
			}
		}
		gTopicURL = gDefTopicURL;
		redirectToTopic();
	}

	window.loadTopic = function(defaultTopicURL)
	{
		var isLoaded = rh.model.get(rh.consts('EVT_PROJECT_LOADED'));
		if(isLoaded) {
			_loadTopic(defaultTopicURL);
		}
		else {
			var unSub = rh.model.subscribe(rh.consts('EVT_PROJECT_LOADED'), function() {
				_loadTopic(defaultTopicURL);
				unSub();
			});
		}
	}

})();
function showCSHTopic(maptype, mapdata)
{
	gMapType = maptype;
	gMapData = mapdata;
	initAndCollectAllChildPaths(gRootRelPath, gCommonRootRelPath, SCR_CHILD_CSH);
}
function loadCSH(cshRootPathsArr)
{
	gCshRootPathsArr = cshRootPathsArr;
	var arrIndex = 0;
	loadCSHFile(arrIndex);
}
function loadCSHFile(arrIndex)
{
	xmlJsReader.loadFile(gCshRootPathsArr[arrIndex] + "/" + gDataFolder + "/" + gCSHDataFile, callBackCSHLoaded, arrIndex);
}
function callBackCSHLoaded(xmlDoc, arrIndex)
{
	var cshInfoXmlNode = xmlDoc.getElementsByTagName(CSHINFONODE)[0];
	var itemNodes = cshInfoXmlNode.getElementsByTagName(ITEMNODE);
	var len = itemNodes.length;
	for(var i=0; i<len; i++)
	{
		var itemNode = itemNodes[i];
		var mapdata;
		if(gMapType == ITEMTYPEMAPNO)
			mapdata = itemNode.getAttribute(MAPNUM);
		else if(gMapType = ITEMTYPEMAPID)
			mapdata = itemNode.getAttribute(MAPID);
		if(mapdata.toLowerCase() == gMapData.toLowerCase())
		{
			gTopicURL = gCshRootPathsArr[arrIndex] + "/" + itemNode.getAttribute(TOPICURL);
			break;
		}
	}
	if(gTopicURL == null || gTopicURL == "")
	{
		if(arrIndex < gCshRootPathsArr.length-1)
		{
			loadCSHFile(arrIndex + 1);
			return;
		}
		else
			gTopicURL = gDefTopicURL;
	}
	redirectToTopic(true);
}
function redirectToTopic(bCSH)
{
	var bNewWin = getUrlParameter(RHNEWWINDOW);
	var strWndName = getUrlParameter(RHWINDOW);
	if(bNewWin == TRUESTR || strWndName != "")
	{
		if(strWndName != "")
			loadWindow(strWndName);
		else
			showTopicWindow(gCSHWnd, bNewWin);
	}
	else
	{
		rh.model.subscribe(rh.consts('KEY_PUBLISH_MODE'), function(value){
			if (value) {
				rh.rhs.logTopicView(gTopicURL);
			}
		});

		if (bCSH == true)
		{
			showTopicWindow(gCSHWnd, false);
		}
		else
		{
			var target = document.querySelector("[name=" + gTopicFrameName + "]");

			if (target) {
				var fullUrl = rh._.makeFullUrl(gTopicURL);
				if (rh._.isInternal(fullUrl) && rh._.isUrlAllowdInIframe(fullUrl)) {
					try {
						target.contentWindow.location.replace(fullUrl);	
					} catch(e) {
						target.contentWindow.document.location.replace(fullUrl);	
					}
				}
			}
		}
	}

}

function loadWindow(strWndName)
{
	xmlJsReader.loadFile(gRootRelPath + "/" + gDataFolder + "/" + gWndDataFile, callBackWndLoaded, strWndName);
}
function callBackWndLoaded(xmlDoc, strWndName)
{
	var winListXmlNode = xmlDoc.getElementsByTagName(WINDOWLISTNODE)[0];
	var windowNodes = winListXmlNode.getElementsByTagName(WINDOWNODE);
	var len = windowNodes.length;
	for(var i=0; i<len; i++)
	{
		var windowNode = windowNodes[i];
		var name = windowNode.getAttribute(NAME);
		if(name.toLowerCase() == strWndName.toLowerCase())
		{
			var attribVal = windowNode.getAttribute(XCOORD);
			gCSHWnd.sBLeft = attribVal;
			
			attribVal = windowNode.getAttribute(YCOORD);
			gCSHWnd.sBTop = attribVal;
			
			attribVal = windowNode.getAttribute(WIDTH);
			gCSHWnd.sBWidth = attribVal;
			
			attribVal = windowNode.getAttribute(HEIGHT);
			gCSHWnd.sBHeight = attribVal;
			
			attribVal = windowNode.getAttribute(OPTIONS);
			gCSHWnd.nBOptions = parseInt(attribVal);
		}
	}
	showTopicWindow(gCSHWnd, true);
}
function showTopicWindow(oWnd, bNewWindow)
{
	if (gTopicURL) {
		var	strOpt = getBrowserOptionString(oWnd);
		var	sNewName = oWnd ? convertWindowName(oWnd.sName) : window.name;
		var fullUrl = rh._.makeFullUrl(gTopicURL);

		if(bNewWindow) {
			if(gbNav4 || gbSafari) {
				if (gbNav6) {
					if (navigator.appVersion.indexOf("rv:11.0") > -1) { // IE 11
						gBrowserWnd = window.open(fullUrl, sNewName, strOpt);
					} else {
						gBrowserWnd = window.open("about:blank", sNewName, strOpt);
						setTimeout("postTopicWindowOpen();", 100);
					}
				} else {
					window.open("about:blank", sNewName, strOpt);
					var oNewWnd = window.open(fullUrl, sNewName);
					window.close();
					oNewWnd.focus();
					top.blur();
				}
			} else {
				if(gbIE5) {
					var curWnd = null;	
					curWnd = window.open("about:blank",sNewName,strOpt);
					gBrowserWnd=window.open(gTopicURL,sNewName);
				}
				else {
					// IE4 had hard time to handle bookmark.
					gBrowserWnd=window.open("about:blank",sNewName,strOpt);
				}
				setTimeout("postTopicIEWindowOpen();",100);
			}
		} else {
			document.location.href = fullUrl;
			window.name = sNewName;
		}
	}
}
function postTopicWindowOpen() {
	if(gBrowserWnd) {
		if (gTopicURL) {
			var fullUrl = rh._.makeFullUrl(gTopicURL);
			gBrowserWnd.document.location.href = fullUrl;
		}
		window.close();
		gBrowserWnd.focus();
		top.blur();
	}
}
function postTopicIEWindowOpen() {
	if(gBrowserWnd) {
		if (gTopicURL&&!gbIE5&&gbIE4) {
			var fullUrl = rh._.makeFullUrl(gTopicURL);
			gBrowserWnd.document.location.href=fullUrl;
		}
		gBrowserWnd.focus();
	}
}
function getBrowserOptionString(oWnd)
{
	var strOpts="";
	if(oWnd.bUseDefault)
		return strOpts;
	if(oWnd.nBOptions&WINLOCATION)
		strOpts+="location=yes";
	else
		strOpts+="location=no";
	if(oWnd.nBOptions&WINTOOLBAR)
		strOpts+=",toolbar=yes";		
	else
		strOpts+=",toolbar=no";		
	if(oWnd.nBOptions&WINMENUBAR)
		strOpts+=",menubar=yes";		
	else
		strOpts+=",menubar=no";
	if(oWnd.nBOptions&WINSTATUS)
		strOpts+=",status=yes";		
	else
		strOpts+=",status=no";		
	if(oWnd.nBOptions&WINSCROLLBARS)
		strOpts+=",scrollbars=yes";
	else
		strOpts+=",scrollbars=no";	
	if(oWnd.nBOptions&WINRESIZABLE)
		strOpts+=",resizable=yes";
	else
		strOpts+=",resizable=no";
	if(oWnd.sBTop)
	{
		var nTop=getSValue(oWnd.sBTop,screen.height);
		strOpts+=",top="+nTop;
		strOpts+=",screenY="+nTop;
	}
	if(oWnd.sBLeft)
	{
		var nLeft=getSValue(oWnd.sBLeft,screen.width);
		strOpts+=",left="+nLeft;
		strOpts+=",screenX="+nLeft;
	}
	if(oWnd.sBWidth)
	{
		var nWidth=getSValue(oWnd.sBWidth,screen.width);
		strOpts+=",width="+nWidth;
		strOpts+=",outerWidth="+nWidth;
	}
	if(oWnd.sBHeight)
	{
		var nHeight=getSValue(oWnd.sBHeight,screen.height);
		strOpts+=",height="+nHeight;
		strOpts+=",outerHeight="+nHeight;
	}
	return strOpts;
}
function getSValue(sValue,nLength)
{
	var nValue=0;
	var nPos=sValue.indexOf("%");
	if(nPos!=-1)
	{
		if(nPos>0)
		{
			var nPart=parseInt(sValue.substring(0,nPos));
			nValue=nLength*nPart/100;
		}
	}
	else
		nValue=parseInt(sValue);
	return nValue;
}
function convertWindowName(strName)
{
	var strNewName = strName;
	var strResultName = "";
	var re=new RegExp("_","g");
	strNewName = strName.replace(re,"__");
	for (var i=0;i<strNewName.length;i++)
		if (!(strNewName[i] == '_' ||
			(strNewName[i] <= '9' && strNewName[i] >= '0') ||
			(strNewName[i] <= 'z' && strNewName[i] >= 'a') ||
			(strNewName[i] <= 'Z' && strNewName[i] >= 'A')))
		{
			strResultName += "_" + strNewName.charCodeAt(i);
		}
		else
			strResultName += strNewName[i];
	return strResultName;
}
