```
  _____             _                      ____   ____   __     __
 | ____|  _ __     (_)   ___    _   _     / ___| / ___|  \ \   / /
 |  _|   | '_ \    | |  / _ \  | | | |   | |     \___ \   \ \ / / 
 | |___  | | | |   | | | (_) | | |_| |   | |___   ___) |   \ V /  
 |_____| |_| |_|  _/ |  \___/   \__, |    \____| |____/     \_/   
                 |__/           |___/
```
Enjoy your csv transformation

Requirements:
  - Node v14.15 or higher 
  - yarn 2 

Usage:  
1) Install dependencies
```
yarn 
```
2) General cli usage
```
node index.js <MODE> <INPUT_FILE_PATH> <OUTPUT_FILE_PATH>
```
3) Run demo usecase:
```
node index.js demo demo.csv output/demo.csv
```
Checkout `demo.csv`. In the demo usecase we want to rename the column `description` to `name` and trim all the values. Further we add `0.10` to every value in the price column. Checkout the result in `output/demo.csv`. If everything is fine your setup is correct and you are good to go!

4) Create your own mode for your usecase:  
 - Add a new mode in the `src/modes/` directory. After having a look on the demo implementation this should be self explanatory.
 - Import the new mode in `index.js` and add it to the switch statement.

5) Running tests
```
yarn test
```

