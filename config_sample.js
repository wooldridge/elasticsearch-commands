const config = {};

config.node = 'https://localhost:9200';

config.auth = {
  	username: 'USERNAME',
  	password: 'PASSWORD'
};

config.tls = {
	// Copy Elasticsearch certificate file from config/certs and reference it here
  	ca: './http_ca.crt',
  	rejectUnauthorized: false
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  	module.exports = config;
}
