// [NCMB] APIキー設定
var appKey    = "f439ff7ff148b98ac3eafb378d819ce83a74fc6acb8b3ad2b9fcb9cf31fc4bd3";
var clientKey = "3b094aad2b34a988cf1d8130b7bc401d256dc38600be6e7ade885135b4b356d2";

// [NCMB] SDKの初期化
var ncmb = new NCMB(appKey, clientKey);

// ログイン中の会員
var currentLoginUser; 

// debag account
// ID[ test ]
// PASS[ 12345678 ]

/********** ID / PW 認証 **********/
// 【ID / PW 認証】「登録する」ボタン押下時の処理
function onIDRegisterBtn() {
    // 入力フォームからID(username)とPW(password)を取得
    var username = $("#reg_username").val();
    var password = $("#IDReg_password").val();
    // loading の表示
    $.mobile.loading('show');
    // [NCMB] user インスタンスの生成
    var user = new ncmb.User();
    // [NCMB] ID / PW で新規登録
    user.set("userName", username)
        .set("password", password)
        .signUpByAccount()
        .then(function(user) {
            /* 処理成功 */
            console.log("【ID / PW 認証】新規登録に成功しました");
            // [NCMB] userインスタンスでログイン
            ncmb.User.login(user)
                     .then(function(user) {
                         /* 処理成功 */
                         console.log("【ID / PW 認証】ログインに成功しました");
                         // [NCMB] ログイン中の会員情報の取得
                         currentLoginUser = ncmb.User.getCurrentUser();
                         // フィールドを空に
                         $("#reg_username").val("");
                         $("#IDReg_password").val("");
                         // 詳細ページへ移動
                         $.mobile.changePage('#DetailPage');
                     })
                     .catch(function(error) {
                         /* 処理失敗 */
                         console.log("【ID / PW 認証】ログインに失敗しました: " + error);
                         alert("【ID / PW 認証】ログインに失敗しました: " + error);
                         // フィールドを空に
                         $("#reg_username").val("");
                         $("#IDReg_password").val("");
                         // loading の表示
                         $.mobile.loading('hide');
                     });
        })
        .catch(function(error) {
            /* 処理失敗 */
            console.log("【ID / PW 認証】新規登録に失敗しました：" + error);
            alert("【ID / PW 認証】新規登録に失敗しました：" + error);
            // フィールドを空に
            $("#reg_username").val("");
            $("#IDReg_password").val("");
            // loading の表示
            $.mobile.loading('hide');
        });
}

// 【ID / PW 認証】「ログインする」ボタン押下時の処理
function onIDLoginBtn() {
    // 入力フォームからID(username)とPW(password)を取得
    var username = $("#login_username").val();
    var password = $("#IDLogin_password").val();
    // loading の表示
    $.mobile.loading('show');
    
    // [NCMB] ID / PW でログイン
    ncmb.User.login(username, password)
             .then(function(user) {
                 /* 処理成功 */
                 console.log("【ID / PW 認証】ログインに成功しました");
                 // [NCMB] ログイン中の会員情報の取得
                 currentLoginUser = ncmb.User.getCurrentUser();
                 // フィールドを空に
                 $("#login_username").val("");
                 $("#IDLogin_password").val("");
                 // 詳細ページへ移動
                 $.mobile.changePage('#DetailPage');
             })
             .catch(function(error) {
                 /* 処理失敗 */
                 console.log("【ID / PW 認証】ログインに失敗しました: " + error);
                 alert("【ID / PW 認証】ログインに失敗しました: " + error);
                 // フィールドを空に
                 $("#login_username").val("");
                 $("#IDLogin_password").val("");
                 // loading の表示終了
                 $.mobile.loading('hide');
             });
}

