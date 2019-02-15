'use strict';

function Animal(animal) {
  this.title = animal.title,
  this.image_url = animal.image_url,
  this.description = animal.description,
  this.keyword = animal.keyword,
  this.horns = animal.horns

}

let pageOneAnimals = [];
let pageTwoAnimals = [];
let selectors = [];

$('nav a').on('click', function(){
  let $whereToGo = $(this).data('tab');
  $('.photo-template').hide();
  $('#' + $whereToGo).fadeIn(750);
})

let populateSelector = function() {
  $('select').append('<option class="option-clone"></option>');

  let selectorClone = $('option[class="option-clone"]');
  let selectorHtml = $('#filter').html();

  selectorClone.html(selectorHtml)

  selectors.forEach((key) => {
    selectorClone.attr('value', key);
    selectorClone.text(key);
    selectorClone.removeClass('option-clone');
})
}

Animal.prototype.toHtml = function(){
  const template = $('#animals-template').html();
  const compiled = Handlebars.compile(template);
  return compiled(this);
}

Animal.readJson = () => {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        pageOneAnimals.push(new Animal(obj));
      })
    })
    .then(Animal.loadAnimalsOne);
  $.get('./data/page-2.json', 'json')
    .then(data => {
      data.forEach(obj => {
        pageTwoAnimals.push(new Animal(obj));
      })
    })
    .then(Animal.loadAnimalsTwo);
}

Animal.prototype.keywords = function() {
  let retArr = [];

  pageOneAnimals.forEach( function(key) {
    selectors.push(key.keyword);
  })
  pageTwoAnimals.forEach( function(key) {
    selectors.push(key.keyword);
  })
  selectors.sort((a, b) => a > b);
  for (let i = 0; i < selectors.length; i++){
    if (selectors[i-1] !== selectors[i]) {
      retArr.push(selectors[i]);
    }
    selectors = retArr;
  }
}

// Animal.loadAnimals = () => Animal.pageOneAnimals.forEach(animal => animal.render())
Animal.loadAnimalsOne = () =>{
  pageOneAnimals.forEach(images => {
    $('#photo-template-one').append(images.toHtml());
  })
  populateSelector();
}

Animal.loadAnimalsTwo = () =>{
  pageTwoAnimals.forEach(images => {
    $('#photo-template-two').append(images.toHtml());
  })
  populateSelector();
}


$('#filter').on('change', function() {
  let selection = $(this).val();

  $('.default').hide()
  $(`.${selection}`).show()
})

$(() => Animal.readJson());
