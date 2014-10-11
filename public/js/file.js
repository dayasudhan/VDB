var rootURL = "https://localhost:8443/v1/Board";
function BatchTableListByfileName(filename) {
	console.log('BatchTableListByfileName');
	console.log(filename);
	var url2 = rootURL + '/BatchTableListByfileName/'+ filename ;
	console.log(url2);

	
	$.get( url2, function( data ) {
		  console.log('received message:', data);
		  alert( "Load was performed." );
		  renderList(data);
		});
}
function renderList(message){
	console.log('received message:', message);
	dataMessage = message;
	document.getElementById("loadingid").style.visibility = "hidden";
	drawFileStatusTable(message.BatchResponseList);
}
function onSubmitButtonClick()
{
	document.getElementById("loadingid").style.visibility = "visible";
	if(document.getElementById('fileId').checked) {
		var input= document.getElementById("fid").value;
		socket.emit('BatchTable', input );
	}
	else	{
		var input= document.getElementById("fid").value;
		socket.emit('BatchTableListByfileName', input );
	}
}
function processRequestParamter(){

   if(get('filename')=='undefined'){

   } else{
    document.getElementById("loadingid").style.visibility = "visible";
    document.getElementById("fid").value = get('filename');
    BatchTableListByfileName(get('filename'));

   }
   
  }