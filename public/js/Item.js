var rootURL = "https://localhost:8443/v1/Board";
function BatchItemTableList(batchid) {
	console.log('BatchItemTableList');
	console.log(batchid);
	var url2 = rootURL + '/BatchItemTableList/'+ batchid ;
	console.log(url2);
	$.get( url2, function( data ) {
	          console.log('dayasudhan');
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
  function drawFileStatusTable(message1) {
  var message = message1.batchItemList;
          var data = new google.visualization.DataTable();
          data.addColumn('number', 'ID ');
          data.addColumn('string', 'STATUS');
          data.addColumn('string', 'PIMP_RC_ERROR_CODE');
           data.addColumn('number', 'REASON_CODE');
          data.addColumn('string', 'TIME_CREATED');
          data.addColumn('string', 'TIME_COMPLETED');
         

          data.addRows(message1.length);
         if(message1.length == 1)
         {
           data.setCell(0, 0, message.ID );
           data.setCell(0, 1, message.STATUS);
           data.setCell(0, 2, message.PIMP_RC);
            data.setCell(0, 3, message.REASON_CODE);
          var date1 = new Date(message.TIME_CREATED * 1000);
          if(message.TIME_CREATED != 0)
          {
              data.setCell(0, 4, getTimeDateString(date1));
          }
          var date2 = new Date(message.TIME_COMPLETED * 1000);
          if(message.TIME_COMPLETED != 0)
          {
              data.setCell(0, 5,getTimeDateString(date2));
          }
         
         }
         else
         {
           for(var i=0;i<message.length;i++)
           {
            data.setCell(i, 0, message[i].ID );
            data.setCell(i, 1, message[i].STATUS);
            data.setCell(i, 2, message[i].PIMP_RC);
             data.setCell(i, 3, message[i].REASON_CODE);
            var date1 = new Date(message[i].TIME_CREATED * 1000);
            if(message[i].TIME_CREATED != 0)
            {
                data.setCell(i, 4, getTimeDateString(date1));
            }
              var date2 = new Date(message[i].TIME_COMPLETED * 1000);
            if(message[i].TIME_CREATED != 0)
            { 
                data.setCell(i, 5,getTimeDateString(date2));
            }
            
           }
       }
          var table = new google.visualization.Table(document.getElementById('table_div'));
         
           var options = {};
               options['showRowNumber'] = true;
               options['page'] = 'enable';
               options['allowHtml'] = true;
               options['pageSize'] = 5;
               options['pagingButtonsConfiguration'] = 'auto';
         table.draw(data, options);
           var  hdg=document.getElementById("hd");
           var filename = document.getElementById("fid").value;
         hdg.innerHTML =  "<font color=\"#3366CC\" size=\"4\">List of items for BatchID "+ filename + "</font>";
        
          google.visualization.events.addListener(table, 'select', function() {
            var row = table.getSelection()[0].row;
     
          });
}
      function drawBatchChart(message1) {
        var message = message1.batchItemList;
        var nbl = 0 , nbr = 0, nbp = 0;
        if(message1.length == 1)
         {
            nbl = nbl + message.NUM_TOTAL;
            nbr = nbr + message.NUM_SUCCESS;
            nbp = nbp + message.NUM_FAILED;
         }
         else
         {
          for(var i=0;i<message.length;i++)
          {
            nbl = nbl + message[i].NUM_TOTAL;
            nbr = nbr + message[i].NUM_SUCCESS;
            nbp = nbp + message[i].NUM_FAILED;
          } 
        }
        var data = google.visualization.arrayToDataTable([
          ['BATCH', 'NUMBER'],
           ['NUM_SUCCESS',  nbr],
          ['NUM_FAILED',  nbp],
                   
        ]);

        var options = {
          title: 'Batch Status',
          hAxis: {title: 'BATCH STATUS', titleTextStyle: {color: 'red'}}
         
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }
socket.on('BatchItemTable', function(message){
         console.log('received message:', message);
         dataMessage = message;
         document.getElementById("loadingid").style.visibility = "hidden";
         drawFileStatusTable(message);
         });