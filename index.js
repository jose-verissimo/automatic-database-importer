// Include the dependency we need.
const { exec } = require('child_process');


// Where would the file be located?
let dumpFile = 'dump.sql';	


// Database connection settings.
let exportFrom = {
	host: "localhost",
	user: "mysqluser",
	password: "mysqlpassword",
	database: "production_database"
}
let importTo = {
	host: "localhost",
	user: "mysqluser",
	password: "mysqlpassword",
	database: "development_database"
}

console.log(`Starting exporting data from the ${exportFrom.database} database`);

// Execute a MySQL Dump and redirect the output to the file in dumpFile variable.
exec(`mysqldump -u${exportFrom.user} -p${exportFrom.password} -h${exportFrom.host} --compact ${exportFrom.database} > ${dumpFile}`, (err, stdout, stderr) => {
	if (err) { console.error(`exec error: ${err}`); return; }
	
	console.log(`Now, importing data to the ${importTo.database} database`);
    
	// Import the database.
	exec(`mysql -u${importTo.user} -p${importTo.password} -h${importTo.host} ${importTo.database} < ${dumpFile}`, (err, stdout, stderr) => {
        if (err) { console.error(`exec error: ${err}`); return; }

        console.log(`The import has finished.`);
	});

});