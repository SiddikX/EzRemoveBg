
let url;

function handleUpload() {
    const fileInput = document.getElementById('filePicker');
    const image = fileInput.files[0];
    const formData = new FormData();
    formData.append("image_file", image);
    formData.append('size', 'auto');

    const apiKey = "kM8mJ15JaA5YX4E8EpHHqcfE";

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

            // Display the background-removed image
            const img = document.createElement('img');
            img.src = url;
            img.style.display = 'block';
            img.style.margin = "0 auto";
            img.style.border = '1px solid black';
            img.style.marginBottom = '10px';
            img.style.marginTop = '10px';
            document.body.appendChild(img);

            // Display the download button below the image
            const downloadButton = document.createElement('button');
            downloadButton.className = 'btn btn-outline-dark';
            downloadButton.innerText = 'Download';
            downloadButton.style.margin = '0 auto';
            downloadButton.style.marginBottom = '20px';
            downloadButton.onclick = downloadFile;
            document.body.appendChild(downloadButton);

            // Hide the loading icon once the image processing is completed
            loadingIcon.classList.remove('show');
        })
        .catch(function (error) {
            console.error('Error:', error);

            // Hide the loading icon in case of an error as well
            loadingIcon.classList.remove('show');
        });

    console.log("clicked");
}

// The downloadFile function remains unchanged
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
