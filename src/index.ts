import {
  QMainWindow,
  QWidget,
  QLabel,
  FlexLayout,
  QPushButton,
  QIcon,
  FileMode,
  QInputDialog,
  QLineEdit,
} from "@nodegui/nodegui";
import { exec } from "child_process";
import logo from "../assets/logox200.png";
import logo2 from "../assets/RAM50.png";

const win = new QMainWindow();
win.setWindowTitle("DMS Easy Git");
var datas;

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);

const commitMessage = new QLineEdit();
commitMessage.setText("commit messsage");
commitMessage.setObjectName("commitMessageText");

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

  exec("cd " + selectedFiles, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    browseButton.setText("✔️");
    browseButton.setInlineStyle("background-color:green");
  });
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
});

const buttonCommit = new QPushButton();
buttonCommit.setText("Git Commit");
buttonCommit.addEventListener("clicked", () => {
  exec(
    "cd " + datas + "&&" + " git commit -m " + commitMessage.text(),
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
rootLayout.addWidget(commitMessage);
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
