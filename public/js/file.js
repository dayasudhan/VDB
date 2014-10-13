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
	console.log("onSubmitButtonClick");		
	var input= document.getElementById("fid").value;
	BatchTableListByfileName(input);
		
}
function processRequestParamter(){

   if(get('filename')=='undefined'){

   } else{
    document.getElementById("loadingid").style.visibility = "visible";
    document.getElementById("fid").value = get('filename');
    BatchTableListByfileName(get('filename'));

   }
   
  }
  var dataMessage ;
      function initialize() {
drawFileStatusTable(dataMessage);
      }

  var socket = io.connect(document.location.protocol+'//'+document.location.host);
  function myFunction()
  {
    document.getElementById("demo").innerHTML="Hello World";
    socket.emit('message', "$query2" );
  }
  function myFunction1(message)
  {
    document.getElementById("demo").innerHTML=message;

  }
function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}
function onBatchIdClick(batchid)
{
  window.location="http://localhost:8000/Item?batchid="+batchid;
}
function drawFileStatusTable(message1) {
  var message = message1.batchResponseList;
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'ID ');
          data.addColumn('number', 'BATCH_SEQ');
          data.addColumn('string', 'STATUS');
          data.addColumn('number', 'NUM_TOTAL');
          data.addColumn('number', 'NUM_FAILED');
          data.addColumn('number', 'NUM_SUCCESS');
          data.addColumn('string', 'TIME_CREATED');
          data.addColumn('string', 'TIME_COMPLETED');
      
          data.addRows(message1.length);
         if(message1.length == 1)
         {
             data.setCell(0, 0, '<a href="http://localhost:8000/Item?batchid='+ message.ID +'">'+message.ID+'</a> ');

             data.setCell(0, 1, message.BATCH_SEQ);
             data.setCell(0, 2, message.STATUS);
             data.setCell(0, 3, message.NUM_TOTAL);
             data.setCell(0, 4, message.NUM_FAILED);
             data.setCell(0, 5, message.NUM_SUCCESS);
            
            var date1 = new Date(message.TIME_CREATED * 1000);
             data.setCell(0, 6, getTimeDateString(date1));
              var date2 = new Date(message.TIME_COMPLETED * 1000);
             data.setCell(0, 7,getTimeDateString(date2));
       }
       else
       {
         for(var i=0;i<message1.length;i++)
         {
          data.setCell(i, 0, '<a href="http://localhost:8000/Item?batchid='+ message[i].ID +'">'+message[i].ID+'</a> ');
           data.setCell(i, 1, message[i].BATCH_SEQ);
           data.setCell(i, 2, message[i].STATUS);
           data.setCell(i, 3, message[i].NUM_TOTAL);
           data.setCell(i, 4, message[i].NUM_FAILED);
           data.setCell(i, 5, message[i].NUM_SUCCESS);
          
          var date1 = new Date(message[i].TIME_CREATED * 1000);
           data.setCell(i, 6, getTimeDateString(date1));
            var date2 = new Date(message[i].TIME_COMPLETED * 1000);
           data.setCell(i, 7,getTimeDateString(date2));
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
         var filename = document.getElementById("fid").value;
            var  hdg=document.getElementById("hd");
         hdg.innerHTML = "<font color=\"#3366CC\" size=\"4\">List of Batches in "+ filename + "</font>";
           
          drawBatchChart(message1);
          drawErrorChart1(message1  );
           
}
      function drawBatchChart(message1) {
var message = message1.batchResponseList;
        var nbl = 0 , nbr = 0, nbp = 0;
        var np = 0, nr = 0, ns = 0 , nt = 0 ,nf = 0;
        if(message1.length == 1)
        {
          nbl = nbl + message.NUM_TOTAL;
          nbr = nbr + message.NUM_SUCCESS;
          nbp = nbp + message.NUM_FAILED;
          if(message.STATUS == 'S')          {
            ns++;
          }
          else if(message.STATUS == 'P')          {
            np++;
          }
          else if(message.STATUS == 'R')          {
            nr++;
          }
          else if(message.STATUS == 'T')          {
            nt++;
          }
          else if(message.STATUS == 'F')          {
            nf++;
          }
        } 
        else
        {
          for(var i=0;i<message1.length;i++)
          {
            nbl = nbl + message[i].NUM_TOTAL;
            nbr = nbr + message[i].NUM_SUCCESS;
            nbp = nbp + message[i].NUM_FAILED;
            if(message[i].STATUS == 'S')          {
              ns++;
            }
            else if(message[i].STATUS == 'P')          {
              np++;
            }
            else if(message[i].STATUS == 'R')          {
              nr++;
            }
            else if(message[i].STATUS == 'T')          {
              nt++;
            }
            else if(message[i].STATUS == 'F')          {
              nf++;
            }
          }
        }
        var data = google.visualization.arrayToDataTable([
          ['BATCH', 'NUMBER'],
           ['STATUS_PENDING',  np],
           ['STATUS_PROCESSING',  nr],
           ['STATUS_SUCCESS',  ns],
           ['STATUS_RESUBMITTED',  nt],
           ['STATUS_FAILED',  nf]        
        ]);


        var options = {
          title: 'Batch Status',
          hAxis: {title: 'BATCH STATUS', titleTextStyle: {color: 'red'}}
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);

      }
  function drawErrorChart1(message1) {
      var message = message1.batchResponseList;
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'ERROR');
          data.addColumn('number', 'No of Errors');
          if(message1.length == 1)          {
            data.addRows(message1.length); 
            if(message.PIMP_RC_List_length == 1)
            {
             
               data.setCell(0,0,message.PIMP_RC_List.entry.key);
               data.setCell(0,1,message.PIMP_RC_List.entry.value);
            }
            else
            {
               for(var i = 0 ; i < message.PIMP_RC_List_length ; i++)
               {
                 data.setCell(i,0,message.PIMP_RC_List.entry[i].key);
                 data.setCell(i,1,message.PIMP_RC_List.entry[i].value);
               }
            }
         }
         else if(message1.length > 1)
         {
          data.addRows(message1.length +1); 
          for(var j=0;j<message1.length;j++)
          {
            if(message[j].PIMP_RC_List_length == 1)            {
             
               data.setCell(0,0,message[j].PIMP_RC_List.entry.key);
               data.setCell(0,1,message[j].PIMP_RC_List.entry.value);
            }
            else            {
               for(var i = 0 ; i < message[j].PIMP_RC_List_length ; i++)               {
                 data.setCell(i,0,message[j].PIMP_RC_List.entry[i].key);
                 data.setCell(i,1,message[j].PIMP_RC_List.entry[i].value);
               }
            }
          }
         }
                   
        var options = {
          title: 'Error Graph',
          vAxis: {title: 'Error',  titleTextStyle: {color: 'red'}},
          hAxis: {title: "PIMP_RC", titleTextStyle: {color: 'red'}},
          width:600
           };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

        chart.draw(data, options);
      }
