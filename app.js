document.getElementById('loading').style.display = 'none'; //By default loader was invisible and results also
document.getElementById('results').style.display = 'none';
// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calculate Results
function calculateResults(e) {
  

  console.log('Calculating...');
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);


  //Check if monthly is finite value then procede otherwise not
  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    document.getElementById('loading').style.display = 'block';
    setTimeout(removeLoader, 3000); //After 3 seconds loader will removed
    setTimeout(showResults, 3000); //After 3 seconds results will showed
  } else {
    showError('Please check your values');
  }
    amount.value = '';
    interest.value = '';
    years.value = '';
   e.preventDefault();
}



function showError(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError,2000);
}

function clearError() {
    document.querySelector('.alert').remove();
}


function removeLoader() {
  document.getElementById('loading').style.display = 'none';

}


function showResults() {
    document.getElementById('results').style.display = 'block';
  
}