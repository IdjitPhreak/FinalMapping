GIT_DIR=~/Git
JSOBJECTS_DIR=JsObjects
FINALRAY_DIR=~/FinalRay

if [ ! -d "$GIT_DIR" ]; then
	mkdir $GIT_DIR
fi

cd $GIT_DIR

if [ ! -d "$JSOBJECTS_DIR" ]; then
	git clone git://github.com/IdjitPhreak/FinalMapping.git
fi

if [ ! -L "$FINALRAY_DIR" ]; then
	ln -s ~/Git/JsObjects/FinalRay/ $FINALRAY_DIR
fi

cd $PRESIDENT_DIR
npm install
nodejs server.js
