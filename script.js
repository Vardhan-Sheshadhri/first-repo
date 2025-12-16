let images = document.querySelectorAll("#slider_container>img")
// console.log(images);
let index = 0;
function showImage() {
  images.forEach((img, i) => {
    img.classList.toggle("non-active", i !== index)
  })
}
showImage()

//! RightArrow Functionality
let rightArrow = document.getElementById("rightarrow");
// console.log(rightArrow);
rightArrow.addEventListener("click", () => {
  index++
  if (index >= images.length) {
    index = 0
  }
  showImage()
})

//! LeftArrow Functionality
let leftArrow = document.getElementById("leftarrow");
// console.log(leftArrow);
leftArrow.addEventListener("click", () => {
  index--
  if (index < 0) {
    index = images.length - 1;
  }
  showImage()
})