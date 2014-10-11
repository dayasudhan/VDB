var rootURL = "https://localhost:8443/v1/Board";
var dataMessage ;
function initialize() 
{
	drawVisualization(dataMessage);
}
var socket = io.connect(document.location.protocol+'//'+document.location.host);
function FileTableByEmailDateRange(merchantID) 
{
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

function onMailMeButtonClick()
{
   var htmldata = $( "div.test" ).html(); 

   socket.emit('MailMe', htmldata);
}
function onSaveMeButtonClick()
{
   var htmldata = $( "div.test" ).html(); 

   socket.emit('SaveMe', htmldata);
}
function onFileNameClick(filename)
{
  window.location="http://localhost:8000/File?filename="+filename;
}
function onCompareButtonClick()
{
  var data_to_chart = new Array();
  drawChart3(message123);
}
function onSubmitButtonClick()
{
    document.getElementById("loadingid").style.visibility = "visible";
    var merchantID = document.getElementById("Merchant_DropBox_ID").value;
    var qr = "select * FROM WMERCHANT_FILE where DROP_BOX_MERCHANT_ID=2186687309516203355 1561704575608239373 us-eom-biz2@paypal.com";

    var datefrom = document.getElementById('dateFrom').value;
    var intdatefrom = Date.parse(datefrom);
    var int_from = parseInt(intdatefrom);
    int_from = int_from /1000;

    var dateto = document.getElementById('dateTo').value;
    var datetoint = Date.parse(dateto);
    var int_to = parseInt(datetoint);
    int_to = int_to /1000;

    if( 0== 0)
{
   if (merchantID==null || merchantID=="")
    {
      alert("Merchant Email must be filled out");
    }
   
var reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
        
    if(datefrom == "" )    {

      alert("Enter  From Date");
      return false;
    }
    else if(dateto == "" )    {

      alert("Enter To Date");
      return false;
    }
    else if(datetoint < intdatefrom){
        alert("Enter a valid Date renge ");
         return false;
     } 
    else {
      merchantID += "+";
       merchantID += datefrom;
       merchantID += "+";
       merchantID += dateto;
       
       FileTableByEmailDateRange(merchantID);
         return true
     }
   }
   else
   {
     merchantID = "rwong-davis-network@paypal.com+2012-01-01+2013-01-01";
     console.log("1111111000");
     FileTableByEmailDateRange(merchantID);
    
   }
  
  }
function drawChart2(message) 
{
var fileReasonCode = {
"FN001":{"name":"FILE_NAME_MISSING_MERCHANT_ID","no":0},
"FN002":{"name":"FILE_NAME_INCORRECT_TXN_TYPE","no":0},                       
"FN003":{"name":"FILE_NAME_MISSING_TXN_TYPE","no":0},                           
"FN004":{"name":"FILE_NAME_MISSING_REQUEST","no":0},                            
"FN005":{"name":"FILE_NAME_MISSING_YEAR","no":0},                             
"FN006":{"name":"FILE_NAME_MISSING_MONTH","no":0},                              
"FN007":{"name":"FILE_NAME_MISSING_DAY","no":0},                              
"FN008":{"name":"FILE_NAME_INCORRECT_DATE","no":0},                           
"FN009":{"name":"FILE_NAME_MISSING_SEQUENCE_NUMBER","no":0},              
"FN010":{"name":"FILE_NAME_INCORRECT_EXTENSION","no":0},                    
"FV001":{"name":"FV_INVALID_FILE_VERSION","no":0},                          
"FH001":{"name":"FH_FILE_HEADER_MISSING","no":0}, 
"FH002":{"name":"FH_INVALID_FILE_TYPE","no":0},                                 
"FH003":{"name":"FH_INVALID_FILE_VERSION","no":0},                            
"FH004":{"name":"FH_INVALID_FILE_DATE","no":0},                                 
"FH005":{"name":"FH_FILE_DATE_OUT_OF_RANGE","no":0},                            
"FH006":{"name":"FH_INVALID_SEQUENCE_NUMBER","no":0},                         
"FH007":{"name":"FH_DUPLICATE_SEQUENCE_NUMBER_FOR_DAY","no":0},                 
"FH008":{"name":"FH_INVALID_BATCH_COUNT","no":0},                               
"FH009":{"name":"FH_INVALID_DROP_BOX_MERCHANT_EMAIL_ADDRESS","no":0},           
"FH010":{"name":"FH_DUPLICATE_FILE_HEADER","no":0},                             
"FF001":{"name":"FT_FILE_TRAILER_MISSING","no":0},                              
"FF002":{"name":"FT_INVALID_BATCH_COUNT","no":0},                               
"FF003":{"name":"FT_NUMBER_OF_BATCHES_PER_FILE_EXCEEDED","no":0},
"FF004":{"name":"FT_EMPTY_BATCHES_PRESENT_IN_FILE","no":0},                   
"FF005":{"name":"FT_DUPLICATE_FILE_TRAILER","no":0},                            
"CS001":{"name":"CS_MISSING_CHECKSUM_RECORD","no":0},                           
"CS002":{"name":"CS_CHECKSUM_INVALID_FOR_FILE","no":0},                         
"CS003":{"name":"CS_CHECKSUM_DUPLICATE_FILE","no":0},                           
"FS000":{"name":"SUCCESSFUL_FILE_INFO","no":0},                                 
"FE001":{"name":"EMPTY_FILE","no":0},                                           
"FI001":{"name":"INCOMPLETE_FILE","no":0},                                      
"FX001":{"name":"NUMBER_OF_TRANSACTIONS_EXCEEDED_FOR_FILE","no":0},             
"FX002":{"name":"INTERNAL_ERROR_FILE_NOT_PROCESSED","no":0},                    
"FD001":{"name":"DUPLICATE_FILE","no":0},                                     
"FP001":{"name":"INVALID_PAYER_ID","no":0},                                   
"FI002":{"name":"INCORRECT_ENTRY_OUT_OF_PLACE","no":0},                         
"FI003":{"name":"INCORRECT_LINE","no":0},                                       
"FI004":{"name":"MISSING_BATCH_HEADER","no":0},                                 
"FI005":{"name":"INVALID_BATCH_ERR_THRESHOLD","no":0},                          
"FI006":{"name":"MISSING_FILE_NOT_FOUND","no":0},                               
"FI007":{"name":"VALIDATION_FAILED","no":0},                                  
"FI008":{"name":"PUBLISH_OF_ITEMS_FAILED","no":0}                             
};

for(var i=0;i<message.length;i++)
{
    if(message[i].FILE_RETURN_CODE == "FS000")
    {
       fileReasonCode.FS000.no++;
    }
    else if(message[i].FILE_RETURN_CODE == "FH009")
    {
       fileReasonCode.FH009.no++;
    }
}

        var data = google.visualization.arrayToDataTable([
                  ['Task', 'Hours per Day'],
                  [fileReasonCode.FS000.name,    fileReasonCode.FS000.no],
                  [fileReasonCode.FH009.name,    fileReasonCode.FH009.no]
           ]);

        var options = {
          title: 'File Return code',
          is3D: false,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d2'));
        chart.draw(data, options);
      }
      function drawChart(message) {

var filestatus = {
            status: [
                    {    "Macro" : "MAM_INPUT_READY(M)",
                          "symbol"  :'M',
                          "no"       :0 },
                    {    "Macro" : "INPUT_READY(A)",
                          "symbol"  :'A',
                          "no"       :0 },
                    {    "Macro" : "CPUATP_INPUT_READY(U)",
                          "symbol"  :'U',
                          "no"       :0 },
                    {    "Macro" : "VALIDATION_FAILED(F)",
                          "symbol"  :'F',
                          "no"       :0 },
                    {    "Macro" : "LOADED_TO_QUEUE(P)",
                          "symbol"  :'P',
                          "no"       :0 },
                    {    "Macro" : "FILE_PROCESSED(S)",
                          "symbol"  :'S',
                          "no"       :0 },
                    {    "Macro" : "FILE_RESUBMITTED(T)",
                          "symbol"  :'T',
                          "no"       :0 },
                    {    "Macro" : "RESULT_GENERATED(R)",
                          "symbol"  :'R',
                          "no"       :0 },
                    {    "Macro" : "FILE_COMPLETED(E)",
                          "symbol"  :'E',
                          "no"       :0 },
                    {    "Macro" : "RESULT_GENERATION_FAILED(K)",
                          "symbol"  :'K',
                          "no"       :0 },
                    {    "Macro" : "RECEIPT_GENERATED(G) ",
                          "symbol"  :'G',
                          "no"       :0 },
                    {    "Macro" : "PUBLISH_OF_ITEMS_FAILED(J)  ",
                          "symbol"  :'J',
                          "no"       :0 },
                    {    "Macro" : "RECONCILIATION_PROGRESS(C)",
                          "symbol"  :'C',
                          "no"       :0 }
                ]
    
        }  ;

        for(var i=0;i<message.length;i++)
        {
          if(message[i].STATUS == 'M')          {  
            filestatus.status[0].no++;
          }
          else if(message[i].STATUS == 'A')          {  
            filestatus.status[1].no++;
          }
          else if(message[i].STATUS == 'U')          {  
            filestatus.status[2].no++;
          }
          else if(message[i].STATUS == 'F')          {  
            filestatus.status[3].no++;
          }
          else if(message[i].STATUS == 'P')          {  
            filestatus.status[4].no++;
          }    
          else if(message[i].STATUS == 'S')          {  
            filestatus.status[5].no++;
          }
          else if(message[i].STATUS == 'T')          {  
            filestatus.status[6].no++;
          }
          else if(message[i].STATUS == 'R')          {  
            filestatus.status[7].no++;
          }
          else if(message[i].STATUS == 'E')          {  
            filestatus.status[8].no++;
          }
          else if(message[i].STATUS == 'K')          {  
            filestatus.status[9].no++;
          }
          else if(message[i].STATUS == 'G')          {  
            filestatus.status[10].no++;
          }
          else if(message[i].STATUS == 'J')          {  
            filestatus.status[11].no++;
          }
          else if(message[i].STATUS == 'C')          {  
            filestatus.status[12].no++;
          }
        }

        var data = google.visualization.arrayToDataTable([
                  ['Task', 'Hours per Day'],
                  [filestatus.status[0].Macro,    filestatus.status[0].no],
                  [filestatus.status[1].Macro,    filestatus.status[1].no],
                  [filestatus.status[2].Macro,    filestatus.status[2].no],
                  [filestatus.status[3].Macro,    filestatus.status[3].no],
                  [filestatus.status[4].Macro,    filestatus.status[4].no],
                  [filestatus.status[5].Macro,    filestatus.status[5].no],
                  [filestatus.status[6].Macro,    filestatus.status[6].no],
                  [filestatus.status[7].Macro,    filestatus.status[7].no],
                  [filestatus.status[8].Macro,    filestatus.status[8].no],
                  [filestatus.status[9].Macro,    filestatus.status[9].no],
                  [filestatus.status[10].Macro,    filestatus.status[10].no],
                  [filestatus.status[11].Macro,    filestatus.status[11].no],
                  [filestatus.status[12].Macro,    filestatus.status[12].no]
        ]);

        var options = {
          title: "File Processing Status",
          titleTextStyle: {color: '#3366CC'},
          
          is3D: false,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }

var arr =  new Array();
function addme(index)
{
  arr.push(index);
}
  function drawVisualization(message) {

         var data = new google.visualization.DataTable();
                  
          data.addColumn('string', '');
         data.addColumn('string', 'FILENAME');
          data.addColumn('string', 'STATUS');
          data.addColumn('string','FILE_RETURN_CODE');
          data.addColumn('number', 'NUM_BATCH_LOADED');
          data.addColumn('number', 'NUM_BATCH_REQUESTED');
          data.addColumn('number', 'NUM_BATCH_PROCESSED');
          data.addColumn('string', 'TIME_RECEIPT_GENERATED');
          data.addColumn('string', 'TIME_RESULT_GENERATED');
          
 
         data.addRows(message.length);
         if(message.length == 1)
         {

              var i = 0;
              var j = 0;
              data.setCell(i, j++, '<input type="checkbox" name = "daya" onclick=addme(\''+i+'\') value = "'+message.fileList.FILENAME+'"> ');
              var fileName = message.fileList.FILENAME;
               data.setCell(i, j++, '<a onclick=onFileNameClick('+'\''+fileName+'\''+')>'+fileName+'"</a> ');
              data.setCell(i, j++, message.fileList.STATUS);
              data.setCell(i, j++, message.fileList.FILE_RETURN_CODE);
              data.setCell(i, j++, message.fileList.NUM_BATCH_LOADED);
              data.setCell(i, j++, message.fileList.NUM_BATCH_REQUESTED);

              data.setCell(i, j++, message.fileList.NUM_BATCH_PROCESSED);
              var date = new Date(message.fileList.TIME_RECEIPT_GENERATED * 1000);
              now = date;
              if(message.fileList.TIME_RECEIPT_GENERATED != 0)
              {
                


                data.setCell(i, j++, getTimeDateString(now));
              }
              var date1 = new Date(message.fileList.TIME_RESULT_GENERATED * 1000);
              now = date1;  
              if(message.fileList.TIME_RESULT_GENERATED != 0)
              {
                
                data.setCell(i, j++,getTimeDateString(now));
              }
              
         }
         else
         {
            $('#providersFormElementsTable').append("");

           for(var i=0;i<message.length;i++)
           {
              var j = 0;
              var fileName = message.fileList[i].FILENAME;
              data.setCell(i, j++, '<input type="checkbox" name = "daya[]" onclick=addme(\''+i+'\') value = "'+message.fileList[i].FILENAME+'"> ');
              data.setCell(i, j++, '<a onclick=onFileNameClick('+'\''+fileName+'\''+')>'+message.fileList[i].FILENAME+'"</a> ');

              data.setCell(i, j++, '<b>'+message.fileList[i].STATUS+'</b>');
              data.setCell(i, j++, message.fileList[i].FILE_RETURN_CODE);
              data.setCell(i, j++, message.fileList[i].NUM_BATCH_LOADED);
              data.setCell(i, j++, message.fileList[i].NUM_BATCH_REQUESTED);

              data.setCell(i, j++, message.fileList[i].NUM_BATCH_PROCESSED);
              var date = new Date(message.fileList[i].TIME_RECEIPT_GENERATED * 1000);
              now = date;
              if(message.fileList[i].TIME_RECEIPT_GENERATED != 0)
              {
                var dd =  ((now.getMonth() + 1) + '/' +
            (now.getDate()) + '/' +
             now.getFullYear() + " " +
             now.getHours() + ':' +
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) + ':' +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));


                data.setCell(i, j++, dd);
              }
              var date1 = new Date(message.fileList[i].TIME_RESULT_GENERATED * 1000);
              now = date1;  
              if(message.fileList[i].TIME_RESULT_GENERATED != 0)
              {
                var dd=  ((now.getMonth() + 1) + '/' +
            (now.getDate()) + '/' +
             now.getFullYear() + " " +
             now.getHours() + ':' +
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) + ':' +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));


                
                data.setCell(i, j++,dd);
              }
              createFormElement(fileName,message.fileList[i].STATUS);
           }
         }
         var  hdg=document.getElementById("hd");
         hdg.innerHTML = "<font color=\"#3366CC\" size=\"4\">List of Files</font>";
         var table = new google.visualization.Table(document.getElementById('table_div'));
         var options = {};
               options['showRowNumber'] = true;
               options['page'] = 'enable';
               options['allowHtml'] = true;
               options['pageSize'] = 5;
               options['pagingButtonsConfiguration'] = 'auto';
         table.draw(data, options);
         drawChart(message.fileList);
         if(message.reasonCodeListLength > 100)
         {
           drawChart(message);
         }

          google.visualization.events.addListener(table, 'select', function() {
             var filename ;
            if(message.length == 1)
            {
             filename = message.fileList.FILENAME ;
           }
           else
           {
            var row = table.getSelection()[0].row;
              filename = message.fileList[row].FILENAME ;
           }
           
           
          });
      }

     
      function drawChart3(message) {
      
          var data = new google.visualization.DataTable();

          data.addColumn('string', 'FILENAME');
          
          if(message.length == 1)
          {
            if(message.reasonCodeListLength == 1)
            {
              data.addColumn('number', message.fileList.PIMP_RC_List.entry.key);  
            }
            else
            {
              for(var i = 0 ; i < message.reasonCodeListLength ; i++)
              {
                data.addColumn('number', message.fileList.PIMP_RC_List.entry[i].key);     
              }
            }
            data.addRows(1);
        
            var valueArr = new Array();
            var date = new Date(message.fileList.TIME_RESULT_GENERATED * 1000); 
            var filename =  message.fileList.FILENAME     ;       
              data.setCell(0,0,filename);
              if(message.reasonCodeListLength == 1)
              {
                valueArr[0] = message.fileList.reasonCodeList.entry.value;
                data.setCell(0, 1, valueArr[0]);
              }
              else
              {
                for(var j = 0 ; j < message.reasonCodeListLength ; j++){
                  valueArr[j] = message.fileList.reasonCodeList.entry[j].value;
                  data.setCell(0, j+1, valueArr[j]);
                }
              }        
          }
          else
          {
            if(message.reasonCodeListLength == 1)
            {
              data.addColumn('number', message.fileList[0].PIMP_RC_List.entry.key);  
            }
            else
            {
              for(var i = 0 ; i < message.fileList[0].reasonCodeList.entry.length ; i++){
                data.addColumn('number', message.fileList[0].PIMP_RC_List.entry[i].key);     
              }
            }
            data.addRows(message.length + 1);

            {
              for(var i = 0 ; i < arr.length ; i++)
              {
                var valueArr = new Array();
                var date = new Date(message.fileList[arr[i]].TIME_RESULT_GENERATED * 1000);
                 var filename =  message.fileList[arr[i]].FILENAME     ;   
                data.setCell(i,0,filename);
                if(message.reasonCodeListLength == 1)
                {
                  valueArr[0] = message.fileList[arr[i]].reasonCodeList.entry.value;
                  data.setCell(i, 1, valueArr[0]);
                }
                else
                {
                  for(var j = 0 ; j < message.fileList[0].reasonCodeList.entry.length ; j++)
                  {
                    valueArr[j] = message.fileList[arr[i]].reasonCodeList.entry[j].value;
                    data.setCell(i, j+1, valueArr[j]);
                  }
                }
              }
            }
          }
        var options = {
          title: 'Error Performance',
          vAxis: {title: 'FILENAME',  titleTextStyle: {color: 'red'}},
          hAxis: {title: "No of Errors", titleTextStyle: {color: 'red'}},
          height: 300
           };



        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

        chart.draw(data, options);
      }

         var message123 = null;
         socket.on('FileTable', function(message){
         console.log('received message:', message);
         document.getElementById("cmpr").style.visibility="visible";
         message123 = message;
         drawVisualization(message);
         document.getElementById("loadingid").style.visibility = "hidden";
         });
function is_valid_integer(textField){

    var reg = /^[0-9]+$/;
    if(!reg.test(textField.value)){

    alert("Please enter integers only");

    textField.value="";

    textField.focus();

    return false; 

}
return true
}