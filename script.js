
let url;

function handleUpload() {
    const fileInput = document.getElementById('filePicker');
    const image = fileInput.files[0];
    const formData = new FormData();
    formData.append("image_file", image);
    formData.append('size', 'auto');
    const apiKey = "zejMeVNyor1s5F5kEn7weApC";
    // Show the loading icon when the upload button is clicked
    const loadingIcon = document.createElement('div');
    loadingIcon.className = 'loading-icon show';
    document.body.appendChild(loadingIcon);
    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey,
        },
        body: formData
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Background removal failed. Please try again.');
            }
            return response.blob();
        })
        .then(function (blob) {
            url = URL.createObjectURL(blob);
            const img = document.createElement('img');
            img.src = url;
            img.style.display = 'block';
            img.style.margin = "0 auto";
            img.style.border = '1px solid black';
            img.style.borderSpacing = '10px';
            img.style.marginBottom = '15px';
            img.style.marginTop = '20px';
            img.style.maxHeight = '300px';
            img.style.maxWidth = '300px';
            img.style.overflow = 'hidden';
            document.body.appendChild(img);

            const downloadButton = document.createElement('button');
            downloadButton.className = 'btn btn-outline-dark';
            downloadButton.innerText = 'Download';
            downloadButton.style.margin = '0 auto';
            downloadButton.style.marginBottom = '20px';
            downloadButton.onclick = downloadFile;
            document.body.appendChild(downloadButton);

            loadingIcon.classList.remove('show');
        })
        .catch(function (error) {
            console.error('Error:', error);
            loadingIcon.classList.remove('show');
        });

    console.log("clicked");
}

function downloadFile() {
    if (!url) {
        console.error('No URL available to download');
        return;
    }

    var anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = 'bg-removed.png';
    document.body.appendChild(anchorElement);

    anchorElement.click();
    document.body.removeChild(anchorElement);
}
