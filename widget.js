<!-- PayNexa Widget Embed Code (Reusable) --><script>
(function () {
  const widgets = document.querySelectorAll('.paynexa-widget');

  widgets.forEach(widget => {
    const amount = widget.getAttribute('data-amount');
    const upi = widget.getAttribute('data-merchant-upi');
    const note = widget.getAttribute('data-note') || "Payment via PayNexa";
    const name = widget.getAttribute('data-merchant-name') || "PayNexa";
    const redirect = widget.getAttribute('data-redirect') || null;
    const orderId = `PX${Math.floor(Math.random() * 100000)}`;

    const upiLink = `upi://pay?pa=${upi}&pn=${encodeURIComponent(name)}&am=${amount}&tn=${encodeURIComponent(note)}&tr=${orderId}`;

    // Container
    const box = document.createElement('div');
    box.style.padding = '20px';
    box.style.border = '1px solid #ccc';
    box.style.borderRadius = '10px';
    box.style.background = '#fff';
    box.style.textAlign = 'center';
    box.style.maxWidth = '400px';
    box.style.margin = '20px auto';

    // Title
    const title = document.createElement('h3');
    title.innerText = `Pay ₹${amount} to ${name}`;
    box.appendChild(title);

    // UPI Link
    const payBtn = document.createElement('a');
    payBtn.href = upiLink;
    payBtn.innerText = "📲 Pay with UPI App";
    payBtn.style.display = 'inline-block';
    payBtn.style.margin = '10px 0';
    payBtn.style.padding = '10px 20px';
    payBtn.style.backgroundColor = '#0057ff';
    payBtn.style.color = '#fff';
    payBtn.style.borderRadius = '8px';
    payBtn.style.textDecoration = 'none';
    payBtn.target = '_blank';
    box.appendChild(payBtn);

    // QR Canvas
    const qrCanvas = document.createElement('canvas');
    box.appendChild(qrCanvas);

    widget.appendChild(box);

    const qrScript = document.createElement('script');
    qrScript.src = 'https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js';
    qrScript.onload = () => {
      QRCode.toCanvas(qrCanvas, upiLink, function (error) {
        if (error) console.error(error);
      });
    };
    document.body.appendChild(qrScript);

    // Polling for auto success
    if (redirect) {
      const checkStatus = async () => {
        const res = await fetch(`https://your-supabase-url.supabase.co/rest/v1/payments?reference=eq.${orderId}`, {
          headers: {
            apikey: 'your-api-key',
            Authorization: 'Bearer your-anon-key'
          }
        });
        const data = await res.json();
        if (data.length && data[0].status === 'success') {
          window.location.href = redirect;
        } else {
          setTimeout(checkStatus, 3000);
        }
      };
      checkStatus();
    }
  });
})();
</script>