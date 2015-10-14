._720kb-tooltip {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  position: absolute;
  z-index: 9;
  padding: 0.4% 1%;
  opacity: 0;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  left: -200%;
  top: 0;
  max-width: 200px;
}

._720kb-tooltip-title {
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  width: 100%;
  clear: both;
}

._720kb-tooltip._720kb-tooltip-small {
  padding: 4.5px 10px;
  font-size: 12px;
}

._720kb-tooltip._720kb-tooltip-medium {
  padding: 7px 15px;
  font-size: 13.5px;
}

._720kb-tooltip._720kb-tooltip-large {
  padding: 10px 20px;
  font-size: 14px;
}

._720kb-tooltip._720kb-tooltip-open {
  visibility: visible;
  opacity: 1;
}

._720kb-tooltip-caret:before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid rgba(0, 0, 0, 0.8);
}

._720kb-tooltip-left ._720kb-tooltip-caret:before {
  top: 70%;
  left: 100%;
  margin-left: 0;
  margin-top: -6px;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-right-width: 0;
}

._720kb-tooltip-right ._720kb-tooltip-caret:before {
  top: 30%;
  left: 0;
  margin-left: -6px;
  margin-top: -6px;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left-width: 0;
}

._720kb-tooltip-top ._720kb-tooltip-caret:before {
  top: 100%;
  left: 70%;
  margin-left: -6px;
  margin-bottom: -6px;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-width: 0;
}

._720kb-tooltip-bottom ._720kb-tooltip-caret:before {
  bottom: 100%;
  left: 50%;
  margin-left: -6px;
  border-right-color: transparent;
  border-left-color: transparent;
  border-top-width: 0;
}

._720kb-tooltip-close-button {
  float: right;
}
