const http = require('http');

async function testServer() {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/',
        method: 'GET'
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, res => {
            console.log(`Status Code: ${res.statusCode}`);
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    console.log('Server Response:', response);
                    resolve(response);
                } catch (error) {
                    console.error('Error parsing response:', error);
                    reject(error);
                }
            });
        });

        req.on('error', error => {
            console.error('Connection error:', error.message);
            if (error.code === 'ECONNREFUSED') {
                console.log('\nTroubleshooting steps:');
                console.log('1. Check if the server is running (npm run dev)');
                console.log('2. Verify MongoDB service is running');
                console.log('3. Check if port 5000 is available');
            }
            reject(error);
        });

        req.end();
    });
}

testServer().catch(error => {
    console.error('Test failed:', error.message);
    process.exit(1);
});