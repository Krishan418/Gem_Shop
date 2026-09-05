const http = require('http');

fetch('http://localhost:3000/gems/royal-ceylon-cornflower-blue-sapphire')
  .then(res => res.text())
  .then(html => {
    const match = html.match(/https:\/\/wa\.me\/[^"\s]+/);
    if (match) {
      console.log('--- FOUND WHATSAPP LINK ---');
      console.log(decodeURIComponent(match[0]));
    } else {
      console.log('No WhatsApp link found.');
    }
  })
  .catch(err => console.error(err));