/********** メールアドレス / PW 認証 **********/
// 【メール / PW 認証】「登録する」ボタン押下時の処理
function onEmailRegisterBtn() {
    // loading の表示
    $.mobile.loading('show');
    // 入力フォームからメールアドレス(mailAddress)を取得
    var mailAddress = $("#reg_mailAddress").val();
    // [NCMB] メールアドレス に会員登録を行うためのメールを送信
    ncmb.User.requestSignUpEmail(mailAddress)
             .then(function(user){
                 /* 処理成功 */
                 alert("【メール / PW 認証】新規登録メールを配信しました。");
                 console.log("【メール / PW 認証】新規登録メールを配信しました。");
                 alert("届いたメールに記載されているURLにアクセスし、パスワードを登録してください。");
                 // フィールドを空に
                 $("#reg_mailAddress").val("");
                 // loading の表示終了
                 $.mobile.loading('hide');
                 // 【メール / PW 認証】ログインページへ移動
                 $.mobile.changePage('#emailLoginPage');
             })
             .catch(function(error){
                 /* 処理失敗 */
                 alert("【メール / PW 認証】新規登録メールの配信に失敗しました：" + error);
                 console.log("【メール / PW 認証】新規登録メールの配信失敗しました：" + error);
                 // loading の表示終了
                 $.mobile.loading('hide');
             });
}

// 【メール / PW 認証】「ログインする」ボタン押下時の処理
function onEmailLoginBtn() {
    // 入力フォームからメールアドレス(mailAddress)とPW(password)を取得
    var mailAddress = $("#login_mailAddress").val();
    var password = $("#emailLogin_password").val();
    // loading の表示
    $.mobile.loading('show');
    // [NCMB] メール / PW でログイン
    ncmb.User.loginWithMailAddress(mailAddress, password)
             .then(function(user) {
                 /* 処理成功 */
                 console.log("【メール / PW 認証】ログインに成功しました");
                 // [NCMB] ログイン中の会員情報の取得
                 currentLoginUser = ncmb.User.getCurrentUser();
                 // フィールドを空に
                 $("#login_mailAddress").val("");
                 $("#emailLogin_password").val("");
                 // 詳細ページへ移動
                 $.mobile.changePage('#DetailPage');
             })
             .catch(function(error) {
                 /* 処理失敗 */
                 console.log("【メール / PW 認証】ログインに失敗しました: " + error);
                 alert("【メール / PW 認証】ログインに失敗しました: " + error);
                 // フィールドを空に
                 $("#login_mailAddress").val("");
                 $("#emailLogin_password").val("");
                 // loading の表示
                 $.mobile.loading('hide');
             });
}

/********** 匿名認証**********/
// 【匿名認証】「ログインする」ボタン押下時の処理 
function onAnonymousLoginBtn() {
    // loading の表示
    $.mobile.loading('show');
    // [NCMB] 匿名 でログイン
    ncmb.User.loginAsAnonymous()
             .then(function(user){
                 /* 処理成功 */
                 console.log("【匿名認証】ログインに成功しました");
                 // [NCMB] ログイン中の会員情報の取得
                 currentLoginUser = ncmb.User.getCurrentUser();
                 // 詳細ページへ移動
                 $.mobile.changePage('#DetailPage');
             })
             .catch(function(error){
                 /* 処理失敗 */
                 console.log("【匿名認証】ログインに失敗しました: " + error);
                 alert("【匿名認証】ログインに失敗しました: " + error);
                 // loading の表示
                 $.mobile.loading('hide');
             });
}

// mypageに飛ぶボタン
function onMypageBtn(){
      // loading の表示
      $.mobile.loading('show');
      // [NCMB] ログイン中の会員情報の取得
      currentLoginUser = ncmb.User.getCurrentUser();
      // idou
      $.mobile.changePage('#MyPage');
}

// back to top
function onBackBtn(){
      // loading の表示
      $.mobile.loading('show');
      // [NCMB] ログイン中の会員情報の取得
      currentLoginUser = ncmb.User.getCurrentUser();
      // idou
      $.mobile.changePage('#DetailPage');
}

//*****デバイス内画像upload*****//
document.addEventListener("deviceready", onDiviceReady, false);

