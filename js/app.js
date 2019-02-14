'use strict';

function Animal(animal) {
  this.title = animal.title,
  this.image_url = animal.image_url,
  this.description = animal.description,
  this.keyword = animal.keyword,
  this.horns = animal.horns

}

Animal.allAnimals = [];

Animal.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  $('select').append('<option class="option-clone"></option>');

  let animalClone = $('div[class="clone"]');
  let animalHml = $('#photo-template').html();

  let selectorClone = $('option[class="option-clone"]');
  let selectorHtml = $('#filter').html();

  animalClone.html(animalHml)

  selectorClone.html(selectorHtml)

  animalClone.find('h2').text(this.title);
  animalClone.find('img').attr({
    src: this.image_url,
    title: this.title,
    alt: this.description,
  });
  animalClone.find('p').text(this.description);
  animalClone.append('<h3></h3>');
  animalClone.find('h3').text(`Number of horns: ${this.horns}`);
  animalClone.removeClass('clone');
  animalClone.attr('class', this.keyword);
  animalClone.addClass('default');

  selectorClone.attr('value', this.keyword);
  selectorClone.text(this.keyword);
  selectorClone.attr('id', this.keyword);
  selectorClone.removeClass('option-clone');
  selectorClone.attr('class', 'choice');
}

Animal.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Animal.allAnimals.push(new Animal(obj));
      })
    })
    .then(Animal.loadAnimals);

}

Animal.loadAnimals = () => Animal.allAnimals.forEach(animal => animal.render())

$('#filter').on('change', function() {
  let selection = $(this).val();

  $('.default').hide()
  $(`.${selection}`).show()
})

$(() => Animal.readJson());
