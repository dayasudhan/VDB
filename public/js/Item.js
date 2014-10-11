var rootURL = "https://localhost:8443/v1/Board";
function BatchItemTableList(batchid) {
	console.log('BatchItemTableList');
	console.log(batchid);
	var url2 = rootURL + '/BatchItemTableList/'+ batchid ;
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
         drawFileStatusTable(message.BatchItemResponseList);
}

function processRequestParamter()
{
	if(get('batchid')=='undefined'){
	} 
	else{
      		document.getElementById("loadingid").style.visibility = "visible";
      		document.getElementById("fid").value = get('batchid');
		BatchItemTableList( get('batchid'));
	}
}
function get(name){
     if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}
function myFunction()
{
    document.getElementById("demo").innerHTML="Hello World";
    socket.emit('BatchItemTable', "$query2" );
}
function myFunction1(message)
{
	document.getElementById("demo").innerHTML=message;
}
function onSubmitButtonClick()
{
    document.getElementById("loadingid").style.visibility = "visible";
    var BatchID = document.getElementById("fid").value;
  
    socket.emit('BatchItemTable', BatchID );

  }