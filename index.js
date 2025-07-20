/* empty css                      */import{i as c,S as f}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const g="48286639-c5b13cd121e9f124dcf0b461d",y=`https://pixabay.com/api/?key=${g}`;let a;function h(){document.getElementById("loaderOverlay").classList.add("active"),document.getElementById("loader").classList.remove("loader-hidden")}function L(){document.getElementById("loaderOverlay").classList.remove("active"),document.getElementById("loader").classList.add("loader-hidden")}document.querySelector(".searchForm").addEventListener("submit",s=>{s.preventDefault(),h();let r=document.querySelector(".gallery");r.innerHTML="";let n=document.querySelector(".search-input").value,o=new URLSearchParams({q:n,orientation:"horizontal",safesearch:!0,image_type:"photo",per_page:40});fetch(`${y}&${o}`).then(e=>{if(!e.ok)throw new Error("Network Error: "+e.statusText);return e.json()}).then(e=>{if(e.hits.length===0){c.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}r.innerHTML=e.hits.map(({webformatURL:t,largeImageURL:i,tags:l,likes:m,views:d,comments:p,downloads:u})=>`<li class="gallery-item">
              <a class="gallery-link" href="${i}">
                <img
                  class="gallery-image"
                  src="${t}"
                  alt="${l}"
                  title="${l}"
                />
                <ul class="img-information">
                  <li>
                    <span class="img-information-title">Likes</span>
                    <span class="img-information-content">${m}</span>
                  </li>
                  <li>
                    <span class="img-information-title">View</span>
                    <span class="img-information-content">${d}</span>
                  </li>
                  <li>
                    <span class="img-information-title">Comments</span>
                    <span class="img-information-content">${p}</span>
                  </li>
                  <li>
                    <span class="img-information-title">Downloads</span>
                    <span class="img-information-content">${u}</span>
                  </li>
                </ul>
              </a>
            </li>`).join(""),a&&a.destroy(),a=new f(".gallery a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"title",captionPosition:"bottom",captionDelay:250,closeText:"×",navText:["&larr;","&rarr;"],overlayOpacity:.9,spinner:!0,alertError:!1}),a.refresh()}).catch(e=>{c.error({title:"Hata",message:`Something went wrong: ${e.message}`,position:"topRight"}),console.error("Error:",e)}).finally(()=>{L()})});
//# sourceMappingURL=index.js.map
