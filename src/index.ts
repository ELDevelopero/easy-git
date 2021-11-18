import {
  QMainWindow,
  QWidget,
  QLabel,
  FlexLayout,
  QPushButton,
  QIcon,
  FileMode,
} from "@nodegui/nodegui";
import { exec } from "child_process";
import logo from "../assets/logox200.png";

const win = new QMainWindow();
win.setWindowTitle("DMS Easy Git");
var datas;

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);

const browseFolder = new QLabel();
browseFolder.setObjectName("browselabel");
browseFolder.setText("Hello");

const { QFileDialog } = require("@nodegui/nodegui");

const browseButton = new QPushButton();
browseButton.setText("Browse Project Directory");
browseButton.addEventListener("clicked", () => {
  const fileDialog = new QFileDialog();
  fileDialog.setFileMode(FileMode.Directory);
  fileDialog.exec();
  const selectedFiles = fileDialog.selectedFiles();

  console.log(selectedFiles);
  datas = selectedFiles;

  exec("cd " + selectedFiles + " git add .", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  // var cmdCD = require("node-cmd");
  // var check = cmdCD.run(`cd .. `);

  // console.log("check"),
  //   function (err, data, stderr) {
  //     console.log(
  //       "examples dir now contains the example file along with : ",
  //       data
  //     );
  // };

  // function (error, stdout, stderr) {
  //   if (error) browseButton.setText(error);
  //   console.log("stdout: " + stdout);
  // }
});

const buttonGitAdd = new QPushButton();
buttonGitAdd.setText("Git Add .");
buttonGitAdd.addEventListener("clicked", () => {
  exec("cd " + datas + "&&" + " git add .", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  // var cmdGitAdd = require("node-cmd");
  // var add = cmdGitAdd.run(datas + `git add .`);
  // console.log(add);
});
const buttonCommit = new QPushButton();
buttonCommit.setText("Git Commit");
buttonCommit.addEventListener("clicked", () => {
  exec(
    "cd " + datas + "&&" + ` git commit -m "test 2"`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
  // var cmdCommit = require("node-cmd");
  // var commit = cmdCommit.run(datas + `git commit -m "test 2"`);
  // console.log(commit, datas + "nunu");
});

const buttonPush = new QPushButton();
buttonPush.setText("Git Push");
buttonPush.addEventListener("clicked", () => {
  exec("cd " + datas + "&&" + " git push", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  // var cmdPush = require("node-cmd");
  // var push = cmdPush.run(datas + `git push`);
  // console.log(push + "dada");
});
const button = new QPushButton();
button.setIcon(new QIcon(logo));

const label2 = new QLabel();
label2.setText("World");
label2.setInlineStyle(`
  color: red;
`);

rootLayout.addWidget(browseFolder);
rootLayout.addWidget(browseButton);
rootLayout.addWidget(buttonGitAdd);
rootLayout.addWidget(buttonCommit);
rootLayout.addWidget(buttonPush);
rootLayout.addWidget(label2);
win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #myroot {
      background-color: #009688;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
    }
    #mylabel {
      font-size: 16px;
      font-weight: bold;
      padding: 1;
    }
  `
);
win.show();

(global as any).win = win;
