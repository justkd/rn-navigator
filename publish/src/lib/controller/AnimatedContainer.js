"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AnimatedContainer=void 0;const jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),react_native_1=require("react-native"),Navigation_ErrorView_1=require("../error/Navigation.ErrorView");function AnimatedContainer(props){const{routes:routes,state:state,animT:animT,animO:animO}=props,{width:width}=(0,react_native_1.useWindowDimensions)(),CurrentView=(0,react_1.useMemo)((()=>{const key=state.queue[0]?.to,Current=routes[key];return Current?(0,jsx_runtime_1.jsx)(Current,{}):(0,jsx_runtime_1.jsx)(Navigation_ErrorView_1.NavigationErrorView,{})}),[routes,state]),transform=(0,react_1.useMemo)((()=>[{translateX:animT.interpolate({inputRange:[0,1],outputRange:[width,0]})}]),[animT,width]);return(0,jsx_runtime_1.jsx)(react_native_1.Animated.View,{pointerEvents:state.isNavigating?"none":"auto",style:{height:"100%",width:"100%",opacity:animO,transform:transform},children:CurrentView})}exports.AnimatedContainer=AnimatedContainer;