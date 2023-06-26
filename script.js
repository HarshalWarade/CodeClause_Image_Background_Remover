window.onload = function () {
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const removeBackgroundBtn = document.getElementById('removeBackgroundBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    let processedImage = null;

    imageUpload.addEventListener('change', function () {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const image = new Image();
            image.src = e.target.result;
            image.onload = function ()
            {
                imagePreview.innerHTML = '';
                imagePreview.appendChild(image);
            };
        };

        reader.readAsDataURL(file);
    });

    removeBackgroundBtn.addEventListener('click', function () {
        const apiKey = 'pV48KeJCZETwzQmQF785ZyYP'; // Replace with your Remove.bg API key
        const file = imageUpload.files[0];

        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('size', 'auto');

        fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
            },
            body: formData,
        })
            .then(response => response.blob())
            .then(blob =>
            {
                processedImage = URL.createObjectURL(blob);
                imagePreview.innerHTML = `<img src="${processedImage}" alt="Processed Image">`;
                downloadBtn.href = processedImage;
                downloadBtn.style.display = 'block';
            })
            .catch(error => console.log(error));
    });
};
