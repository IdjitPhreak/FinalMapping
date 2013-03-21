GIT_DIR=~/Git
FINALMAPPING_DIR=FinalMapping
FINALRAY_DIR=~/assets/www

if [ ! -d "$GIT_DIR" ]; then
	mkdir $GIT_DIR
fi

cd $GIT_DIR

if [ ! -d "$JSOBJECTS_DIR" ]; then
	git clone git://github.com/IdjitPhreak/FinalMapping.git
fi

if [ ! -L "$FINALRAY_DIR" ]; then
	ln -s ~/Git/FinalMapping/FinalRay/ $FINALRAY_DIR
fi

cd $FINALRAY_DIR
npm install
nodejs server.js
