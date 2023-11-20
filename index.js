    function setupWebSocket(ticker, rowId, priceId) {
      let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${ticker.toLowerCase()}usdt@trade`);
      let priceElement = document.getElementById(priceId);
      let lastPrice = null;

      ws.onopen = () => {
        console.log(`${ticker} WebSocket connection opened.`);
      };

      ws.onmessage = (event) => {
        let stockObject = JSON.parse(event.data);
        let price = parseFloat(stockObject.p).toFixed(2);
        priceElement.innerText = `$${price}`;

        priceElement.style.color = !lastPrice || lastPrice === price ? 'white' : price > lastPrice ? 'green' : 'red';

        lastPrice = price;
      };

      ws.onclose = (event) => {
        if (event.wasClean) {
          console.log(`${ticker} Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
        } else {
          console.error(`${ticker} Connection died`);
        }
      };

      ws.onerror = (error) => {
        console.error(`${ticker} WebSocket Error: ${error}`);
      };

      // Close WebSocket when the page is unloaded
      window.addEventListener('beforeunload', () => {
        ws.close();
      });
    }

    // Set up WebSocket for each ticker
    setupWebSocket('BTC', 'btc-row', 'btc-price');
	setupWebSocket('ETH', 'eth-row', 'eth-price');
    setupWebSocket('SOL', 'sol-row', 'sol-price');
	setupWebSocket('MATIC', 'matic-row', 'matic-price');