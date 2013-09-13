# Scratch Touch

Scratch (1.4)では外部センサーを使うことが出来ます。これは、iPhoneをセンサー代わりにするデモです。

すでに2年前[Scratch Touch](https://github.com/masawada/scratch-touch)を開発していますが、気付いたらexpressとsocket.ioが劇的な仕様変更をしていて変更するのが面倒になったので一から書きました。

## 必要なもの
* iPhone (iPod touch)
* Node
* npm
* Scratch (1.4)

iPhoneをLAN経由でPCにつなぎ、NodeがScratchとiPhoneの間を仲介します。
Nodeとnpmを前もってインストールしてください。
（MacでNodeを扱うならHomebrewがオススメです。）

## 使い方
1. Nodeとnpmをインストールしましょう
2. ターミナル（端末・コマンドプロンプト）から以下のコマンドを入力します
`git clone https://github.com/masawada/New-Scratch-Touch.git scratch-touch`
`cd scratch-touch`
`npm install express jade socket.io`
`node app.js`
3. Scratchを起動します
4. 遠隔センサー接続をオンにします
5. iPhoneのSafariから"http://PCの(LAN)IPアドレス:3000/"にアクセスしてください
6. この画面を「ホーム画面に追加」して再度起動するとフルスクリーンモードで遊べます

### 遠隔センサー接続をオンにする方法
1. Scratchを起動します
2. "調べる"ボタンをクリックします
3. "スライダーセンサーの値"を右クリックします
4. "遠隔センサー接続を有効にする"をクリックします

### 仕組み

iPhoneから受け取った値を文字列にしてUDPでローカルの42001番ポートに投げつけています。`sensor-update "ax" 0 "ay" 0 "rx" 0 "ry" 0`のような感じです。また、タッチイベントを検出した場合は`broadcast "message"`のようにメッセージを送信するように実装しています。

## ライセンス
MIT License
