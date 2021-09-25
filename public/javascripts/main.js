const inputImage = document.querySelector('#image')
const createImage = document.querySelector('.createImage')
const form = document.querySelector('FORM')


inputImage.addEventListener('keyup' , e => {
  const src = inputImage.value  
  createImage.setAttribute('src' , src)
  
})