// Publish project specific data
(function() {
rh = window.rh;
model = rh.model;

rh.consts('DEFAULT_TOPIC', encodeURI("#Paltoc-tc/index.htm".substring(1)));
rh.consts('HOME_FILEPATH', encodeURI("index.htm"));
rh.consts('START_FILEPATH', encodeURI('index.htm'));
rh.consts('HELP_ID', '120099C5-6B6D-472C-8A22-54EB1BEC7137' || 'preview');
rh.consts('LNG_STOP_WORDS', ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "after", "all", "along", "already", "also", "am", "among", "an", "and", "another", "any", "are", "at", "be", "because", "been", "between", "but", "by", "can", "do", "does", "doesn", "done", "each", "either", "for", "from", "get", "has", "have", "here", "how", "i", "if", "in", "into", "is", "isn", "it", "like", "may", "maybe", "more", "must", "need", "non", "not", "of", "ok", "okay", "on", "or", "other", "rather", "re", "s", "same", "see", "so", "some", "such", "t", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "those", "to", "too", "unless", "use", "used", "using", "ve", "want", "was", "way", "were", "what", "when", "when", "whenever", "where", "whether", "which", "will", "with", "within", "without", "yet", "you", "your"]);
rh.consts('LNG_SUBSTR_SEARCH', 1);

model.publish(rh.consts('KEY_DIR'), "ltr");
model.publish(rh.consts('KEY_LNG_NAME'), "zh_TW");
model.publish(rh.consts('KEY_LNG'), {"SearchResultsPerScreen":"每一頁的搜尋結果數目","Reset":"重設","SyncToc":"同步目錄","HomeButton":"主頁","WebSearchButton":"WebSearch","GlossaryFilterTerms":"尋找詞彙","HighlightSearchResults":"高顯搜尋結果","ApplyTip":"套用","Welcome_header":"歡迎來到說明中心","WebSearch":"WebSearch","Show":"顯示","ShowAll":"顯示全部","EnableAndSearch":"顯示包含所有搜尋文字的結果","Welcome_text":"有任何需要協助的嗎？","Next":">>","PreviousLabel":"上一頁","NoScriptErrorMsg":"檢視本頁面需在瀏覽器中啟用 JavaScript 支援。","Print":"列印","Contents":"內容","Search":"搜尋","Hide":"隱藏","Canceled":"已取消","ShowHide":"顯示/隱藏","Loading":"載入中…","EndOfResults":"搜尋結果末尾。","favoritesLabel":"我的最愛","Logo":"標誌","ContentFilterChanged":"內容篩選器已更改，請重新搜尋","SidebarToggleTip":"展開/摺疊","Logo/Author":"提供者:","JS_alert_LoadXmlFailed":"錯誤: 無法載入 xml 檔。","Searching":"正在搜尋...","SearchTitle":"搜尋","Copyright":"© Copyright 2017。著作權所有，並保留一切權利。","favoritesNameLabel":"姓名","Disabled Next":">>","JS_alert_InitDatabaseFailed":"錯誤: 無法初始化資料庫。","Cancel":"取消","unsetAsFavorite":"從我的最愛移除","nofavoritesFound":"您尚未將任何頁面設為我的最愛。","UnknownError":"不明的錯誤","ResultsFoundText":"找到 %1 個 %2 的結果","FilterIntro":"請選取檔案：","Index":"索引","Seperate":"|","SearchPageTitle":"搜尋結果","TopicsNotFound":"未找到任何主題。","setAsFavorites":"加入我的最愛","setAsFavorite":"設為我的最愛","Glossary":"語彙","Filter":"篩選","SearchButtonTitle":"搜索","NextLabel":"下一頁","TableOfContents":"目錄","HideAll":"隱藏全部","Disabled Prev":"<<","SearchOptions":"搜尋選項","Back":"返回","Prev":"<<","OpenLinkInNewTab":"在新索引標籤中開啟","JS_alert_InvalidExpression_1":"您輸入的文字並非有效的運算式。","IndexFilterKewords":"尋找關鍵字","IeCompatibilityErrorMsg":"此網頁無法在 Internet Explorer 8 或較舊版本中檢視.","NavTip":"選單","ToTopTip":"回到最上層","FavoriteBoxTitle":"收藏夾","ShowTopicInContext":"點擊此處查看此頁面的完整內容"});

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