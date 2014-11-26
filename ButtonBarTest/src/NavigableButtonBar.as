package
{
	import flash.events.MouseEvent;
	
	import mx.collections.ArrayCollection;
	import mx.collections.IList;
	import mx.utils.StringUtil;
	
	import spark.components.Button;
	import spark.components.ButtonBar;
	import spark.components.HGroup;
	import spark.events.IndexChangeEvent;
	
	[Event(name="changing", type="spark.events.IndexChangeEvent")]
	[Event(name="change", type="spark.events.IndexChangeEvent")]
	[Event(name="caretChange", type="spark.events.IndexChangeEvent")]
	
	public class NavigableButtonBar extends HGroup
	{
		protected var btnNavPrev:Button;
		protected var btnAdd:Button;
		protected var bbNavigation:ButtonBar;
		protected var btnNavNext:Button;
		
		protected var currentIndex:int = 0;
		
		private var dataProviderChanged:Boolean = false;
		private var _dataProvider:IList;
		public function set dataProvider(value:IList):void
		{
			_dataProvider = value;
			dataProviderChanged = true;
			invalidateProperties();
		}
		public function get dataProvider():IList
		{       
			return _dataProvider;
		}
		
		private var labelFieldChanged:Boolean = false;
		private var _labelField:String;
		public function set labelField(value:String):void
		{
			_labelField = value;
			labelFieldChanged = true;
			invalidateProperties();
		}
		public function get labelField():String
		{
			return _labelField;
		}
		
		private var valueFieldChanged:Boolean = false;
		private var _valueField:String;
		public function set valueField(value:String):void
		{
			_valueField = value;
			valueFieldChanged = true;
			invalidateProperties();
		}
		public function get valueField():String
		{
			return _valueField;
		}
		
		private var maxTabShownChanged:Boolean = false;
		private var _maxTabShown:int = 3;
		public function set maxTabShown(value:int):void
		{
			_maxTabShown = value;
			maxTabShownChanged = true;
			invalidateProperties();
		}
		public function get maxTabShown():int
		{
			return _maxTabShown;
		}
		
		private var _newItemCallBack:Function;
		public function set newItemCallBack(value:Function):void
		{
			_newItemCallBack = value;
		}
		public function get newItemCallBack():Function
		{
			return _newItemCallBack;
		}
		
		protected override function commitProperties():void
		{
			super.commitProperties();
			if(dataProviderChanged)
			{
				dataProviderChanged = false;
				setButtonBarDataProvider();
			}
			if(labelFieldChanged)
			{
				dataProviderChanged = false;
				bbNavigation.labelField = this.labelField;
			}
		}
		
		
		public function NavigableButtonBar()
		{
			super();
		}
		
		protected override function createChildren():void
		{
			super.createChildren();
			if(!btnNavPrev)
			{
				btnNavPrev = new Button();
				btnNavPrev.buttonMode = true;
				btnNavPrev.label = "<";
				btnNavPrev.addEventListener(MouseEvent.CLICK, btnNavPrev_clickHandler);
				this.addElement(btnNavPrev);
			}
			if(!btnAdd)
			{
				btnAdd = new Button();
				btnAdd.label = "+" ;
				btnAdd.addEventListener(MouseEvent.CLICK, btnAdd_clickHandler);
				this.addElement(btnAdd);
			}
			if(!bbNavigation)
			{
				bbNavigation = new ButtonBar();
				bbNavigation.addEventListener(IndexChangeEvent.CHANGING , bbNavigation_eventHandler);
				bbNavigation.addEventListener(IndexChangeEvent.CHANGE , bbNavigation_eventHandler);
				bbNavigation.addEventListener(IndexChangeEvent.CARET_CHANGE , bbNavigation_eventHandler);
				this.addElement(bbNavigation);
			}
			if(!btnNavNext)
			{
				btnNavNext = new Button();
				btnNavNext.buttonMode = true;
				btnNavNext.label = ">";
				btnNavNext.addEventListener(MouseEvent.CLICK, btnNavNext_clickHandler);
				this.addElement(btnNavNext);
			}
		}
		
		protected function setButtonBarDataProvider():void
		{
			if(this.dataProvider && this.dataProvider.length > maxTabShown)
			{
				var arrColl:ArrayCollection = new ArrayCollection(this.dataProvider.toArray().slice(currentIndex,currentIndex + maxTabShown));
				bbNavigation.dataProvider = arrColl;
			}
			else
			{
				bbNavigation.dataProvider = this.dataProvider;
			}
		}
		
		protected function btnAdd_clickHandler(event:MouseEvent):void
		{
			if(this.dataProvider && this.dataProvider.length > 0 && this.newItemCallBack!=null)
			{
				var lastItem:Object = this.dataProvider.getItemAt(0);
				var newItem:Object = this.newItemCallBack(lastItem);
				if(newItem)
				{
					this.dataProvider.addItemAt(newItem,0);
					currentIndex = 0;
					setButtonBarDataProvider();
				}
			}
		}
		
		protected function btnNavPrev_clickHandler(event:MouseEvent):void
		{
			var nextIndex:int = currentIndex - 1;
			if(isNavigable(nextIndex))
			{
				currentIndex --;
				setButtonBarDataProvider();
			}
			else
			{
				navigateToTab(false);
			}
		}
		
		protected function btnNavNext_clickHandler(event:MouseEvent):void
		{
			var nextIndex:int = currentIndex + 1;
			if(isNavigable(nextIndex))
			{
				currentIndex ++;
				setButtonBarDataProvider();
			}
			else
			{
				navigateToTab(true);
			}
		}
		
		protected function bbNavigation_eventHandler(event:IndexChangeEvent):void
		{
			if(StringUtil.trim(valueField).length > 0 && event.newIndex > -1)
			{
				event.newIndex = getRelativeIndex(event.newIndex);
				event.oldIndex = getRelativeIndex(event.oldIndex);
			}
			dispatchEvent(event);
		}
		
		protected function isNavigable(checkIndex:int):Boolean
		{
			if(this.dataProvider && this.dataProvider.length >= (checkIndex + maxTabShown) && checkIndex > -1)
			{
				return true;
			}
			return false;
		}
		
		protected function navigateToTab(isNext:Boolean):void
		{
			var isDispatchEvent:Boolean = false;
			var oldIndex:int = -1;
			if(bbNavigation.dataProvider && bbNavigation.dataProvider.length > 0)
			{
				if(isNext)
				{
					if(bbNavigation.selectedIndex < bbNavigation.dataProvider.length - 1)
					{
						isDispatchEvent = true;
						oldIndex = bbNavigation.selectedIndex;
						bbNavigation.selectedIndex ++;
					}
				}
				else
				{
					if(bbNavigation.selectedIndex > 0)
					{
						isDispatchEvent = true;
						oldIndex = bbNavigation.selectedIndex;
						bbNavigation.selectedIndex --;
					}	
				}
				if(isDispatchEvent)
				{
					var event:IndexChangeEvent = new IndexChangeEvent(IndexChangeEvent.CHANGE);
					event.oldIndex = getRelativeIndex(oldIndex);
					event.newIndex = getRelativeIndex(bbNavigation.selectedIndex);
					dispatchEvent(event);
				}
			}
		}
		
		protected function getRelativeIndex(index:int):int
		{
			if(this.dataProvider && this.dataProvider.length > 0 && bbNavigation.dataProvider && bbNavigation.dataProvider.length > index && index > -1)
			{
				var selectedItem:Object = bbNavigation.dataProvider.getItemAt(index);
				if(selectedItem && selectedItem.hasOwnProperty(valueField) && selectedItem[valueField] != null)
				{
					for(var count:int= 0;count < this.dataProvider.length ; count++)
					{
						var item:Object = this.dataProvider.getItemAt(count);
						if(item && item.hasOwnProperty(valueField) && item[valueField] == selectedItem[valueField])
						{
							return count;
						}
					}
				}
			}
			return -1;
		}
		
		
	}
}