const vscode = require("vscode");
const io = require("socket.io-client");

function activate(context) {
  console.log('Congratulations, your extension "bad-plugin" is now active!');
  // 本地:
  // let socket = io.connect("http://localhost:3000");
  
  // 线上:
  let socket = io.connect("http://47.95.234.230:3001");
  //建立连接
  socket.on("connect", async () => {
    console.log("连接成功");
    //监听消息
    socket.on("newMessage", (res) => {
      console.log("消息来了", res);
      vscode.window.showInformationMessage(`${res.userName}: ${res.content}`);
    });
  });

  let disposable = vscode.commands.registerCommand(
    "bad-plugin.helloWorld",
    function () {
      vscode.window.showInformationMessage("Hello World from bad-plugin!");
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
