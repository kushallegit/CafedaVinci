document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const categorySelect = document.getElementById('help-category');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const category = categorySelect.value;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!category || !name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, name, email, message }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); // success message
        form.reset();
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Internal server error. Please try again later.');
    }
  });
});
