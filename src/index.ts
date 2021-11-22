import {
  QMainWindow,
  QWidget,
  QLabel,
  FlexLayout,
  QPushButton,
  FileMode,
  QLineEdit,
  QPixmap,
  QCheckBox,
  QMessageBox,
} from "@nodegui/nodegui";
import { exec } from "child_process";
import logo from "../assets/gitLogo.png";

const win = new QMainWindow();
win.setWindowTitle("DMS Easy Git");
var datas;
var skin = true;

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);

const labelImage = new QLabel();
labelImage.setObjectName("imageLabel");
const image = new QPixmap();
image.load(logo);
labelImage.setPixmap(image);

const commitMessage = new QLineEdit();
commitMessage.setText("commit message");
commitMessage.setInlineStyle("color:red");
commitMessage.setObjectName("commitMessageText");

const infoBox = new QLineEdit();
var infoData = "";
infoBox.setText(infoData);

const browseFolder = new QLabel();
browseFolder.setObjectName("browselabel");

const { QFileDialog } = require("@nodegui/nodegui");

const browseButton = new QPushButton();
browseButton.setObjectName("buttonsLabes");
browseButton.setText("Browse");
browseButton.addEventListener("clicked", (e) => {
  const fileDialog = new QFileDialog();
  fileDialog.setFileMode(FileMode.Directory);
  fileDialog.exec();
  const selectedFiles = fileDialog.selectedFiles();

  console.log(selectedFiles);
  datas = selectedFiles;

  exec("cd " + selectedFiles, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      browseButton.setText("Browse ❌");
      browseButton.setObjectName("errorLabel");
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      browseButton.setText("Browse ❌");
      browseButton.setObjectName("errorLabel");
      return;
    }
    console.log(`stdout: ${stdout}`);
    browseButton.setText("Browse ✔️");
    browseButton.setObjectName("passLabel");
  });
});

const buttonGitAdd = new QPushButton();
buttonGitAdd.setText("Git Add .");
buttonGitAdd.setObjectName("buttonsLabes");
buttonGitAdd.addEventListener("clicked", (e) => {
  exec("cd " + datas + "&&" + " git add .", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      buttonGitAdd.setText("Git Add ❌");
      buttonGitAdd.setObjectName("errorLabel");
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      buttonGitAdd.setText("Git Add ❌");
      buttonGitAdd.setObjectName("errorLabel");
      return;
    }
    console.log(`stdout: ${stdout}`);
    buttonGitAdd.setText("Git Add . ✔️");
    buttonGitAdd.setObjectName("passLabel");
  });
});

const buttonCommit = new QPushButton();
buttonCommit.setText("Git Commit");
buttonCommit.setObjectName("buttonsLabes");
buttonCommit.addEventListener("clicked", () => {
  exec(
    "cd " + datas + "&&" + " git commit -m " + commitMessage.text(),
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        buttonCommit.setText("Git Commit ❌");
        buttonCommit.setObjectName("errorLabel");
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        buttonCommit.setText("Git Commit ❌");
        buttonCommit.setObjectName("errorLabel");

        return;
      }
      console.log(`stdout: ${stdout}`);
      buttonCommit.setText("Git Commit ✔️");
      buttonCommit.setObjectName("passLabel");
    }
  );
});