function onDiviceReady() {
  var reader = new FileReader();
  reader.onload = function(e) {
    var dataUrl = reader.result;
    document.getElementById("preview").src = dataUrl;
  }
  // ファイルを選択したら実行
  var photo = document.getElementById("photo");
  photo.addEventListener('change', function(e) {
    e.preventDefault();
    var file = e.target.files[0];
    document.getElementById("filename").value = file.name
    reader.readAsDataURL(file);
  }, false);
  // ファイルアップロード
  var submit = document.getElementById("submit");
  submit.addEventListener("click", function(e) {
    // [NCMB] ログイン中の会員情報の取得
    currentLoginUser = ncmb.User.getCurrentUser();
        var objectId = currentLoginUser.get("objectId");
        var userName = currentLoginUser.get("userName");
    // ファイル名、ファイルデータを取得
    var fileName = document.getElementById("filename").value;
    var fileData = dataURItoBlob(document.getElementById("preview").src);
    // 画像アップロード
    ncmb.File.upload(fileName, fileData)
      .then(function(res) {
        // アップロード成功時の処理
        console.log("画像アップロード成功");
          // タイトルと画像の説明の入力欄を作成
          var title = document.createElement("input");
          title.id = "titleData";
          title.type = "text";
          title.placeholder = "タイトル";
          var comment = document.createElement("textarea");
          comment.id = "commentData";
          comment.placeholder = "画像の説明";
          // 画像情報の登録ボタンの生成
          var sendBtn = document.createElement("button");
          sendBtn.onclick = saveData(fileName);
          sendBtn.innerHTML = "投稿する";
          // 画面に追加
          document.getElementById("title").appendChild(title);
          document.getElementById("comment").appendChild(comment);
          document.getElementById("btn").appendChild(sendBtn);
          function saveData(fileName) {
          return function() {
              var title = document.getElementById("titleData").value;
              var comment = document.getElementById("commentData").value;
              // 入力チェック
              if (title === "" || comment === "") {
                  return alert("未入力の項目があります")
              };
              var FileData = ncmb.DataStore("FileData");
              var fileData = new FileData();
              fileData.set("fileName", fileName)
                  .set("title", title)
                  .set("comment", comment)
                  .set("UserID",objectId)
                  .save()
                  .then(function(result){
                  // 保存成功
                  alert("投稿完了")
                  })
                  .catch(function(error){
                  // 保存失敗
                  alert("投稿に失敗しました" + error);
                  });
          }
          }
      })
})
}
// 画像データをBlobに変換するやつ
  function dataURItoBlob(dataURI) {
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {type:mimeString});
  }

// ***** 自身の投稿 ***** //
$(document).on('pageshow','#MyPage', function(e,d) {
  GetMyData();
  DLMyPhoto();
});
// loginUserデータ取得
currentLoginUser = ncmb.User.getCurrentUser();
var objectId = currentLoginUser.get("objectId");
var userName = currentLoginUser.get("userName");
// 投稿内容の取得
function GetMyData(){
  var FileData = ncmb.DataStore("FileData");
  FileData.fetchAll()
          .then(function(results){
            console.log("getting");
           for (var i = 0; i < results.length; i++) {
                // リストに表示
                var object = results[i];
                var title = document.createElement("dt");
                title.innerHTML = object.get("title");
                var comment = document.createElement("dd");
                comment.innerHTML = object.get("comment");
                //
                var fileName = object.get("fileName");
                document.getElementById("photoList").appendChild(title);
                document.getElementById("photoList").appendChild(comment);
            }
        })
        .catch(function(err){
            console.log(err);
        });
}
// 写真データの取得
// var fileName = object.get("fileName");
function DLMyPhoto(){
  // ファイルリーダーの起動
var reader = new FileReader();
reader.onload = function() {
    var dataUrl = reader.result;
    document.getElementById("loadPhoto").src = dataUrl;
}
function downloadFile(fileName) {
    return function() {              
        // Blob形式で画像データを取得
        ncmb.File.download(fileName, "blob")
            .then(function(blob) {
                // ファイルリーダーにデータを渡す
                reader.readAsDataURL(blob);
            })
            .catch(function(error) {
                alert(error);
            })

    }
}
}

