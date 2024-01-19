const template = document.getElementById('template');
const userImage = document.getElementById('user-image');
const imageInput = document.getElementById('image-input');
const scaleInput = document.getElementById('scale');
const xPositionInput = document.getElementById('x-position');
const yPositionInput = document.getElementById('y-position');
const downloadBtn = document.getElementById('download-btn');
const uploadFotoLabel = document.getElementById('upload-foto-label');
const pilihFotoSpan = document.querySelector('.upload-btn-wrapper .btn');
const fotoMasukInput = document.querySelector('.foto-masuk'); // Tambahkan ini

imageInput.addEventListener('change', handleImageUpload);
scaleInput.addEventListener('input', handleControlChange);
xPositionInput.addEventListener('input', handleControlChange);
yPositionInput.addEventListener('input', handleControlChange);
downloadBtn.addEventListener('click', downloadTwibbon);

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        userImage.src = e.target.result;
        // Sembunyikan label "Upload Foto" setelah foto diunggah
        if (uploadFotoLabel) {
            uploadFotoLabel.style.display = 'none';
        }
        // Sembunyikan span "Pilih Foto" setelah foto diunggah
        if (pilihFotoSpan) {
            pilihFotoSpan.style.display = 'none';
        }
        // Sembunyikan input "foto-masuk" setelah foto diunggah
        if (fotoMasukInput) {
            fotoMasukInput.style.display = 'none';
        }
    };

    reader.readAsDataURL(file);
}

function handleControlChange() {
    const scale = scaleInput.value;
    const xPosition = xPositionInput.value;
    const yPosition = yPositionInput.value;

    userImage.style.transform = `scale(${scale}) translate(${xPosition}%, ${yPosition}%)`;
}

function downloadTwibbon() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set ukuran kanvas sesuai dengan resolusi templat (resolusi tinggi)
    const scaleFactor = 1.8; // Sesuaikan dengan kebutuhan
    canvas.width = template.width * scaleFactor;
    canvas.height = template.height * scaleFactor;

    // Atur transformasi agar foto pengguna sesuai dengan kontrol pengguna
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2.1);
    context.scale(scaleInput.value, scaleInput.value);
    context.translate(-canvas.width / 2, -canvas.height / 2.1);

    // Gambar foto pengguna di canvas dengan ukuran yang sesuai
    const scaledWidth = userImage.width * scaleInput.value;
    const scaledHeight = userImage.height * scaleInput.value;

    const offsetX = (canvas.width - scaledWidth) / 2 + (xPositionInput.value / 100) * canvas.width;
    const offsetY = (canvas.height - scaledHeight) / 2 + (yPositionInput.value / 100) * canvas.height;

    context.drawImage(userImage, offsetX, offsetY, scaledWidth, scaledHeight);

    // Kembalikan konteks ke kondisi sebelumnya
    context.restore();

    // Gambar templat di atas foto pengguna
    context.drawImage(template, 0, 0, canvas.width, canvas.height);

    // Konversi ke format JPG dengan kualitas yang tinggi
    const imageData = canvas.toDataURL('image/jpeg', 1); // Sesuaikan dengan kebutuhan

    const link = document.createElement('a');
    link.download = 'Hasil_Twibbon.jpg';
    link.href = imageData;
    link.click();
}
