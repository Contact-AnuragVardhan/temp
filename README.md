//this.__list.setAttribute("labelField",this.__labelField);
		this.__list.setAttribute("template","templateDemo");
		//this.__list.__itemRenderer = this.__itemRenderer;
		this.__list.setAttribute("setDataCallBack",setData);
		//this.__list.__setDataCallBack = this.__renderer.setData.bind(this.__renderer);
		this.__list.setAttribute("clearDataCallBack",clearData);
		//this.__list.__clearDataCallBack = this.__renderer.clearData.bind(this.__renderer);
		//this.__renderer.searchString = searchString;
		
		
		
		
		<!-- https://github.com/darylrowland/angucomplete -->
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
 <meta name='viewport' content='width=device-width,initial-scale=1'>
 <script src="lib/com/org/util/nsImport.js"></script>
<style>
  	.hbox 
	{
	  overflow-x:auto;
	}
	
	.hbox > * 
	{
	  display: inline-block;
	   vertical-align: middle;
	  
	}
	
</style>
</head>
<body onload="loadHandler();">
	<template id="templateDemo">
			<div accessor-name="rendererBody" class="hbox">
				<label accessor-name="label"></label>
			</div>
	</template>
 	<nsimport file="nsTextBox.js">
 	</nsimport>

	<ns-TextBox id="txtUserName" placeholder="User Name" style="width:200px;" class="nsTextBox" maxChars="10" restrict="A-Za-z-,">
	</ns-TextBox> 
	<ns-TextBox id="txtPassword" placeholder="Password" style="width:200px;" class="nsTextBox" displayAsPassword="true">
	</ns-TextBox> 
	<ns-TextBox id="txtAutoComplete" placeholder="Search Countries" style="width:200px;" listWidth="300" class="nsTextBox" enableAutoComplete="true" required="true" labelField="name" enableMultipleSelection="true" enableKeyboardNavigation="true" customScrollerRequired="true">
	</ns-TextBox> 
	
	<button onclick="toggleRestrict()">Toggle Restrict</button>
	<button onclick="setText()">Set Text</button>
	
	<script>
	function setData(renderer,item,labelField)
	{
		if(renderer)
		{
			if(item && item[labelField])
			{
				renderer.rendererBody.label.innerHTML = item["id"];
			}
			else
			{
				clearData(renderer);
			}
		}
	}
	
	function clearData(renderer)
	{
		if(renderer)
		{
			renderer.rendererBody.label.innerHTML = "";
		}
	}
	</script>
	
	<script>
	
		function loadHandler()
		{
			ns.onload(function()
			{
				var txtAutoComplete = document.getElementById("txtAutoComplete");
				txtAutoComplete.setDataProvider(countries);
			});	
		}
		
		function toggleRestrict() 
		{
		   // checkValue(document.getElementById("txtDemo1").value);
		   var txtUserName = document.querySelector("#txtUserName");
		   if(!txtUserName.getAttribute("restrict") || txtUserName.getAttribute("restrict") === "null")
		   {
			   txtUserName.setAttribute("restrict","A-Za-z-,");
		   }
		   else
		   {
			   txtUserName.setAttribute("restrict",null);
		   }
		}
		
		function setText() 
		{
		   var txtUserName = document.querySelector("#txtUserName");
		   txtUserName.setText("This is a for a demo");
		}
		
		function checkValue (eleValue) 
		{
		    //var re = new RegExp(/[a-z0-9,\(\)\/\\_\s]+/ig);
		    var re = new RegExp('[a-z0-9,{}]', 'g');
		    return re.test(eleValue);
		} 
		function keyDownHandler(e)
		{
			var e = e || event;
			//var unicode=event.charCode? e.charCode : e.keyCode
			console.log((e.keyCode || e.charCode));
			var actualkey=String.fromCharCode(e.keyCode || e.charCode);
			if(!checkValue(actualkey))
			{
				e.preventDefault();
			}
				
		}
		
		var countries = [
		                    {name: 'Afghanistan', code: 'AF'},
		                    {name: 'Aland Islands', code: 'AX'},
		                    {name: 'Albania', code: 'AL'},
		                    {name: 'Algeria', code: 'DZ'},
		                    {name: 'American Samoa', code: 'AS'},
		                    {name: 'AndorrA', code: 'AD'},
		                    {name: 'Angola', code: 'AO'},
		                    {name: 'Anguilla', code: 'AI'},
		                    {name: 'Antarctica', code: 'AQ'},
		                    {name: 'Antigua and Barbuda', code: 'AG'},
		                    {name: 'Argentina', code: 'AR'},
		                    {name: 'Armenia', code: 'AM'},
		                    {name: 'Aruba', code: 'AW'},
		                    {name: 'Australia', code: 'AU'},
		                    {name: 'Austria', code: 'AT'},
		                    {name: 'Azerbaijan', code: 'AZ'},
		                    {name: 'Bahamas', code: 'BS'},
		                    {name: 'Bahrain', code: 'BH'},
		                    {name: 'Bangladesh', code: 'BD'},
		                    {name: 'Barbados', code: 'BB'},
		                    {name: 'Belarus', code: 'BY'},
		                    {name: 'Belgium', code: 'BE'},
		                    {name: 'Belize', code: 'BZ'},
		                    {name: 'Benin', code: 'BJ'},
		                    {name: 'Bermuda', code: 'BM'},
		                    {name: 'Bhutan', code: 'BT'},
		                    {name: 'Bolivia', code: 'BO'},
		                    {name: 'Bosnia and Herzegovina', code: 'BA'},
		                    {name: 'Botswana', code: 'BW'},
		                    {name: 'Bouvet Island', code: 'BV'},
		                    {name: 'Brazil', code: 'BR'},
		                    {name: 'Brunei Darussalam', code: 'BN'},
		                    {name: 'Bulgaria', code: 'BG'},
		                    {name: 'Burkina Faso', code: 'BF'},
		                    {name: 'Burundi', code: 'BI'},
		                    {name: 'Cambodia', code: 'KH'},
		                    {name: 'Cameroon', code: 'CM'},
		                    {name: 'Canada', code: 'CA'},
		                    {name: 'Cape Verde', code: 'CV'},
		                    {name: 'Cayman Islands', code: 'KY'},
		                    {name: 'Central African Republic', code: 'CF'},
		                    {name: 'Chad', code: 'TD'},
		                    {name: 'Chile', code: 'CL'},
		                    {name: 'China', code: 'CN'},
		                    {name: 'Christmas Island', code: 'CX'},
		                    {name: 'Cocos (Keeling) Islands', code: 'CC'},
		                    {name: 'Colombia', code: 'CO'},
		                    {name: 'Comoros', code: 'KM'},
		                    {name: 'Congo', code: 'CG'},
		                    {name: 'Cook Islands', code: 'CK'},
		                    {name: 'Costa Rica', code: 'CR'},
		                    {name: 'Cote D\'Ivoire', code: 'CI'},
		                    {name: 'Croatia', code: 'HR'},
		                    {name: 'Cuba', code: 'CU'},
		                    {name: 'Cyprus', code: 'CY'},
		                    {name: 'Czech Republic', code: 'CZ'},
		                    {name: 'Denmark', code: 'DK'},
		                    {name: 'Djibouti', code: 'DJ'},
		                    {name: 'Dominica', code: 'DM'},
		                    {name: 'Dominican Republic', code: 'DO'},
		                    {name: 'Ecuador', code: 'EC'},
		                    {name: 'Egypt', code: 'EG'},
		                    {name: 'El Salvador', code: 'SV'},
		                    {name: 'Equatorial Guinea', code: 'GQ'},
		                    {name: 'Eritrea', code: 'ER'},
		                    {name: 'Estonia', code: 'EE'},
		                    {name: 'Ethiopia', code: 'ET'},
		                    {name: 'Falkland Islands (Malvinas)', code: 'FK'},
		                    {name: 'Faroe Islands', code: 'FO'},
		                    {name: 'Fiji', code: 'FJ'},
		                    {name: 'Finland', code: 'FI'},
		                    {name: 'France', code: 'FR'},
		                    {name: 'French Guiana', code: 'GF'},
		                    {name: 'French Polynesia', code: 'PF'},
		                    {name: 'French Southern Territories', code: 'TF'},
		                    {name: 'Gabon', code: 'GA'},
		                    {name: 'Gambia', code: 'GM'},
		                    {name: 'Georgia', code: 'GE'},
		                    {name: 'Germany', code: 'DE'},
		                    {name: 'Ghana', code: 'GH'},
		                    {name: 'Gibraltar', code: 'GI'},
		                    {name: 'Greece', code: 'GR'},
		                    {name: 'Greenland', code: 'GL'},
		                    {name: 'Grenada', code: 'GD'},
		                    {name: 'Guadeloupe', code: 'GP'},
		                    {name: 'Guam', code: 'GU'},
		                    {name: 'Guatemala', code: 'GT'},
		                    {name: 'Guernsey', code: 'GG'},
		                    {name: 'Guinea', code: 'GN'},
		                    {name: 'Guinea-Bissau', code: 'GW'},
		                    {name: 'Guyana', code: 'GY'},
		                    {name: 'Haiti', code: 'HT'},
		                    {name: 'Honduras', code: 'HN'},
		                    {name: 'Hong Kong', code: 'HK'},
		                    {name: 'Hungary', code: 'HU'},
		                    {name: 'Iceland', code: 'IS'},
		                    {name: 'India', code: 'IN'},
		                    {name: 'Indonesia', code: 'ID'},
		                    {name: 'Iraq', code: 'IQ'},
		                    {name: 'Ireland', code: 'IE'},
		                    {name: 'Isle of Man', code: 'IM'},
		                    {name: 'Israel', code: 'IL'},
		                    {name: 'Italy', code: 'IT'},
		                    {name: 'Jamaica', code: 'JM'},
		                    {name: 'Japan', code: 'JP'},
		                    {name: 'Jersey', code: 'JE'},
		                    {name: 'Jordan', code: 'JO'},
		                    {name: 'Kazakhstan', code: 'KZ'},
		                    {name: 'Kenya', code: 'KE'},
		                    {name: 'Kiribati', code: 'KI'},
		                    {name: 'Korea, Republic of', code: 'KR'},
		                    {name: 'Kuwait', code: 'KW'},
		                    {name: 'Kyrgyzstan', code: 'KG'},
		                    {name: 'Latvia', code: 'LV'},
		                    {name: 'Lebanon', code: 'LB'},
		                    {name: 'Lesotho', code: 'LS'},
		                    {name: 'Liberia', code: 'LR'},
		                    {name: 'Libyan Arab Jamahiriya', code: 'LY'},
		                    {name: 'Liechtenstein', code: 'LI'},
		                    {name: 'Lithuania', code: 'LT'},
		                    {name: 'Luxembourg', code: 'LU'},
		                    {name: 'Macao', code: 'MO'},
		                    {name: 'Madagascar', code: 'MG'},
		                    {name: 'Malawi', code: 'MW'},
		                    {name: 'Malaysia', code: 'MY'},
		                    {name: 'Maldives', code: 'MV'},
		                    {name: 'Mali', code: 'ML'},
		                    {name: 'Malta', code: 'MT'},
		                    {name: 'Marshall Islands', code: 'MH'},
		                    {name: 'Martinique', code: 'MQ'},
		                    {name: 'Mauritania', code: 'MR'},
		                    {name: 'Mauritius', code: 'MU'},
		                    {name: 'Mayotte', code: 'YT'},
		                    {name: 'Mexico', code: 'MX'},
		                    {name: 'Moldova, Republic of', code: 'MD'},
		                    {name: 'Monaco', code: 'MC'},
		                    {name: 'Mongolia', code: 'MN'},
		                    {name: 'Montserrat', code: 'MS'},
		                    {name: 'Morocco', code: 'MA'},
		                    {name: 'Mozambique', code: 'MZ'},
		                    {name: 'Myanmar', code: 'MM'},
		                    {name: 'Namibia', code: 'NA'},
		                    {name: 'Nauru', code: 'NR'},
		                    {name: 'Nepal', code: 'NP'},
		                    {name: 'Netherlands', code: 'NL'},
		                    {name: 'Netherlands Antilles', code: 'AN'},
		                    {name: 'New Caledonia', code: 'NC'},
		                    {name: 'New Zealand', code: 'NZ'},
		                    {name: 'Nicaragua', code: 'NI'},
		                    {name: 'Niger', code: 'NE'},
		                    {name: 'Nigeria', code: 'NG'},
		                    {name: 'Niue', code: 'NU'},
		                    {name: 'Norfolk Island', code: 'NF'},
		                    {name: 'Northern Mariana Islands', code: 'MP'},
		                    {name: 'Norway', code: 'NO'},
		                    {name: 'Oman', code: 'OM'},
		                    {name: 'Pakistan', code: 'PK'},
		                    {name: 'Palau', code: 'PW'},
		                    {name: 'Palestinian Territory, Occupied', code: 'PS'},
		                    {name: 'Panama', code: 'PA'},
		                    {name: 'Papua New Guinea', code: 'PG'},
		                    {name: 'Paraguay', code: 'PY'},
		                    {name: 'Peru', code: 'PE'},
		                    {name: 'Philippines', code: 'PH'},
		                    {name: 'Pitcairn', code: 'PN'},
		                    {name: 'Poland', code: 'PL'},
		                    {name: 'Portugal', code: 'PT'},
		                    {name: 'Puerto Rico', code: 'PR'},
		                    {name: 'Qatar', code: 'QA'},
		                    {name: 'Reunion', code: 'RE'},
		                    {name: 'Romania', code: 'RO'},
		                    {name: 'Russian Federation', code: 'RU'},
		                    {name: 'RWANDA', code: 'RW'},
		                    {name: 'Saint Helena', code: 'SH'},
		                    {name: 'Saint Kitts and Nevis', code: 'KN'},
		                    {name: 'Saint Lucia', code: 'LC'},
		                    {name: 'Saint Pierre and Miquelon', code: 'PM'},
		                    {name: 'Samoa', code: 'WS'},
		                    {name: 'San Marino', code: 'SM'},
		                    {name: 'Sao Tome and Principe', code: 'ST'},
		                    {name: 'Saudi Arabia', code: 'SA'},
		                    {name: 'Senegal', code: 'SN'},
		                    {name: 'Serbia and Montenegro', code: 'CS'},
		                    {name: 'Seychelles', code: 'SC'},
		                    {name: 'Sierra Leone', code: 'SL'},
		                    {name: 'Singapore', code: 'SG'},
		                    {name: 'Slovakia', code: 'SK'},
		                    {name: 'Slovenia', code: 'SI'},
		                    {name: 'Solomon Islands', code: 'SB'},
		                    {name: 'Somalia', code: 'SO'},
		                    {name: 'South Africa', code: 'ZA'},
		                    {name: 'Spain', code: 'ES'},
		                    {name: 'Sri Lanka', code: 'LK'},
		                    {name: 'Sudan', code: 'SD'},
		                    {name: 'Suriname', code: 'SR'},
		                    {name: 'Svalbard and Jan Mayen', code: 'SJ'},
		                    {name: 'Swaziland', code: 'SZ'},
		                    {name: 'Sweden', code: 'SE'},
		                    {name: 'Switzerland', code: 'CH'},
		                    {name: 'Syrian Arab Republic', code: 'SY'},
		                    {name: 'Tajikistan', code: 'TJ'},
		                    {name: 'Thailand', code: 'TH'},
		                    {name: 'Timor-Leste', code: 'TL'},
		                    {name: 'Togo', code: 'TG'},
		                    {name: 'Tokelau', code: 'TK'},
		                    {name: 'Tonga', code: 'TO'},
		                    {name: 'Trinidad and Tobago', code: 'TT'},
		                    {name: 'Tunisia', code: 'TN'},
		                    {name: 'Turkey', code: 'TR'},
		                    {name: 'Turkmenistan', code: 'TM'},
		                    {name: 'Tuvalu', code: 'TV'},
		                    {name: 'Uganda', code: 'UG'},
		                    {name: 'Ukraine', code: 'UA'},
		                    {name: 'United Arab Emirates', code: 'AE'},
		                    {name: 'United Kingdom', code: 'GB'},
		                    {name: 'United States', code: 'US'},
		                    {name: 'Uruguay', code: 'UY'},
		                    {name: 'Uzbekistan', code: 'UZ'},
		                    {name: 'Vanuatu', code: 'VU'},
		                    {name: 'Venezuela', code: 'VE'},
		                    {name: 'Vietnam', code: 'VN'},
		                    {name: 'Virgin Islands, British', code: 'VG'},
		                    {name: 'Virgin Islands, U.S.', code: 'VI'},
		                    {name: 'Wallis and Futuna', code: 'WF'},
		                    {name: 'Western Sahara', code: 'EH'},
		                    {name: 'Yemen', code: 'YE'},
		                    {name: 'Zambia', code: 'ZM'},
		                    {name: 'Zimbabwe', code: 'ZW'}
		                ];
		
	
	
	</script>

</body>
</html>