const buttonPush = new QPushButton();
buttonPush.setText("Git Push");
buttonPush.setObjectName("buttonsLabes");
buttonPush.addEventListener("clicked", () => {
  exec("cd " + datas + "&&" + " git push", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      buttonPush.setText("Git Push ❌");
      buttonPush.setObjectName("errorLabel");
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      infoData = stderr;
      return;
    }
    console.log(`stdout: ${stdout}`);
    buttonPush.setText("Git Push ✔️");
    buttonPush.setObjectName("passLabel");
  });
  if (count % 2 != 0) {
    buttonGitAdd.setText("Git Add .");
    buttonGitAdd.setObjectName("standardLabel");
    buttonCommit.setText("Git Commit");
    buttonCommit.setObjectName("standardLabel");
    buttonPush.setText("Git Push");
    buttonPush.setObjectName("standardLabel");
    commitMessage.setObjectName("commitMessageText");
  } else {
    centralWidget.setObjectName("myrootDark");
    buttonCommit.setObjectName("darkLabel");
    buttonCommit.setText("Git Commit");
    buttonPush.setObjectName("darkLabel");
    buttonPush.setText("Git Push");
    buttonGitAdd.setObjectName("darkLabel");
    buttonGitAdd.setText("Git Add .");
    browseButton.setObjectName("darkLabel");
    commitMessage.setObjectName("commitMessageTextDark");
  }
});

const buttonSkin = new QCheckBox();
var count = 1;
buttonSkin.setText("Dark");
buttonSkin.setInlineStyle("justify-content: flex-start;");
buttonSkin.addEventListener("clicked", () => {
  count += 1;
  if (count % 2 != 0) {
    centralWidget.setObjectName("myroot");
    buttonSkin.setText("Dark");
    buttonCommit.setObjectName("standardLabel");
    buttonPush.setObjectName("standardLabel");
    buttonGitAdd.setObjectName("standardLabel");
    browseButton.setObjectName("standardLabel");
    commitMessage.setObjectName("commitMessageText");
    buttonSkin.setInlineStyle("color:black");
    versionLabel.setInlineStyle(
      "font-size:12; font-weight: bold; padding: 4; margin: 4; color:black"
    );
  } else {
    centralWidget.setObjectName("myrootDark");
    buttonCommit.setObjectName("darkLabel");
    buttonPush.setObjectName("darkLabel");
    buttonGitAdd.setObjectName("darkLabel");
    browseButton.setObjectName("darkLabel");
    commitMessage.setObjectName("commitMessageTextDark");
    buttonSkin.setInlineStyle("color: grey");
    versionLabel.setInlineStyle(
      "font-size:12; font-weight: bold; padding: 4; margin: 4; color:white"
    );
  }
});

const versionLabel = new QLabel();
versionLabel.setInlineStyle(
  "font-size:12; font-weight: bold; padding: 4; margin: 4;"
);
versionLabel.setText("Version: 1.0.0");

rootLayout.addWidget(labelImage);
rootLayout.addWidget(buttonSkin);
rootLayout.addWidget(browseFolder);
rootLayout.addWidget(browseButton);
rootLayout.addWidget(buttonGitAdd);
rootLayout.addWidget(commitMessage);
rootLayout.addWidget(buttonCommit);
rootLayout.addWidget(buttonPush);
rootLayout.addWidget(infoBox);
rootLayout.addWidget(versionLabel);
win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #myroot {
      background-color: #F6F5F2;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
      
    }

    #myrootDark{
      background-color: #22223b;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
    }
   
    #imageLabel{
      padding:4;
  
      }

      #buttonsLabes{
        padding:4;
        width: 135px;
        font-size: 20px;
      }

      #commitMessageText{
        padding:4;
        width:135px;
        height:50 px;
        color:blue;
        align-items: "center";
        font-size:14px;
      }

      #commitMessageTextDark{
        padding:4;
        width:135px;
        height:50 px;
        color:white;
        align-items: "center";
        font-size:14px;
        background-color: #3C415C;
      }

      #errorLabel{
        background-color: "red";
        padding:4;
        width: 135px;
        font-size: 20px;
      }

      #passLabel{
      background-color: "green";
      padding:4;
      width: 135px;
      font-size: 20px;
      }

      #standardLabel{
      background-color: #F6F5F2;
      padding:4;
      width: 135px;
      font-size: 20px;
      }

      #darkLabel{
        background-color: #4a4e69;
        padding:4;
        width: 135px;
        font-size: 20px;
        }




  `
);

win.show();

(global as any).win = win;
