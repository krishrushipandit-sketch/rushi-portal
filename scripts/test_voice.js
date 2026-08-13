const https = require('https');

async function testGemini() {
  const payload = JSON.stringify({
    transcript: "I made 5 sales calls and did video editing for amicus claims check in at 10 am",
    responsibilities: ["Sales", "Video Editing"]
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/reports/voice',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = require('http').request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('Voice API Result:', data);
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(payload);
  req.end();
}

testGemini();
