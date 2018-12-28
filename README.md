# site-starter
Starter setup for an html or php site using Angular and service workers

### To run (in /src):
install
```
npm install
```
start
```
npm start

### Notes:
-to adjust the layout template html use: src/layout-template.php
(this is used by HtmlWebpackPlugin to create the layout file)

-needs to run on Node version 6.9.1
(use nvm for ease of use)

query builder:
https://github.com/izniburak/pdox

# Last SQL Query.
$this->db->getQuery(); 

#debug log
Utils::dbug();

Utils::json_respond(SUCCESS_RESPONSE, $response);
Utils::json_respond_error('Could not create article', $e->getMessage());