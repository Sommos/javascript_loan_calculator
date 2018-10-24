// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // hide results
  document.getElementById('results').style.display = 'none';
  // show loading gif
  document.getElementById('loading').style.display = 'block';
  // show results after 2 seconds
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function calculateResults(e) {
  // GUI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // computing variables for later use
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // computing monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';
  } else {
    showError('Please check your input.');
  }

  function showError(error) {
    // when an error is found, hide both the loading gif and results
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';

    // constructing a new element
    const errorDiv = document.createElement('div')
    
    // get the elements that we need to insert our new element above
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // applying new attributes to the new element
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading (first argument is what you are putting in, second argument is what you are inserting before)
    card.insertBefore(errorDiv, heading);

    // clear the error message after 3 seconds (this works in ms)
    setTimeout(clearError, 3000);
  }

  function clearError() {
    document.querySelector('.alert').remove();
  }
}