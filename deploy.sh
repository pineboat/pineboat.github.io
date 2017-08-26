#! /bin/bash
export THEME_DIR="themes/beehive/"
export SOURCE_DIR="/home/weebee/Projects/beehive/"
export DEV_DIR="/home/weebee/Projects/pineboat/development/"
export RELEASE_DIR="/home/weebee/Projects/pineboat/release"

rm -rf $DEV_DIR$THEME_DIR && echo "Existing theme folder removed."
cp -r $SOURCE_DIR$THEME_DIR $DEV_DIR$THEME_DIR && echo "New theme folder copied."
hugo -s $DEV_DIR -d $RELEASE_DIR && echo "Hugo build completed."
 

