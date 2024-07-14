// ==UserScript==
// @name         BetterChannelPage
// @namespace    http://github.com/prettycrunchyguy
// @version      2024-07-13
// @description  youtube is making bad changes and it makes me go grrr
// @author       crunchyguy
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    //let already = false;
    let delay = 500;
    let delay1 = delay;
    function BetterChannelPage(){
        console.log("betterchannelpage started");
        //already = false;
        // see which tab was selected
        if (delay1 == 0){
            let e = document.getElementsByClassName("yt-tab-group-shape-wiz__slider")[0];
        }
        delay1 = delay;
        // see if youtube is on a channel link
        if (location.href.includes("youtube.com/@") || location.href.includes("youtube.com/c/") || location.href.includes("youtube.com/channel/")){
            console.log("betterchannelpage working.");
            let a = document.getElementsByClassName("yt-tab-group-shape-wiz__tabs")[0]; // tabs list
            let b = document.getElementsByClassName("yt-tab-shape-wiz yt-tab-shape-wiz__tab--last-tab")[0]; // search button
            let c = document.createElement("yt-tab-shape"); // channels tab
            let d = document.getElementsByClassName("yt-tab-shape-wiz yt-tab-shape-wiz--host-clickable")[0]; // home tab
            let e = document.getElementsByClassName("yt-tab-group-shape-wiz__slider")[0]; // slider
            c.innerHTML = '<div class="yt-tab-shape-wiz__tab">Channels</div><div class="yt-tab-shape-wiz__tab-bar"></div>'
            c.setAttribute("class","yt-tab-shape-wiz yt-tab-shape-wiz--host-clickable");
            c.setAttribute("role","tab");
            c.setAttribute("aria-selected","false");
            c.setAttribute("tabindex","0");
            c.setAttribute("tab-title","Channels");
            c.onclick = function(){
                //already = true;
                a.removeChild(c);
                delay1 = 0;
                if (location.href.split("/").length == 4){
                    history.pushState({id:100},"",location.href+"/channels") // what does id mean??
                }else{
                    //location.href = location.href.replace(location.href.split("/")[4],"channels")
                    history.pushState({id:100},"",location.href.replace(location.href.split("/")[4],"channels")) // what does id mean??
                }
            }
            //c.id = "BCP-channels"
            b.insertAdjacentElement("beforebegin",c);
            if (location.href.endsWith("/channels")){
                console.log("betterchannelpage on channels tab");
                c.setAttribute("aria-selected","true");
                d.setAttribute("aria-selected","false");
                c.innerHTML = '<div class="yt-tab-shape-wiz__tab yt-tab-shape-wiz__tab--tab-selected">Channels</div><div class="yt-tab-shape-wiz__tab-bar yt-tab-shape-wiz__tab-bar--tab-bar-selected"></div>'
                d.children[0].setAttribute("class","yt-tab-shape-wiz__tab");
                d.children[1].setAttribute("class","yt-tab-shape-wiz__tab-bar");
                e.setAttribute("style","width:"+c.clientWidth+"px;transform:translateX("+c.offsetLeft+"px);");
                let tabs = document.getElementsByClassName("yt-tab-shape-wiz yt-tab-shape-wiz--host-clickable"); // all tabs
                for (let i = 0; i < length; i++){
                    tabs[i].addEventListener("click",function(event){
                        e.setAttribute("style","width:"+tabs[i].clientWidth+"px;transform:translateX("+tabs[i].offsetLeft+"px);")
                        // switch the slider when clicking on a tab
                    })
                }
            }
            //a.appendChild(c);
        }else{
            console.log('betterchannelpage not working. links like "youtube.com/MrBeast" will not work, but links like "youtube.com/c/MrBeast" will.')
        }
    }
    window.onload = function(){
        setTimeout(BetterChannelPage,delay1);
        let href = location.href;
        let body = document.body;
        let observer = new MutationObserver(function(m){
            if (href != location.href){
                href = location.href;
                //console.log("changed href");
                setTimeout(BetterChannelPage,delay1);
            }
        })
        observer.observe(body,{childList:true,subtree:true});
    }
})();
