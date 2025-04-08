// auth.js
const supabaseUrl = 'https://xyz.supabase.co'; // replace with your URL
const supabaseKey = 'your-anon-key'; // replace with your anon key
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
