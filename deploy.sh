forever stop -c "npm start" ./

# Remove any changes to the code locally
git reset --hard HEAD

git pull origin main --force

# Install app packages for the root
npm i

npm run build

# Start forever in the root
forever start -c "npm start" ./