



/** page structure **/
/*#w {
  display: block;
  width: 750px;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 45px;
}*/

/*#content {
  display: block;
  width: 100%;
  background: #fff;
  padding: 25px 20px;
  padding-bottom: 35px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}*/



/** tooltip styles
  * based on http://www.flatypo.net/tutorials/how-to-create-animated-tooltips-css3-hiperlink/ 
 **/
a.tooltip{
  position: relative;
  display: inline;
}
a.tooltip:after{
  display: block;
  visibility: hidden;
  position: absolute;
  bottom: 0;
  left: 20%;
  opacity: 0;
  content: attr(data-tool); /* might also use attr(title) */
  height: auto;
  min-width: 100px;
  padding: 5px 8px;
  z-index: 999;
  color: #fff;
  text-decoration: none;
  text-align: center;
  background: rgba(0,0,0,0.85);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

a.tooltip:before {
  position: absolute;
  visibility: hidden;
  width: 0;
  height: 0;
  left: 50%;
  bottom: 0px;
  opacity: 0;
  content: "";
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: rgba(0,0,0,0.85) transparent transparent transparent;
}
a.tooltip:hover:after{ visibility: visible; opacity: 1; bottom: 20px; }
a.tooltip:hover:before{ visibility: visible; opacity: 1; bottom: 14px; }

a.tooltip.animate:after, a.tooltip.animate:before {
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}


/* tips on bottom */
a.tooltip.bottom:after { bottom: auto; top: 0; }
a.tooltip.bottom:hover:after { top: 28px; }
a.tooltip.bottom:before {
  border-width: 0 5px 8.7px 5px;
  border-color: transparent transparent rgba(0,0,0,0.85) transparent;
  top: 0px
}
a.tooltip.bottom:hover:before { top: 20px; }


/* tips on the right */
a.tooltip.right:after { left: 100%; bottom: -45%; }
a.tooltip.right:hover:after { left: 110%; bottom: -45%; }
a.tooltip.right:before {
  border-width: 5px 10px 5px 0;
  border-color: transparent rgba(0,0,0,0.85) transparent transparent;
  left: 90%;
  bottom: 2%;
}
a.tooltip.right:hover:before { left: 100%; bottom: 2%; }


/* tips on the left */
a.tooltip.left:after { left: auto; right: 100%; bottom: -45%; }
a.tooltip.left:hover:after { right: 110%; bottom: -45%; }
a.tooltip.left:before {
  border-width: 5px 0 5px 10px;
  border-color: transparent transparent transparent rgba(0,0,0,0.85);
  left: auto;
  right: 90%;
  bottom: 2%;
}
a.tooltip.left:hover:before { right: 100%; bottom: 2%; }


/* tooltip colors (add your own!) */
a.tooltip.blue:after { background:rgba(46,182,238,.8); }
a.tooltip.blue:before { border-color: rgba(46,182,238,.8) transparent transparent transparent; }
a.tooltip.bottom.blue:before{ border-color: transparent transparent rgba(46,182,238,.8) transparent; }
a.tooltip.right.blue:before { border-color: transparent rgba(46,182,238,.8) transparent transparent; }
a.tooltip.left.blue:before { border-color: transparent transparent transparent rgba(46,182,238,.8); }



/* input field tooltips */
input + .fieldtip {
  visibility: hidden;
  position: relative;
  bottom: 0;
  left: 15px;
  opacity: 0;
  content: attr(data-tool);
  height: auto;
  min-width: 100px;
  padding: 5px 8px;
  z-index: 9999;
	padding:10px 5px; /* padding */
	color:#fff; /* text color */
	font:bold 75%/1.5 Arial, Helvetica, sans-serif; /* font */
	text-align:center; /* center text */
	pointer-events:none; /* no unintended tooltip popup for modern browsers */
	border-radius:6px; /* round corners */
	text-shadow:1px 1px 2px rgba(0, 0, 0, 0.6); /* text shadow */
	background:rgb(46,182,238); /* IE6/7/8 */
	background:rgba(46,182,238,.8); /* modern browsers */
	border:2px solid rgb(255,255,255); /* IE6/7/8 */
	border:2px solid rgba(255,255,255,.8); /* modern browsers */
	box-shadow:0px 2px 4px rgba(0,0,0,0.5); /* shadow */
	-webkit-transition:all 0.3s ease-in-out; /* animate tooltip */
	-moz-transition:all 0.3s ease-in-out; /* animate tooltip */
	-o-transition:all 0.3s ease-in-out; /* animate tooltip */
	-ms-transition:all 0.3s ease-in-out; /* animate tooltip */
	transition:all 0.3s ease-in-out; /* animate tooltip */
}

input + .fieldtip:after {
  display: block;
  position: absolute;
  visibility: hidden;
  content:'';
  width: 0;
  height: 0;
  top: 8px;
  left: -8px;
  border-style: solid;
   margin-left:-15px;
  border-width: 10px;
  border-color: transparent rgba(46,182,238,.8) transparent transparent;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}



input:focus + .fieldtip, input:focus + .fieldtip:after {
  visibility: visible;
  opacity: 1;
}


/** clearfix **/
