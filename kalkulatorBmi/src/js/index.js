

document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById('form')
    let output = document.getElementById('output')
    let containerOutput = document.getElementById('containerOutput')
    let username = document.getElementById('name')
    let genderMale = document.getElementById('male')
    let genderFemale = document.getElementById('female')
    let gender = document.getElementById('gender')
    let weight = document.getElementById('weight');
    let height = document.getElementById('height');
    let age = document.getElementById('age')
    let warning = document.getElementById('warning')
    
    containerOutput.style.display = 'none'
    warning.style.display = 'none'

   
   const calculatedBmi = (weight, height) => weight / ((height/100) ** 2)
   
   // fungsi untuk menerima inputan form
    document.getElementById('form').addEventListener('submit', e => {
       e.preventDefault();
   
       validateInputs();
   
       const username = document.getElementById('name').value
       const weight = parseFloat(document.getElementById('weight').value)
       const height = parseFloat(document.getElementById('height').value)
       const gender = document.querySelector('input[name="gender"]:checked').value; // Dapatkan nilai tombol radio yang dicentang
   
       const bmiScore = calculatedBmi(weight, height)
       displayBmiResult(username, bmiScore, gender);
   
   
     
   });
   
   const setError = (element, message) => {
       const inputControl = element.parentElement;
       const errorDisplay = inputControl.querySelector('.error');
   
       errorDisplay.innerText = message;
       inputControl.classList.add('error');
       inputControl.classList.remove('success')
   }
   
   const setSuccess = element => {
       const inputControl = element.parentElement;
       const errorDisplay = inputControl.querySelector('.error');
   
       errorDisplay.innerText = '';
       inputControl.classList.add('success');
       inputControl.classList.remove('error');
   };
   
   const validateInputs = () => {
       const nameValue = username.value.trim()
       const gender = genderMale.checked ? genderMale.value : genderFemale.value;
       
       const weightValue = parseFloat(document.getElementById('weight').value.trim());
       const heightValue = parseFloat(document.getElementById('height').value.trim());
       const ageValue = age.value.trim()
   
   
       if (nameValue === '') {
           setError(username, 'Name is required')
       } else if (nameValue.length > 50) {
           setError(username, 'Nama terlalu panjang')
       } else {
           setSuccess(username)
       }
   
   
       if (isNaN(weightValue === '')) {
           setError(weight, 'weight is required');
       } else if (weightValue >= 300) {
           setError(weight, 'Berat badan terlalu tinggi');
       } else {
           setSuccess(weight);
       }
   
   
       if (isNaN(heightValue === '')) {
           setError(height, 'height is required');
       } else if (heightValue <= 100) {
           setError(height, 'Ukuran tinggi di bawah 100cm tidak valid');
       } else {
           setSuccess(height);
       }
   
       if (ageValue === '') {
           setError(age, 'age is required')
       } else {
           setSuccess(age)
       }
   
   
   }
   
   const BmiCategory = (bmiScore, gender) => {
       const categories = {
           'male': [
               { min: 0, max: 18.5, category: 'Kekurangan berat badan', suggestion: 'berada dalam kategori kekurangan berat badan. Disarankan untuk berkonsultasi dengan dokter atau ahli gizi untuk merencanakan diet seimbang yang sesuai dengan kebutuhan tubuh Anda.' },
               { min: 18.5, max: 24.9, category: 'normal (ideal)', suggestion: 'berada dalam kategori berat badan normal (ideal). Pertahankan pola makan sehat dan olahraga teratur untuk menjaga kesehatan tubuh Anda.' },
               { min: 25, max: 29.9, category: 'kelebihan berat badan', suggestion: 'berada dalam kategori kelebihan berat badan. Disarankan untuk mengatur pola makan dan meningkatkan aktivitas fisik. Hindari makanan tinggi lemak dan gula, serta rutin berolahraga untuk mencapai berat badan yang sehat.' },
               { min: 30, max: Infinity, category: 'kegemukan (obesitas)', suggestion: 'berada dalam kategori kegemukan (obesitas). Penting untuk segera mengambil tindakan untuk menurunkan berat badan demi kesehatan yang lebih baik. Pertimbangkan untuk berkonsultasi dengan dokter atau ahli gizi untuk membuat rencana penurunan berat badan yang efektif dan berkelanjutan.' }
           ],
   
           'female': [
               { min: 0, max: 18.5, category: 'kekurangan berat badan', suggestion: 'berada dalam kategori kekurangan berat badan. Disarankan untuk berkonsultasi dengan dokter atau ahli gizi untuk merencanakan diet seimbang yang sesuai dengan kebutuhan tubuh Anda.' },
               { min: 18.5, max: 24.9, category: 'normal (ideal)', suggestion: 'berada dalam kategori berat badan normal (ideal). Pertahankan pola makan sehat dan olahraga teratur untuk menjaga kesehatan tubuh Anda.' },
               { min: 25, max: 29.9, category: 'kelebihan berat badan', suggestion: 'berada dalam kategori kelebihan berat badan. Disarankan untuk mengatur pola makan dan meningkatkan aktivitas fisik. Hindari makanan tinggi lemak dan gula, serta rutin berolahraga untuk mencapai berat badan yang sehat.' },
               { min: 30, max: Infinity, category: 'kegemukan (obesitas)', suggestion: 'berada dalam kategori kegemukan (obesitas). Penting untuk segera mengambil tindakan untuk menurunkan berat badan demi kesehatan yang lebih baik. Pertimbangkan untuk berkonsultasi dengan dokter atau ahli gizi untuk membuat rencana penurunan berat badan yang efektif dan berkelanjutan.' }
           ]
   
       }
   
       const categoryData = categories[gender].find(({ min, max }) => bmiScore >= min && bmiScore <= max)
       return categoryData ? { category: categoryData.category, suggestion: categoryData.suggestion } : undefined
   }
   
   function displayBmiResult(username, bmiScore, gender){
       const categoryDisplay = document.getElementById('category');
       const scoreDisplay = document.getElementById('scoreBmi');
       const suggestionDisplay = document.getElementById('suggestion');
       const warning = document.getElementById('warning');
       const output = document.getElementById('output');
       const containerOutput = document.getElementById('containerOutput');
       const categoryDisplay2 = document.getElementById('category2')
     
       containerOutput.style.display = 'block';
     
       const categoryData = BmiCategory(bmiScore, gender);
       
       if (categoryData) {
           const category = categoryData.category;
           const suggestion = categoryData.suggestion;
     
        
           categoryDisplay.innerHTML  = `Hello ${username}. For gender ${gender}, you belong to the category ${category}.`;
           scoreDisplay.innerHTML  = `${bmiScore.toFixed(2)}.`;
           categoryDisplay2.innerHTML = `Anda ${category}`
           suggestionDisplay.innerHTML  = `${suggestion}.`;
     
           // Display or hide warning message
           warning.style.display = category === 'kegemukan (obesitas)' ? 'block' : 'none';
       } else {
           console.error('Unable to find BMI category.');
       }
   }
});
