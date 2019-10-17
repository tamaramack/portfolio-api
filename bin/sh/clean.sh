if [ -n "$1" ] && [ -d node_modules ];
then
  echo "Ultra Cleaning."
  rm .eslintcache
  rm package-lock.json
  rm -rf node_modules
fi

if [ -d dist ] && [ -d devdist ];
then
  rm -r dist
  rm -r devdist
fi
