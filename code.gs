function spreadsheetAction()
{
  
Tamotsu.initialize(SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1csEOB_Gd8yYfaH2YUUrtZzgYBUR7X64BspgQ/edit#gid=0"));
var Profile = Tamotsu.Table.define({ sheetName: 'info' });
  return Profile;
  
}


function doGet(e) {
 
  Logger.log(e.parameter);
  return HtmlService.createHtmlOutputFromFile("index") // evaluate MUST come before setting the Sandbox mode
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  
//  return HtmlService.createTemplateFromFile('index.html')
//        .evaluate() // evaluate MUST come before setting the Sandbox mode
//        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  
}


function userClicked(name,phone,email,notes){
  
  var url = "https://docs.google.com/spreadsheets/d/1csEOB_Gd8yYfaH2YUrtZzgYBUR7X64BspgQ/edit#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("info");
  
  
    const item = {
   
    
    "Name": name,
    "Phone": phone,
    "Email": email,
    "Notes": notes,
    
  }
    
    
    spreadsheetAction().create(item);
  
  
 // ws.appendRow([name,phone,email,notes, new Date()]);
  
  /*
  MailApp.sendEmail({
    to: email,
    cc: "", 
    bcc: "", 
    subject: "Good to be connected ",
    htmlBody: "Good to be connected " + name + ",<br><br>" +
              "My contact coordinates provided below <br> <br>" +
    
              "Email:  <br>" +     
              "WhatsApp:  <br>" + 
              "Twitter:  <br>" + 
              "Website:  <br> <br>" +
    
              "Email works best. Thanks!" ,
 
  });
  
  */
  
//  Logger.log(uname+ "clicked the button !");
  return "Success";
  
}









