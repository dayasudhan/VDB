var rootURL = "https://localhost:8443/v1/Board";
var vbdurl = "http://localhost:8000";
var dataMessage ;
function initialize() 
{

}
var socket = io.connect(document.location.protocol+'//'+document.location.host);
function EmailListDateRange(merchantID) 
{
	console.log('EmailListDateRange');
	console.log(merchantID);
	var url2 = rootURL + '/FileTableListByEmailListDateRange'+ merchantID ;
  var url3 = "https://localhost:8443/v1/Board/FileTableListByEmailListDateRange?emails=rwong-davis-network@paypal.com&fromdate=2012-01-01&todate=2015-01-01";
  //var url3 = "https://localhost:8443/v1/Board/FileTableListByEmailListDateRange?emails=rwong-dropbox@paypal.com&fromdate=2012-01-01&todate=2015-01-01
	console.log(url2);

	$.get( url2, function( data ) {
		  console.log('received message111:', data);
		  alert( "Load was performed." );  
		  renderList(data);
		});
		
	var data1 = '{"TotalErrorList":{"reasonCodeSet":{"entry":[{"key":0,"value":{"name":"SUCCESS","total":732}},{"key":3234,"value":{"name":"PIMP_RC_REFUSED_NEED_CC_OR_BA_TO_COMPLETE_PAYMENT","total":3}},{"key":520002,"value":{"name":"UNKNOWN_PIMP_RC_ERROR","total":407}},{"key":3037,"value":{"name":"PIMP_RC_REFUSED_ALIAS_CANNOT_REMOVE_PRIMARY","total":1}},{"key":4002,"value":{"name":"PIMP_RC_INTERNAL_ERROR","total":6}},{"key":14805,"value":{"name":"PIMP_RC_BULKAPI_ITEM_FORCE_FAILED","total":3}},{"key":4819,"value":{"name":"PIMP_RC_REFUSED_NEED_DIFF_CREDIT_CARD_TO_COMPLETE_PAYMENT","total":8}},{"key":7120,"value":{"name":"PIMP_RC_MP_REFUSED_REF_ID_DECRYPTION_FAILED","total":5}},{"key":3169,"value":{"name":"PIMP_RC_REFUSED_ALL_FUNDING_SOURCES_UNUSABLE","total":4}},{"key":3046,"value":{"name":"PIMP_RC_REFUSED_CC_REFUSED","total":3}}]}}}';	
	//renderList(data1);
}
function renderList(data){
    console.log('received message:', data);
    message123 = data.TotalErrorList;
    document.getElementById("loadingid").style.visibility = "hidden";
    drawChart(data.TotalErrorList);
    
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
function onSubmitButtonClick22()
{
  var response = {"TotalErrorList":{"reasonCodeSet":{"entry":[{"key":0,"value":{"name":"SUCCESS","total":697}},{"key":520002,"value":{"name":"UNKNOWN_PIMP_RC_ERROR","total":407}},{"key":4002,"value":{"name":"PIMP_RC_INTERNAL_ERROR","total":2}}]}}};
  alert("drawchart 1");
  console.log(response)
  drawChart(response.TotalErrorList);
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
      var emails = "?";
      var n;
      var reqEmail = "emails=";
      for (var i = 0; i < merchantID.length; i++) { 
        n = merchantID.indexOf(',',i); 
        if(n == -1)
        {
          console.log("inside n == -1");
          n = merchantID.length;
        }
        reqEmail += merchantID.substring(i,n);
        emails += reqEmail;
        console.log(reqEmail);

        reqEmail = "&emails=";
        i = n;
      }
      console.log(emails);
      alert(emails);
      var url = emails;
		  url += "&fromdate=";
		  url += datefrom;
		  url += "&todate=";
		  url += dateto;
      alert(url); 
		  EmailListDateRange(url);
			return true
		 }
	   }
	   else
	   {
      //var url = "https://localhost:8443/v1/Board/FileTableListByEmailListDateRange?emails=rwong-davis-network@paypal.com&fromdate=2012-01-01&todate=2015-01-01";
		 merchantID = "?emails=rwong-davis-network@paypal.com&fromdate=2012-01-01&todate=2015-01-01";
		 console.log("?emails=rwong-davis-network@paypal.com&fromdate=2012-01-01&todate=2015-01-01");
		 EmailListDateRange(merchantID);
		
	   }
  
  }
function drawChart(response) {
  console.log("Inside drawChart");
  console.log(response);
  var data1 = [['Error Name', 'No of Errors']];
  var data2 = [['Error Name','Error Code', 'No of Errors']];
  for(var i = 0 ; i < response.reasonCodeSet.entry.length;i++)
  {
    var name = response.reasonCodeSet.entry[i].value.name + ' ('+ response.reasonCodeSet.entry[i].key.toString()+')';
 //   var name1 = name;
	name +=  " : " + response.reasonCodeSet.entry[i].value.total.toString();
    data1.push([name,response.reasonCodeSet.entry[i].value.total]);
	data2.push([response.reasonCodeSet.entry[i].value.name,response.reasonCodeSet.entry[i].key,response.reasonCodeSet.entry[i].value.total]);  
  }
   
   var data = google.visualization.arrayToDataTable(data1);
   var tabledata = google.visualization.arrayToDataTable(data2);
        var options = {
          title: "Error Status",
          titleTextStyle: {color: '#3366CC'},
          
          is3D: false,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
		
		var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(tabledata, {showRowNumber: true});
      }


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
