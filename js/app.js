'use strict';

function Animal(animal) {
  this.title = animal.title,
  this.image_url = animal.image_url,
  this.description = animal.description,
  this.keyword = animal.keyword,
  this.horns = animal.horns

}

Animal.allAnimals = [];

Animal.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Animal.allAnimals.push(new Animal(obj));
      })
    })
}

$(() => Animal.readJson());
