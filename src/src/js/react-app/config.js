module.exports = {
   "development": {
         //SERVER_URL: "http://localhost:3090/api",
	   	SERVER_URL: "http://localhost/api",
         //ROOT_URL: "http://localhost:8080",
	   	ROOT_URL: "http://localhost",
      ARTICLES_UPLOADS_PATH: '/uploads/articles/',
	   	TREES_UPLOADS_PATH: '/uploads/trees/',
   },
   "production": {
         //SERVER_URL: "https://artintheopen.ca/api",
	   	SERVER_URL: "https://naturewithus.com",
	   	ROOT_URL: "https://naturewithus.com",
	   	ARTICLES_UPLOADS_PATH: '/uploads/articles/',
      TREES_UPLOADS_PATH: '/uploads/trees/',
   },
   "globals": {
      HIDE_MENU_THRESHOLD: 1150,
   		POST_CONFIG: {
           headers: {
             'CONTENT_TYPE': 'application/json',
           }
         },
      ADMIN_ENTRIES_PER_PAGE: 4,
      ADMIN_URL: 'admin'
   	}
}