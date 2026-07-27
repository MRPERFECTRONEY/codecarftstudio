// Currency helper for Code Craft Studio (Supports INR ₹ and USD $)

const USD_TO_INR = 85.5; // Conversion rate

export function detectDefaultCurrency() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = navigator.language || '';
    if (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('Asia/Kolkata') || lang === 'en-IN' || lang === 'hi') {
      return 'INR';
    }
  } catch (e) {
    console.error(e);
  }
  return 'INR'; // Defaulting agency to INR (India) as requested
}

export function formatPrice(usdAmount, currency = 'INR') {
  if (typeof usdAmount === 'string') {
    // If it's a range string e.g. "$5,000 - $15,000"
    if (usdAmount.includes('$')) {
      const numbers = usdAmount.match(/\d[\d,]*/g);
      if (numbers && numbers.length > 0) {
        const converted = numbers.map(numStr => {
          const val = parseInt(numStr.replace(/,/g, ''), 10);
          return formatPrice(val, currency);
        });
        return converted.join(' - ');
      }
    }
    return usdAmount;
  }

  const numeric = Number(usdAmount) || 0;

  if (currency === 'INR') {
    const inrValue = Math.round(numeric * USD_TO_INR);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(inrValue);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(numeric);
  }
}
