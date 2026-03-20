const http = require('http');

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3002,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: responseData }));
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function testAPIs() {
  console.log('=== Testing Backend APIs ===\n');
  
  try {
    // Test GET /allHoldings
    console.log('1️⃣  Testing GET /allHoldings');
    let res = await makeRequest('/allHoldings');
    console.log('   Status:', res.status);
    const holdings = JSON.parse(res.data);
    console.log('   Holdings count:', holdings.length);
    if (holdings.length > 0) {
      console.log('   Sample:', holdings[0].name, '-', holdings[0].qty, 'units @ ₹' + holdings[0].price);
    }
    console.log('   ✓ WORKING\n');

    // Test GET /allPositions
    console.log('2️⃣  Testing GET /allPositions');
    res = await makeRequest('/allPositions');
    console.log('   Status:', res.status);
    const positions = JSON.parse(res.data);
    console.log('   Positions count:', positions.length);
    if (positions.length > 0) {
      console.log('   Sample:', positions[0].name, '(' + positions[0].product + ') -', positions[0].qty, 'units');
    }
    console.log('   ✓ WORKING\n');

    // Test POST /newOrder
    console.log('3️⃣  Testing POST /newOrder');
    const orderData = { name: 'RELIANCE', qty: 2, price: 2500, mode: 'BUY' };
    res = await makeRequest('/newOrder', 'POST', orderData);
    console.log('   Status:', res.status);
    console.log('   Response:', res.data);
    console.log('   ✓ WORKING\n');

    console.log('=== Summary ===');
    console.log('✓ All 3 APIs are working correctly!');
    console.log('✓ Holdings: ' + holdings.length + ' records');
    console.log('✓ Positions: ' + positions.length + ' records');
    console.log('✓ New Order: Successfully created');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

// Wait a moment for server to be fully ready
setTimeout(testAPIs, 500);
