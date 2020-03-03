exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('movies')
    .truncate()
    .then(function() {
      return knex('movies').insert([
        { name: 'star wars' },
        { name: 'star trek' },
        { name: 'saving private ryan' },
        { name: 'lord of the rings' },
      ]);
    });
};
