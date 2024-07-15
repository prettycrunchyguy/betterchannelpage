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
    let delay = 500; // delay when switching pages on youtube (isn't added with delay2)
    let delay1 = delay; // dont configure
    let delay2 = 100; // delay when switching from one tab to the channels tab
    let zSwitch = false;
    //let searchLog = true; // better for debugging BECAUSE CHROME DEV TOOLS LAGS LIKE SHIT
    function BetterChannelPage(){
        BetterChannelPage.log("betterchannelpage started.");
        //already = false;
        // see which tab was selected
        if (delay1 == 0){
            //let d = document.getElementsByClassName("yt-tab-shape-wiz yt-tab-shape-wiz--host-clickable")[0]; // home tab
            //d.click();
            let e = document.getElementsByClassName("yt-tab-group-shape-wiz__slider")[0];
        }
        delay1 = delay;
        // see if youtube is on a channel link
        if (location.href.includes("youtube.com/@") || location.href.includes("youtube.com/c/") || location.href.includes("youtube.com/channel/")){
            BetterChannelPage.log("betterchannelpage working.");
            let a = document.getElementsByClassName("yt-tab-group-shape-wiz__tabs")[0]; // tabs list
            let b = document.getElementsByClassName("yt-tab-shape-wiz yt-tab-shape-wiz__tab--last-tab")[0]; // search button
            let c = document.createElement("yt-tab-shape"); // channels tab
            let d = document.getElementsByClassName("yt-tab-shape-wiz yt-tab-shape-wiz--host-clickable")[0]; // home tab
            let e = document.getElementsByClassName("yt-tab-group-shape-wiz__slider")[0]; // slider
            let f = document.querySelectorAll('ytd-item-section-renderer'); // sections
            c.innerHTML = '<div class="yt-tab-shape-wiz__tab">Channels</div><div class="yt-tab-shape-wiz__tab-bar"></div>'
            c.setAttribute("class","yt-tab-shape-wiz yt-tab-shape-wiz--host-clickable");
            c.setAttribute("role","tab");
            c.setAttribute("aria-selected","false");
            c.setAttribute("tabindex","0");
            c.setAttribute("tab-title","Channels");
            c.onclick = function(){
                //already = true;
                if (!(location.href.endsWith("/channels"))){
                    if (location.href.endsWith("/featured") || location.href.split("/").length == 4){
                        delay1 = 0;
                        a.removeChild(c)
                        if (location.href.split("/").length == 4){
                            history.pushState({id:Math.floor(Math.random()*100000)},"",location.href+"/channels") // what does id mean??
                        }else{
                            //location.href = location.href.replace(location.href.split("/")[4],"channels")
                            history.pushState({id:Math.floor(Math.random()*100000)},"",location.href.replace(location.href.split("/")[4],"channels")) // what does id mean??
                        }
                    }else{
                        delay1 = delay2;
                        zSwitch = true;
                        d.click();
                        e.setAttribute("style","width:"+c.clientWidth+"px;transform:translateX("+c.offsetLeft+"px);");
                        /*setTimeout(function(){
                            //a.removeChild(c)
                            if (location.href.split("/").length == 4){
                                history.pushState({id:Math.floor(Math.random()*100000)},"",location.href+"/channels") // what does id mean??
                            }else{
                                //location.href = location.href.replace(location.href.split("/")[4],"channels")
                                history.pushState({id:Math.floor(Math.random()*100000)},"",location.href.replace(location.href.split("/")[4],"channels")) // what does id mean??
                            }
                        },delay2);*/
                    }
                    
                    //d.click();
                }
                // find every section and remove/hide the sections that aren't channel lists
            }
            //c.id = "BCP-channels"
            b.insertAdjacentElement("beforebegin",c);
            if (location.href.endsWith("/channels")){
                BetterChannelPage.log("betterchannelpage on channels tab");
                c.setAttribute("aria-selected","true");
                d.setAttribute("aria-selected","false");
                c.innerHTML = '<div class="yt-tab-shape-wiz__tab yt-tab-shape-wiz__tab--tab-selected">Channels</div><div class="yt-tab-shape-wiz__tab-bar yt-tab-shape-wiz__tab-bar--tab-bar-selected"></div>'
                d.children[0].setAttribute("class","yt-tab-shape-wiz__tab");
                d.children[1].setAttribute("class","yt-tab-shape-wiz__tab-bar");
                e.setAttribute("style","width:"+c.clientWidth+"px;transform:translateX("+c.offsetLeft+"px);");
                let tabs = document.getElementsByClassName("yt-tab-shape-wiz yt-tab-shape-wiz--host-clickable"); // all tabs
                for (let i = 0; i < tabs.length; i++){
                    tabs[i].addEventListener("click",function(event){
                        e.setAttribute("style","width:"+tabs[i].clientWidth+"px;transform:translateX("+tabs[i].offsetLeft+"px);")
                        // switch the slider when clicking on a tab
                    })
                }
                for (let i = 0; i < f.length; i++){
                    try{
                        let link = f[i].children[2].children[0].children[0].children[0].children[0].children[0].children[1].children[1].children[0];
                        if (!(link.href.endsWith("#"))){
                            f[i].style.display = 'none'
                        }
                    }catch(e){
                        f[i].style.display = 'none'
                    }
                }
            }
            //a.appendChild(c);
        }else{
            console.log('betterchannelpage not working. links like "youtube.com/MrBeast" will not work, but links like "youtube.com/c/MrBeast" will.')
        }
    }
    BetterChannelPage.log = function(a){
        if (searchLog){
            document.getElementById('search-input').children[0].value = a;
        }
        console.log(a);
    }
    window.onload = function(){
        setTimeout(BetterChannelPage,delay1);
        let href = location.href;
        let body = document.body;
        let observer = new MutationObserver(function(m){
            if (href != location.href){
                href = location.href;
                //console.log("changed href");
                if (zSwitch){
                    zSwitch = false;
                    setTimeout(function(){
                        history.pushState({id:Math.floor(Math.random()*100000)},"",location.href.replace(location.href.split("/")[4],"channels"))
                    },0)
                }else{
                    setTimeout(BetterChannelPage,delay1);
                }
            }
        })
        observer.observe(body,{childList:true,subtree:true});
    }
})();
