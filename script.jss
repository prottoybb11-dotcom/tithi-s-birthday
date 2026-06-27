const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const letsDanceBtn = document.getElementById('letsDanceBtn');

function goToPage2() {
  page1.classList.add('hidden');
  page2.classList.remove('hidden');
}

letsDanceBtn.addEventListener('click', goToPage2);