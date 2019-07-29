var CHANNEL_ACCESS_TOKEN = '《Access token》';
var USER_ID = '《User ID》';
var sheet = SpreadsheetApp.getActiveSheet();
var lastRow = sheet.getLastRow();
var today = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd");
var TEXT_MESSAGE = '本日の予定はありません';

for(var i = 2; i <= lastRow; i++) {
    if(today == Utilities.formatDate(sheet.getRange(i, 1).getValue(), "Asia/Tokyo", "yyyy/MM/dd")
       && !sheet.getRange(i, 2).getValue() == '') {
        TEXT_MESSAGE = '今日の予定は'
        + sheet.getRange(i, 2).getValue()
        + 'です。'
        + sheet.getRange(i, 4).getValue()
        + 'で'
        + Utilities.formatDate(sheet.getRange(i, 3).getValue(), "Asia/Tokyo", "HH時mm分")
        + 'からです。'
    }
}
function pushMessage() {
    var postData = {
        "to": USER_ID,
        "messages": [{
                     "type": "text",
                     "text": TEXT_MESSAGE,
                     }]
    };
    
    var url = "https://api.line.me/v2/bot/message/push";
    var headers = {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    };
    
    var options = {
        "method": "post",
        "headers": headers,
        "payload": JSON.stringify(postData)
    };
    var response = UrlFetchApp.fetch(url, options);
}
