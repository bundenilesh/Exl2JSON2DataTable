var t = $('#tablee').DataTable();
var xlf = document.getElementById('xlf');
if(xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
function handleFile(e) {
					
				  var files = e.target.files;
				  var i,f;
				  for (i = 0, f = files[i]; i != files.length; ++i) {
					var reader = new FileReader();
					var name = f.name;
					reader.onload = function(e) {
					  var data = e.target.result;

					  var workbook = XLSX.read(data, {type: 'binary'});

					  var first_sheet_name = workbook.SheetNames[0];
					/* Get worksheet */
					var worksheet = workbook.Sheets[first_sheet_name];
					var ws_data = XLSX.utils.sheet_to_json(worksheet,{header:1});
						
	if(ws_data[0][0]=="Campaign Name" && ws_data[0][1]=="Advertiser" && ws_data[0][2]=="IO" && ws_data[2][0]=="No" && ws_data[2][1]=="Placement Name" && ws_data[2][2]=="Completions" && ws_data[2][3]=="Start Date" && ws_data[2][4]=="End Date" && ws_data[2][5]=="Budget"){
				}
				else{
				alert("Incorrect excel format");
				window.location.reload(false); 
				throw new Error('Incorrect excel format');
				}
				
					for(var i = 0; i < ws_data.length; i++){
								
								tabHead=document.getElementsByTagName("thead").item(0);
								tabBody=document.getElementsByTagName("tbody").item(0);
								var arr = [];
								row=document.createElement("tr");
									for (x in ws_data[i]) {
												
												textnode1=document.createTextNode(ws_data[i][x]);
												if(i==0){		// Campaign Header
														cell1 = document.createElement("div");
														cell1.appendChild(textnode1);
														document.getElementById("tit").appendChild(cell1);
													}
												else if(i==1){	//Campaign data
														cell1 = document.createElement("div");
														cell1.appendChild(textnode1);
														document.getElementById("dat").appendChild(cell1);

													}
												else if(i == 2){	// headers <th>
														/*
														cell1 = document.createElement("th");
														cell1.appendChild(textnode1);
														row.appendChild(cell1);
														tabHead.appendChild(row);
														*/
														
													}
												else{	//all data <td>
																												
														arr.push(ws_data[i][x]);
													}
													
												}
											if (i>2){
												arr.reverse();
												
												t.row.add( [
															arr.pop(),
															arr.pop(),
															arr.pop(),
															arr.pop(),
															arr.pop(),
															arr.pop()
														] ).draw( false );
												}
											}
					};
					reader.readAsBinaryString(f);
				  }
}
		
