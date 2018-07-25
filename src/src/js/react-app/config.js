module.exports = {
   "development": {
         //SERVER_URL: "http://localhost:3090/api",
	   	SERVER_URL: "http://localhost/api",
         //ROOT_URL: "http://localhost:8080",
	   	ROOT_URL: "http://localhost",
	   	UPLOADS_PATH: '/uploads/article_images/'
   },
   "production": {
         //SERVER_URL: "https://artintheopen.ca/api",
	   	SERVER_URL: "https://mylivedomain.com",
	   	ROOT_URL: "https://mylivedomain.com",
	   	UPLOADS_PATH: '/uploads/article_images/'
   },
   "globals": {
         HIDE_MENU_THRESHOLD: 1150,
   		POST_CONFIG: {
           headers: {
             'CONTENT_TYPE': 'application/json',
           }
         }
   	}
}