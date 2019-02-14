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
  let animalClone = $('div[class="clone"]');

  let animalHml = $('#photo-template').html();

  animalClone.html(animalHml)

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
  animalClone.attr('class', this.title);
  animalClone.attr('class', this.keyword);
}

Animal.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Animal.allAnimals.push(new Animal(obj));
      })
    })
    .then(Animal.loadAnimals)
}

Animal.loadAnimals = () => Animal.allAnimals.forEach(animal => animal.render())

$(() => Animal.readJson());