/********** 共通 **********/
// 「ログアウト」ボタン押下後確認アラートで「はい」押下時の処理
function onLogoutBtn() {  
    // [NCMB] ログアウト
    ncmb.User.logout();
    console.log("ログアウトに成功しました");
    // ログイン中の会員情報を空に
    currentLoginUser = null;
    // currentUserDataリストを空に
    $("#currentUserData").empty();
    // 【ID / PW】ログインページへ移動
    $.mobile.changePage('#IDLoginPage');
}

//---------------------------------------------------------------------------

// アプリ起動時
$(function() {
    $.mobile.defaultPageTransition = 'none';
    /* ID / PW */
    $("#IDLoginBtn").click(onIDLoginBtn);
    $("#IDRegisterBtn").click(onIDRegisterBtn);
    /* メール / PW */
    $("#emailLoginBtn").click(onEmailLoginBtn);
    $("#YesBtn_mailAddress").click(onEmailRegisterBtn);
    $("#NoBtn_mailAddress").click(onDeleteField);  
    /* 匿名 */
    $("#anonymousLoginBtn").click(onAnonymousLoginBtn);
    /* 共通 */
    $("#YesBtn_logout").click(onLogoutBtn);
    // maipe
    $("#Mypage_Btn").click(onMypageBtn);
    // back to top
    $("#Back_Btn").click(onBackBtn);
});

// loading 表示生成
$(document).on('mobileinit',function(){
    $.mobile.loader.prototype.options;
});

// DetailPage ページが表示されるたびに実行される処理
$(document).on('pageshow','#DetailPage', function(e, d) {
    // currentUserData を表示
    getUserData();
    // loading の表示を終了
    $.mobile.loading('hide');
});

// currentUser のデータを表示する処理
function getUserData() {
    // 値を取得
    var objectId = currentLoginUser.get("objectId");
    var userName = currentLoginUser.get("userName");
    var mailAddress = currentLoginUser.get("mailAddress");
    var authData = JSON.stringify(currentLoginUser.get("authData"));
    var date = new Date(currentLoginUser.get("createDate"));
    var createDate = date.getFullYear() + "-" 
                    + ((date.getMonth() < 10) ? "0" : "") + date.getMonth() + "-"
                    + ((date.getDate() < 10) ? "0" : "") + date.getDate() + "T"
                    + ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":"
                    + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":" 
                    + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds() + "." 
                    + ((date.getMilliseconds() < 10) ? "0" : "") + date.getMilliseconds() + "+09:00";
    // リストに追加
    $("#currentUserData").append("<tr style='border-right: 1px solid #ccc; border-left: 1px solid #ccc; color: #FFFFFF; background: #04162e;'><th scope='row' id='key'>key</th><td scope='row' id='value' style='width: 100%;'>value</td></tr>");
    $("#currentUserData").append("<tr><th>objectId</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='" + objectId + "'/></tr>");
    $("#currentUserData").append("<tr><th>userName</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='" + userName + "'/></tr>");
    $("#currentUserData").append("<tr><th>password</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='(hidden)'/></tr>");
    $("#currentUserData").append("<tr><th>mailAddress</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='" + mailAddress + "'/></tr>");
    $("#currentUserData").append("<tr><th>authData</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='" + authData + "'/></tr>");
    $("#currentUserData").append("<tr><th>createDate</th><td><input type='text' style='width: 95%; color: #959595;' readonly='readonly'; value='" + createDate + "'/></tr>");
    // リストを更新
    $("#currentUserData").listview('refresh');
}

function onDeleteField() {
    // フィールドを空に
    $("#reg_mailAddress").value;
}