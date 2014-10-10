var rootURL = "https://localhost:8443/v1/Board";
function FileTableByEmailDateRange(merchantID) {
	console.log('FileTableByEmailDateRange');
	console.log(merchantID);
	var url2 = rootURL + '/FileTableListByEmailDateRange/'+ merchantID ;
	console.log(url2);

	
	$.get( url2, function( data ) {
		  console.log('received message111:', data);
		  alert( "Load was performed." );
		  renderList(data);
		});
}
function renderList(data){

                 console.log(data.FileResponseList);
    console.log('received message:', data);
    document.getElementById("cmpr").style.visibility="visible";
    message123 = data.FileResponseList;
    drawVisualization(data.FileResponseList);
    document.getElementById("loadingid").style.visibility = "hidden";
}