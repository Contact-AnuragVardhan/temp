package
{
	import flash.events.MouseEvent;
	
	import mx.collections.ArrayCollection;
	import mx.controls.Alert;
	import mx.controls.Button;
	import mx.controls.ButtonBar;
	import mx.core.IFlexDisplayObject;
	import mx.core.mx_internal;
	
	use namespace mx_internal;
	
	public class ExButtonBar extends ButtonBar
	{
		private var _btnAdd:Button;
		
		public function ExButtonBar()
		{
			super();
		}
		
		public override function set dataProvider(value:Object):void
		{
			if(value && value is ArrayCollection && ArrayCollection(value).length > 0 && ArrayCollection(value).getItemAt(0)[labelField] != "+")
			{
				ArrayCollection(value).addItemAt({label:"+",year:""},0);
			}
			super.dataProvider = value;
		}
		
		protected override function createChildren():void
		{
			super.createChildren();
			
		}
		
		protected override function createNavItem(label:String,icon:Class = null):IFlexDisplayObject
		{
			if(label == "+")
			{
				_btnAdd = super.createNavItem(label,icon) as Button;
				_btnAdd.removeEventListener(MouseEvent.CLICK, clickHandler);
				_btnAdd.addEventListener(MouseEvent.CLICK, btnAdd_clickHandler);
				return _btnAdd;
			}
			return super.createNavItem(label,icon);
		}
		
		protected override function resetNavItems():void
		{
			super.resetNavItems();
		}
		
		protected function btnAdd_clickHandler(event:MouseEvent):void
		{
			if(this.dataProvider && this.dataProvider.length > 1)
			{
				var lastItem:Object = ArrayCollection(this.dataProvider).getItemAt(1);
				if(lastItem && lastItem.hasOwnProperty("year") && lastItem["year"])
				{
					var year:int = int(lastItem.year);
					var nextYear:int = year + 1;
					ArrayCollection(this.dataProvider).addItemAt({label:nextYear.toString(),year:nextYear},1);
				}
			}
		}
	}
}