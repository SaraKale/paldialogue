(function() {
	var projList = [];
	var layout_features;
	var layout_version = 0.0;
	rh.model.subscribe(rh.consts('KEY_FEATURE'), function (features) {
		layout_features = features;
	});
	rh.model.subscribe(rh.consts('KEY_LAYOUT_VERSION'), function (version) {
		layout_version = parseFloat(version);
	});

	//Adding some global variables
	window.gProjDataFile = "projectdata.js";
	window.gbLoadingProjData = false;
	window.gbProjDataLoaded = false;
	window.initAndCollectAllChildPaths = function (rootRelPath, commonRootRelPath, flowType) {
	if(gbLoadingProjData == true)
	{
		gFlowTypeArrProjData[gFlowTypeArrProjData.length] = flowType;
		return;
	}
	else if(gbProjDataLoaded == true)
	{
		doReturnProjDataCallAction(flowType);
		return;
	}

	gbLoadingProjData = true;
	gFlowTypeArrProjData = new Array;
	gFlowTypeArrProjData[0] = flowType;
	gChildProjUrlQueue = new MhQueue();
	gChildRootRelPathArr = new Array;
	collectAllChildPaths(rootRelPath, commonRootRelPath, flowType);
		projList.push(commonRootRelPath);
}

	function projDataCallBackObj(flowType, commonRootRelPath, rootRelPath, data)
	{
		this.flowType = flowType;
		this.commonRootRelPath = commonRootRelPath;
		this.rootRelPath = rootRelPath;
		this.data = data;
	}


	window.collectAllChildPaths = function(rootRelPath, commonRootRelPath, flowType)
	{
		var projDataCBObj = new projDataCallBackObj(flowType, commonRootRelPath, rootRelPath, null);
		gChildRootRelPathArr[gChildRootRelPathArr.length] = rootRelPath;
		var projDataFile = rootRelPath + "/" + gProjDataFile;
		xmlJsReader.loadFile(projDataFile, callbackProjDataLoaded, projDataCBObj);
	}

	function callbackProjDataLoaded(xmlDoc, projDataCBObj)
	{
		var projXmlNode = null;
		var remoteNodes = null;
		var len = 0;
		
		if (xmlDoc != undefined && xmlDoc != null)
		{
			projXmlNode = xmlDoc.getElementsByTagName(PROJNODE)[0];
			remoteNodes = projXmlNode.getElementsByTagName(REMOTENODE);
			len = remoteNodes.length;
		}
		rh._.each(remoteNodes, function(remoteNode){
			var url = remoteNode.getAttribute(URL);
			var path = projDataCBObj.commonRootRelPath + "/" + url;
			gChildProjUrlQueue.enqueue(path);
				projList.push(path);
		});
		
		if(gChildProjUrlQueue.isEmpty())
			returnProjDataCall();
		else
		{
			var path = gChildProjUrlQueue.dequeue();
			loadScreenData(path, projDataCBObj.flowType, gChildProjUrlQueue);
		}
	}

		window.returnProjDataCall = function()
	{		
		gbLoadingProjData = false;
		gbProjDataLoaded = true;
		for(var i=0; i<gFlowTypeArrProjData.length; i++)
			doReturnProjDataCallAction(gFlowTypeArrProjData[i]);
	}
	function doReturnProjDataCallAction(flowType)
	{		
		if (flowType == SCR_CHILD_IDX)
		{
			if (layout_version >= 2.0 && layout_features && layout_features.delay_load_idx !== false)
			{
				var idxLoaded = false;
				rh.model.subscribe(rh.consts("EVT_LOAD_IDX"), function() {
					if (!idxLoaded)
					{
						idxLoaded = true;
						displayIdx(gChildRootRelPathArr);
					}
				});
			}
			else {
				displayIdx(gChildRootRelPathArr);
			}
		}		
		else if(flowType == SCR_CHILD_GLO)
		{
			if (layout_version >= 2.0 && layout_features && layout_features.delay_load_glo !== false)
			{
				var gloLoaded = false;
				rh.model.subscribe(rh.consts("EVT_LOAD_GLO"), function() {
					if (!gloLoaded)
					{
						gloLoaded = true;
						displayGlo(gChildRootRelPathArr);
					}
				});
			}
			else {
				displayGlo(gChildRootRelPathArr);
			}
		}
			else if(flowType == SCR_CHILD_FTS)
				ftsContextLoaded(gChildRootRelPathArr);
			else if(flowType == SCR_CHILD_CSH)
				loadCSH(gChildRootRelPathArr);
	}

	window.loadProjDataForSyncing = function (flowType, rootRelPath, commonRootRelPath, childName)
	{
		var projDataFile = rootRelPath + "/" + gProjDataFile;
		var projDataCBObj = new projDataCallBackObj(flowType, commonRootRelPath, rootRelPath, childName);
		xmlJsReader.loadFile(projDataFile, callbackProjDataLoadedForSyncing, projDataCBObj);
	}
	function callbackProjDataLoadedForSyncing(xmlDoc, projDataCBObj)
	{
		returnProjDataCallForSyncing(projDataCBObj.flowType, xmlDoc, projDataCBObj);
	}
	window.returnProjDataCallForSyncing = function (flowType, data, projDataCBObj)
	{
		var rootRelPath = null;
		var commonRootRelPath = null;
		var childName = null;
		if(projDataCBObj != null)
		{
			rootRelPath = projDataCBObj.rootRelPath;
			commonRootRelPath = projDataCBObj.commonRootRelPath;
			childName = projDataCBObj.data;
		}
		extractParentProjInfo(flowType, data, rootRelPath, commonRootRelPath, childName);
	}

	function extractParentProjInfo(flowType, projXmlDoc, rootRelPath, commonRootRelPath, childName)
	{
		
		if(projXmlDoc == null || commonRootRelPath == null || rootRelPath == null)
		{
			if(flowType == SCR_PARENT_BC)
				writeBreadCrumbs();
			else if(flowType == SCR_PARENT_TOCSYNC)
				syncToc(gTocChildPrefixStr, gTocChildOrder);
			return;
		}
		var projXmlNode = projXmlDoc.getElementsByTagName(PROJNODE)[0];
		var remoteNodes = projXmlNode.getElementsByTagName(REMOTENODE);
		var len = remoteNodes.length;
		for(var i=0; i<len; i++)
		{
			var remoteNode = remoteNodes[i];
			var remoteChildName = remoteNode.getAttribute(CHILDNAME);
			if(remoteChildName == childName)
			{	
				if(flowType == SCR_PARENT_BC)
					extractParentProjBCInfo(remoteNode, rootRelPath);
				else if(flowType == SCR_PARENT_TOCSYNC)
					extractParentProjTocSyncInfo(remoteNode, rootRelPath);
				break;
			}
		}
		loadParentDataForSyncing(commonRootRelPath, flowType);
	}
	function extractParentProjBCInfo(remoteNode, rootRelPath)
	{
		var breadCrumbsNodes = remoteNode.getElementsByTagName(BREADCRUMBSNODE);
		if(breadCrumbsNodes.length == 1)
		{
			var bcNode = breadCrumbsNodes[0];
			var itemNodes = bcNode.getElementsByTagName(ITEMNODE);
			var itemsCount = itemNodes.length;
			var strTrail = "";

			for(var j=itemsCount-1; j>=0; j--)
			{
				var itemNode = itemNodes[j];
				var bcName= itemNode.getAttribute(NAME);
				var url = itemNode.getAttribute(URL);

				bcName = bcName.replace(/\\\\/g, '\\'); 

				var strLink = "";
				if(url != "")
				{
				   strLink = _getFullPath(rootRelPath + "/", url); 
				}
				for(var k=0;k<gBCId;k++) 
				{
					var bclink = new Object();
					bclink.name = bcName;
					bclink.strLink = strLink;
					bclink.firstEntry = (j==0?true:false);
					gBreadCrumbInfo[k].bcLinks.push(bclink);
				}
			}	
		}
	}

	function extractParentProjTocSyncInfo(remoteNode)
	{
		var childId = remoteNode.getAttribute(CHILDID);
		var pos = childId.indexOf("#");
		var childOrder = "";
		var prefix = "";
		if(pos != -1)
			childOrder = childId.substring(pos+1, childId.length);
		pos = childId.lastIndexOf(".");
		if(pos != -1)
			prefix = childId.substring(0, pos);
			
		if(gTocChildPrefixStr == "")
			gTocChildPrefixStr = prefix;
		else
		{
			var splitArr = gTocChildPrefixStr.split(BOOKDELIM);
			for(var i=0; i<splitArr.length; i++)
			{
				pos = splitArr[i].indexOf(TOCCHILDIDPREFIX);
				if(pos == -1)
					splitArr[i] += TOCCHILDIDPREFIX + childOrder;
				else
					splitArr[i] = splitArr[i].substring(0,pos) + TOCCHILDIDPREFIX + childOrder + splitArr[i].substring(pos);
			}
			gTocChildPrefixStr = splitArr.join(BOOKDELIM);
			if(prefix != "")
				prefix += BOOKDELIM;
			gTocChildPrefixStr = prefix + gTocChildPrefixStr;
		}
		if(gTocChildOrder == "")
			gTocChildOrder = TOCCHILDIDPREFIX + childOrder;
		else
			gTocChildOrder  = TOCCHILDIDPREFIX + childOrder + gTocChildOrder;

		}
}
)();