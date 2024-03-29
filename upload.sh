#!/bin/bash
START_TIME=$(date +%s)

TEMP_FILE=source.tar.gz
export $(grep -v '^#' .env.$1.local | xargs)

echo "Build project"
vite build -l warm -m $1

echo "Create archive"
tar -czf $TEMP_FILE -C ./dist/ -T<(cd ./dist && ls)

echo "Clear work directory"
ssh $USER@$SERVER "rm -rf $WORK_DIR/*"

echo "Copy archive on server"
scp -r ./$TEMP_FILE $USER@$SERVER:$WORK_DIR

echo "Extract archive on server"
ssh $USER@$SERVER "
  tar -xzf $WORK_DIR/$TEMP_FILE -C $WORK_DIR
  rm -f $WORK_DIR/$TEMP_FILE
"

echo "Remove archive"
rm -f ./$TEMP_FILE

echo "Время выполнения: $(( $(date +%s) - $START_TIME )) секунд(ы)"