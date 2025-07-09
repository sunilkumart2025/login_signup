(function () {
  const widgets = document.querySelectorAll('.paynexa-widget');

  widgets.forEach(widget => {
    const amount = widget.getAttribute('data-amount');
    const upi = widget.getAttribute('data-merchant-upi');
    const note = widget.getAttribute('data-note') || "Pay via PayNexa";
    const name = widget.getAttribute('data-merchant-name') || "PayNexa";

    const upiLink = `upi://pay?pa=${upi}&pn=${encodeURIComponent(name)}&am=${amount}&tn=${encodeURIComponent(note)}`;

    // Create container
    const container = document.createElement('div');
    container.style.border = '1px solid #ccc';
    container.style.padding = '16px';
    container.style.borderRadius = '10px';
    container.style.background = '#fff';
    container.style.textAlign = 'center';

    // Title
    const title = document.createElement('h3');
    title.innerText = `Pay ₹${amount} to ${name}`;
    container.appendChild(title);

    // Pay Button
    const payBtn = document.createElement('a');
    payBtn.href = upiLink;
    payBtn.innerText = "📲 Pay with UPI App";
    payBtn.style.display = 'inline-block';
    payBtn.style.padding = '10px 20px';
    payBtn.style.backgroundColor = '#0057ff';
    payBtn.style.color = '#fff';
    payBtn.style.borderRadius = '8px';
    payBtn.style.textDecoration = 'none';
    payBtn.style.marginTop = '10px';
    payBtn.target = '_blank';
    container.appendChild(payBtn);

    // QR Code
    const qrCanvas = document.createElement('canvas');
    container.appendChild(qrCanvas);

    // Inject container
    widget.appendChild(container);

    // Load QR library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js';
    script.onload = () => {
      QRCode.toCanvas(qrCanvas, upiLink, function (error) {
        if (error) console.error(error);
      });
    };
    document.body.appendChild(script);
  });
})();