// auth.js
const supabaseUrl = 'https://aafmgvxhpdjsqrbjkzps.supabase.co'; // replace with your URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhZm1ndnhocGRqc3FyYmprenBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMTE2NjEsImV4cCI6MjA1OTY4NzY2MX0.0uxlvXQ-aX5Jk8ICsird0SCaDPgbh5NQkAI6UGIxj1Q'; // replace with your anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser();

  const loginBtn = document.querySelector('.login-btn');
  const profileIcon = document.querySelector('.profile-icon');

  if (user) {
    loginBtn.style.display = 'none';
    profileIcon.style.display = 'block';
  } else {
    loginBtn.style.display = 'block';
    profileIcon.style.display = 'none';
  }
});
