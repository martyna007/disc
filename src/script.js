const folder = document.getElementsByClassName("folder-container");
const ctxMenu = document.getElementById("ctxMenu");
folder.addEventListener("contextmenu",function(event){
	event.preventDefault();
	console.log('click');
	ctxMenu.style.display = "block";
	ctxMenu.style.left = (event.pageX - 10)+"px";
	ctxMenu.style.top = (event.pageY - 10)+"px";
},false);
folder.addEventListener("click",function(event){
	ctxMenu.style.display = "";
	ctxMenu.style.left = "";
	ctxMenu.style.top = "";
},false);