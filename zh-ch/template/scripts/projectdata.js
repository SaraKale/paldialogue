// Publish project specific data
(function() {
rh = window.rh;
model = rh.model;

rh.consts('DEFAULT_TOPIC', encodeURI("#Paltoc-sc/index.htm".substring(1)));
rh.consts('HOME_FILEPATH', encodeURI("index.htm"));
rh.consts('START_FILEPATH', encodeURI('index.htm'));
rh.consts('HELP_ID', '1FE55100-6F1B-4217-B99E-14FB858C654B' || 'preview');
rh.consts('LNG_STOP_WORDS', ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "after", "all", "along", "already", "also", "am", "among", "an", "and", "another", "any", "are", "at", "be", "because", "been", "between", "but", "by", "can", "do", "does", "doesn", "done", "each", "either", "for", "from", "get", "has", "have", "here", "how", "i", "if", "in", "into", "is", "isn", "it", "like", "may", "maybe", "more", "must", "need", "non", "not", "of", "ok", "okay", "on", "or", "other", "rather", "re", "s", "same", "see", "so", "some", "such", "t", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "those", "to", "too", "unless", "use", "used", "using", "ve", "want", "was", "way", "were", "what", "when", "when", "whenever", "where", "whether", "which", "will", "with", "within", "without", "yet", "you", "your"]);
rh.consts('LNG_SUBSTR_SEARCH', 1);

model.publish(rh.consts('KEY_DIR'), "ltr");
model.publish(rh.consts('KEY_LNG_NAME'), "zh_CN");
model.publish(rh.consts('KEY_LNG'), {"SearchResultsPerScreen":"每页显示的搜索结果数","Reset":"重置","SyncToc":"同步目录","HomeButton":"主页","WebSearchButton":"WebSearch","GlossaryFilterTerms":"查找字词","HighlightSearchResults":"突出显示搜索结果","ApplyTip":"应用","Welcome_header":"欢迎使用帮助中心","WebSearch":"WebSearch","Show":"显示","ShowAll":"显示全部","EnableAndSearch":"显示包含所有搜索字的结果","Welcome_text":"您需要哪方面的帮助？","Next":">>","PreviousLabel":"上一页","NoScriptErrorMsg":"要查看此页面，需要在浏览器中启用 JavaScript 支持。","Print":"打印","Contents":"目录","Search":"搜索","Hide":"隐藏","Canceled":"已取消","ShowHide":"显示/隐藏","Loading":"正在加载…","EndOfResults":"搜索结果结尾。","favoritesLabel":"收藏夹","Logo":"徽标","ContentFilterChanged":"内容过滤器已更改，请重新搜索","SidebarToggleTip":"展开/折叠","Logo/Author":"提供方:","JS_alert_LoadXmlFailed":"错误: 未能加载 xml 文件。","Searching":"正在搜索...","SearchTitle":"搜索","Copyright":"© 版权所有 2017。保留所有权利。","favoritesNameLabel":"名称","Disabled Next":">>","JS_alert_InitDatabaseFailed":"错误: 未能初始化数据库。","Cancel":"取消","unsetAsFavorite":"从收藏夹移除","nofavoritesFound":"您尚未将任何页面标记为收藏页面。","UnknownError":"未知错误","ResultsFoundText":"找到 %1 个与 %2 相符的结果。","FilterIntro":"请选择您的过滤器:","Index":"索引","Seperate":"|","SearchPageTitle":"搜索结果","TopicsNotFound":"未找到主题。","setAsFavorites":"添加到收藏夹","setAsFavorite":"设置为收藏页面","Glossary":"术语表","Filter":"过滤","SearchButtonTitle":"搜索","NextLabel":"下一页","TableOfContents":"目录","HideAll":"隐藏全部","Disabled Prev":"<<","SearchOptions":"搜索选项","Back":"返回","Prev":"<<","OpenLinkInNewTab":"在新选项卡中打开","JS_alert_InvalidExpression_1":"键入的表达式无效。","IndexFilterKewords":"查找关键词","IeCompatibilityErrorMsg":"本页无法在 Internet Explorer 8 或更早版本中查看.","NavTip":"菜单","ToTopTip":"前往顶部","FavoriteBoxTitle":"收藏夹","ShowTopicInContext":"单击此处以在完整上下文中查看此页"});

model.publish(rh.consts('KEY_HEADER_DEFAULT_TITLE_COLOR'), "#ffffff");
model.publish(rh.consts('KEY_HEADER_DEFAULT_BACKGROUND_COLOR'), "#025172");
model.publish(rh.consts('KEY_LAYOUT_DEFAULT_FONT_FAMILY'), "\"Trebuchet MS\", Arial, sans-serif");

model.publish(rh.consts('KEY_HEADER_TITLE'), "仙剑奇侠传系列剧情对话资料");
model.publish(rh.consts('KEY_HEADER_TITLE_COLOR'), "");
model.publish(rh.consts('KEY_HEADER_BACKGROUND_COLOR'), "");
model.publish(rh.consts('KEY_HEADER_LOGO_PATH'), "");
model.publish(rh.consts('KEY_LAYOUT_FONT_FAMILY'), "");
model.publish(rh.consts('KEY_HEADER_HTML'), "<div class='topic-header'>\
  <div class='logo' onClick='rh._.redirectToLayout()'>\
    <img src='#{logo}' />\
  </div>\
  <div class='nav'>\
    <div class='title' title='#{title}'>\
      <span onClick='rh._.redirectToLayout()'>#{title}</span>\
    </div>\
    <div class='gotohome' title='#{tooltip}' onClick='rh._.redirectToLayout()'>\
      <span>#{label}</span>\
    </div></div>\
  </div>\
<div class='topic-header-shadow'></div>\
");
model.publish(rh.consts('KEY_HEADER_CSS'), ".topic-header { background-color: #{background-color}; color: #{color}; width: calc(100%); height: 3em; position: fixed; left: 0; top: 0; font-family: #{font-family}; display: table; box-sizing: border-box; }\
.topic-header-shadow { height: 3em; width: 100%; }\
.logo { cursor: pointer; padding: 0.2em; height: calc(100% - 0.4em); text-align: center; display: table-cell; vertical-align: middle; }\
.logo img { max-height: 100%; display: block; }\
.nav { width: 100%; display: table-cell; }\
.title { width: 40%; height: 100%; float: left; line-height: 3em; cursor: pointer; }\
.gotohome { width: 60%; float: left; text-align: right; height: 100%; line-height: 3em; cursor: pointer; }\
.title span, .gotohome span { padding: 0em 1em; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; display: block; }");

})();