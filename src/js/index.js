

document.addEventListener('DOMContentLoaded', function() {

    // Mengambil elemen-elemen yang dibutuhkan dari DOM

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
    
    // Mengatur tampilan awal containerOutput dan warning menjadi none

    containerOutput.style.display = 'none'
    warning.style.display = 'none'

   
   
    // Event listener untuk form submission
    document.getElementById('form').addEventListener('submit', e => {
       e.preventDefault();
        
    // Jika validasi input tidak berhasil, sembunyikan containerOutput
       if (!validateInputs()) {
        containerOutput.style.display = 'none';
        return;
    }

    // Mendapatkan nilai input dan menghitung BMI
       const username = document.getElementById('name').value
       const weight = parseFloat(document.getElementById('weight').value)
       const height = parseFloat(document.getElementById('height').value)
       const gender = document.querySelector('input[name="gender"]:checked').value; // Dapatkan nilai tombol radio yang dicentang
   
       const bmiScore = calculatedBmi(weight, height)
       displayBmiResult(username, bmiScore, gender)

   });

   // fungsi untuk reset form
   document.getElementById('btn-reset').addEventListener('click', e => {

    containerOutput.style.display = 'none'
    warning.style.display = 'none'

   })

   // fungsi untuk menghitung BMI
   const calculatedBmi = (weight, height) => weight / ((height/100) ** 2)
   
   // fungsi menampilkan pesan error jika terdapoat validasi input bersifat tidak valid 
   const setError = (element, message) => {
       const inputControl = element.parentElement;
       const errorDisplay = inputControl.querySelector('.error');
   
       errorDisplay.innerText = message;
       inputControl.classList.add('error');
       inputControl.classList.remove('success')
   }

   // fungsi menampilkan tampilan success jika validasi input bersifat valid
   const setSuccess = element => {
       const inputControl = element.parentElement;
       const errorDisplay = inputControl.querySelector('.error');
   
       errorDisplay.innerText = '';
       inputControl.classList.add('success');
       inputControl.classList.remove('error');
   };
   
    // fungsi memeriksa inputan dari form
   const validateInputs = () => {
       const nameValue = username.value.trim()
       const gender = genderMale.checked ? genderMale.value : genderFemale.value;
       
       const weightValue = parseFloat(document.getElementById('weight').value.trim());
       const heightValue = parseFloat(document.getElementById('height').value.trim());
       const ageValue = age.value.trim()

       let isValid = true
   
       if (nameValue === '') {
           setError(username, 'Name is required')
       } else if (nameValue.length > 50) {
           setError(username, 'Nama terlalu panjang')
       } else {
           setSuccess(username)
       }
   
   
       if (isNaN(weightValue) || weightValue === '') {
           setError(weight, 'weight is required');
       } else if (weightValue >= 300) {
           setError(weight, 'Berat badan terlalu tinggi');
       } else {
           setSuccess(weight);
       }
   
   
       if (isNaN(heightValue) || heightValue === '') {
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

       return isValid

   }
   // Fungsi untuk menentukan kategori BMI
   const BmiCategory = (bmiScore, gender) => {
       const categories = {
           'Pria': [
               { min: 0, max: 18.5, category: 'Kekurangan berat badan', suggestion: 'berada dalam kategori kekurangan berat badan. Disarankan untuk berkonsultasi dengan dokter atau ahli gizi untuk merencanakan gizi seimbang yang sesuai dengan kebutuhan tubuh Anda.' },
               { min: 18.5, max: 24.9, category: 'normal (ideal)', suggestion: 'berada dalam kategori berat badan normal (ideal). Pertahankan pola makan sehat dan olahraga teratur untuk menjaga kesehatan tubuh Anda.' },
               { min: 25, max: 29.9, category: 'kelebihan berat badan', suggestion: 'berada dalam kategori kelebihan berat badan. Disarankan untuk mengatur pola makan dan meningkatkan aktivitas fisik. Hindari makanan tinggi lemak dan gula, serta rutin berolahraga untuk mencapai berat badan yang sehat.' },
               { min: 30, max: Infinity, category: 'kegemukan (obesitas)', suggestion: 'berada dalam kategori kegemukan (obesitas). Penting untuk segera mengambil tindakan untuk menurunkan berat badan demi kesehatan yang lebih baik. Pertimbangkan untuk berkonsultasi dengan dokter atau ahli gizi untuk membuat rencana penurunan berat badan yang efektif dan berkelanjutan.' }
           ],
   
           'Wanita': [
               { min: 0, max: 18.5, category: 'kekurangan berat badan', suggestion: 'berada dalam kategori kekurangan berat badan. Disarankan untuk berkonsultasi dengan dokter atau ahli gizi untuk merencanakan gizi seimbang yang sesuai dengan kebutuhan tubuh Anda.' },
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

       // Mendapatkan data kategori BMI
       const categoryData = BmiCategory(bmiScore, gender);
       
       
       if (categoryData) {
           const category = categoryData.category;
           const suggestion = categoryData.suggestion;
     
        // Menampilkan hasil BMI
           categoryDisplay.innerHTML  = `Hello ${username}. Untuk jenis kelamin ${gender}, Kamu termasuk ke dalam kategori ${category}.`;
           scoreDisplay.innerHTML  = `${bmiScore.toFixed(2)}`;
           categoryDisplay2.innerHTML = `Anda ${category}`
           suggestionDisplay.innerHTML  = `Anda ${suggestion}.`;
     
        // Pengkondisian untuk menampilkan atau menyembunyikan pesan warning 
           containerOutput.style.display = validateInputs ? 'block' : 'none'
           warning.style.display = category === 'kegemukan (obesitas)' ? 'block' : 'none';
        
       } else {
           console.error('Unable to find BMI category.');
           containerOutput.style.display = 'none'
       }
   }
});
