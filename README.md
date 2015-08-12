https://github.com/mmurph211/Autocomplete
//Utility for Search,Filter--can be used in datagrid
https://github.com/javve/list.js
http://joehewitt.github.io/scrollability/tableview.html
http://cubiq.org/dropbox/iscroll4/examples/simple/
------------------------------------------------------------------------------------------------------
nsList.setSelectedIndex = function(selectedIndex)
{
	if(selectedIndex > -1 && this.__dataProvider && selectedIndex < this.__dataProvider.length)
	{
		this.__outerContainer.scrollTop = parseInt(selectedIndex) * this.__listItemHeight;
		this.__scrollHandler.reference(this);
	}
};

