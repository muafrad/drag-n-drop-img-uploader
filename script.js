const DragArea = document.querySelector('.contentBody'),
    DragText = DragArea.querySelector('h3'),
    button = DragArea.querySelector('button'),
    input = DragArea.querySelector('input');

let myFile;

button.onclick = () => {
    input.click();
}

input.addEventListener("change", function () {
    myFile = this.files[0];
    DragArea.classList.add('active');
    showImg()
})

DragArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    DragArea.classList.add("active");

    DragText.textContent = "Release to Upload File";
})

DragArea.addEventListener("dragleave", (event) => {
    event.preventDefault();
    DragArea.classList.remove("active");
    DragText.textContent = "Drag & Drop"
})

DragArea.addEventListener("drop", (event) => {
    event.preventDefault();
    myFile = event.dataTransfer.files[0];
    showImg()
})

function showImg() {
    let fileType = myFile.type;
    let valid = ["image/jpeg", "image/png", "image/jpg"]

    if (valid.includes(fileType)) {

        let fileReader = new FileReader();

        fileReader.onload = () => {
            let imgUrl = fileReader.result;
            let img = `<img src="${imgUrl}" alt="">`
            DragArea.innerHTML = img;
        }
        fileReader.readAsDataURL(myFile);
    }
    else{
        alert("This is not a valid file");
        DragArea.classList.remove("active");
    }
}